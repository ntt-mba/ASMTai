// routes/chiTietDonHang.js
const express = require('express');
const router = express.Router();  // Tạo router

const ChiTietDonHang = require('../modoles/ChiTietDonHang');  // Giả sử bạn đã có mô hình ChiTietDonHang

// Các route liên quan đến chi tiết đơn hàng

// Lấy chi tiết đơn hàng
router.get('/:ma_DonHang', async (req, res) => {
  try {
    const chiTiet = await ChiTietDonHang.find({ ma_DonHang: req.params.ma_DonHang }).populate('ma_SanPham');
    res.json(chiTiet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm chi tiết đơn hàng
router.post('/', async (req, res) => {
  const { tongcong, ma_DonHang, ma_SanPham } = req.body;
  
  const chiTiet = new ChiTietDonHang({
    tongcong,
    ma_DonHang,
    ma_SanPham,
  });

  try {
    const newChiTiet = await chiTiet.save();
    res.status(201).json(newChiTiet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật chi tiết đơn hàng
router.put('/:id', async (req, res) => {
  try {
    const chiTiet = await ChiTietDonHang.findById(req.params.id);
    if (!chiTiet) {
      return res.status(404).json({ message: 'Chi tiết đơn hàng không tìm thấy' });
    }

    chiTiet.tongcong = req.body.tongcong || chiTiet.tongcong;
    const updatedChiTiet = await chiTiet.save();
    res.json(updatedChiTiet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa chi tiết đơn hàng
router.delete('/:id', async (req, res) => {
  try {
    const chiTiet = await ChiTietDonHang.findById(req.params.id);
    if (!chiTiet) {
      return res.status(404).json({ message: 'Chi tiết đơn hàng không tìm thấy' });
    }

    await chiTiet.remove();
    res.json({ message: 'Chi tiết đơn hàng đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;  // Xuất khẩu router đúng cách
