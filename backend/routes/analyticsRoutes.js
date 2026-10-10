const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {processpayment, getpaymentStatus, getAdminStats} = require('../controllers/analyticsController');

const router = express.Router();

router.get("/", protect, admin, getAdminStats);


module.exports = router;