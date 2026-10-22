import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems || []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '24px', color: '#fff' }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#18181b', borderRadius: '12px' }}>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', marginBottom: '20px' }}>Your cart is currently empty.</p>
          <Link to="/shop" className="btn" style={{ textDecoration: 'none' }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map((item) => {
              const img = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;
              const id = item._id || item.productID;
              return (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    background: '#18181b',
                    padding: '16px',
                    borderRadius: '10px',
                  }}
                >
                  <img
                    src={img || '/shopNest.jpg'}
                    alt={item.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '6px' }}>{item.name}</h3>
                    <p style={{ color: '#f97316', fontWeight: 'bold' }}>
                      ${(item.price || 0).toFixed(2)} {item.qty > 1 && `× ${item.qty}`}
                    </p>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(id))}
                    style={{
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  background: 'transparent',
                  color: '#a1a1aa',
                  border: '1px solid #3f3f46',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div
            style={{
              background: '#18181b',
              padding: '24px',
              borderRadius: '12px',
              height: 'fit-content',
            }}
          >
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#fff' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#a1a1aa' }}>
              <span>Items ({cartItems.length}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#a1a1aa' }}>
              <span>Shipping:</span>
              <span style={{ color: '#10b981' }}>Free</span>
            </div>
            <hr style={{ borderColor: '#27272a', margin: '16px 0' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '24px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              <span>Total:</span>
              <span style={{ color: '#f97316' }}>${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="btn"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', cursor: 'pointer' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
