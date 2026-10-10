const crypto = require("crypto");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const Order = require("../model/order");
const Product = require("../model/Product");

const getRazorpayClient = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one order item is required" });
    }

    const requiredAddressFields = ["fullName", "street", "city", "postalCode", "country"];
    if (
      !address ||
      typeof address !== "object" ||
      requiredAddressFields.some(field => typeof address[field] !== "string" || !address[field].trim())
    ) {
      return res.status(400).json({ message: "A complete shipping address is required" });
    }

    const quantities = new Map();
    for (const item of items) {
      const productId = typeof item?.productId === "string" ? item.productId.toLowerCase() : "";
      const quantity = Number(item?.qty ?? item?.quantity);
      if (
        !mongoose.Types.ObjectId.isValid(productId) ||
        !Number.isSafeInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({ message: "Each item must include a valid productId and positive quantity" });
      }
      const totalQuantity = (quantities.get(productId) || 0) + quantity;
      if (!Number.isSafeInteger(totalQuantity)) {
        return res.status(400).json({ message: "Order item quantity is too large" });
      }
      quantities.set(productId, totalQuantity);
    }

    const productIds = [...quantities.keys()];
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: "One or more products were not found" });
    }

    const orderItems = products.map(product => {
      const qty = quantities.get(product._id.toString());
      if (!Number.isFinite(product.price) || product.price <= 0) {
        throw Object.assign(new Error(`Invalid price for ${product.name}`), { statusCode: 400 });
      }
      const priceInPaise = Math.round(product.price * 100);
      if (!Number.isSafeInteger(priceInPaise) || priceInPaise < 1) {
        throw Object.assign(new Error(`Invalid price for ${product.name}`), { statusCode: 400 });
      }
      if (Number.isFinite(product.stock) && qty > product.stock) {
        throw Object.assign(new Error(`Insufficient stock for ${product.name}`), { statusCode: 400 });
      }
      return {
        productId: product._id,
        qty,
        price: priceInPaise / 100,
      };
    });
    const amountInPaise = orderItems.reduce(
      (sum, item) => sum + Math.round(item.price * 100) * item.qty,
      0
    );
    if (!Number.isSafeInteger(amountInPaise) || amountInPaise < 1) {
      return res.status(400).json({ message: "Order total must be greater than zero" });
    }
    const totalAmount = amountInPaise / 100;

    const razorpay = getRazorpayClient();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `shopnest_${crypto.randomBytes(8).toString("hex")}`,
    });

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      address: Object.fromEntries(
        requiredAddressFields.map(field => [field, address[field].trim()])
      ),
      razorpayOrderId: razorpayOrder.id,
    });

    return res.status(201).json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      totalAmount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error creating payment order:", error);
    return res.status(500).json({ message: "Unable to create payment order" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (
      typeof razorpay_order_id !== "string" ||
      !razorpay_order_id ||
      typeof razorpay_payment_id !== "string" ||
      !razorpay_payment_id ||
      typeof razorpay_signature !== "string"
    ) {
      return res.status(400).json({ message: "Payment verification details are required" });
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials are not configured");
    }
    if (!/^[a-f\d]{64}$/i.test(razorpay_signature)) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      user: req.user._id,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpay_signature, "hex");
    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    if (order.paymentStatus === "paid") {
      if (order.paymentId !== razorpay_payment_id) {
        return res.status(409).json({ message: "This order has already been paid with another payment" });
      }
      return res.status(200).json({
        message: "Payment already verified",
        orderId: order._id,
        order,
      });
    }

    order.paymentId = razorpay_payment_id;
    order.paymentStatus = "paid";
    order.status = "processing";
    await order.save();

    return res.status(200).json({
      message: "Payment verified successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Unable to verify payment" });
  }
};

module.exports = { createOrder, verifyPayment };
