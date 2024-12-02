// routes/donHangRouter.js
const express = require('express');
const router = express.Router();
const DonHang = require('../modoles/DonHang'); // Import model DonHang

// Lấy tất cả đơn hàng
router.get('/', async (req, res) => {
  try {
    const donHangs = await DonHang.find().populate('ma_KhachHang', 'ten_KhachHang email'); // Populating ma_KhachHang để lấy thông tin khách hàng
    res.json(donHangs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
