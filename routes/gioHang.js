const express = require('express');
const router = express.Router();
const GioHang = require('../modoles/GioHang');

// Lấy giỏ hàng của một khách hàng
router.get('/:ma_KhachHang', async (req, res) => {
  try {
    const gioHang = await GioHang.find({ ma_KhachHang: req.params.ma_KhachHang }).populate('ma_SanPham');
    res.json(gioHang);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm một sản phẩm vào giỏ hàng
router.post('/', async (req, res) => {
  const { soluong, ma_KhachHang, ma_SanPham } = req.body;
  
  const gioHang = new GioHang({
    soluong,
    ma_KhachHang,
    ma_SanPham,
  });

  try {
    const newGioHang = await gioHang.save();
    res.status(201).json(newGioHang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:id', async (req, res) => {
  try {
    const gioHang = await GioHang.findById(req.params.id);
    if (!gioHang) {
      return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' });
    }

    gioHang.soluong = req.body.soluong || gioHang.soluong;
    const updatedGioHang = await gioHang.save();
    res.json(updatedGioHang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:id', async (req, res) => {
  try {
    const gioHang = await GioHang.findById(req.params.id);
    if (!gioHang) {
      return res.status(404).json({ message: 'Giỏ hàng không tìm thấy' });
    }

    await gioHang.remove();
    res.json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
