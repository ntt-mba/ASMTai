const express = require('express');
const router = express.Router();
const SanPham = require('../modoles/SanPham');
const JWT = require('jsonwebtoken');
const config = require("../ulti/config");

// Lấy danh sách tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const token = req.header("Authorization").split(' ')[1];
    if (token) {
      JWT.verify(token, config.SECRETKEY, async function (err, id) {
        if (err) {
          res.status(403).json({ "status": 403, "err": err });
        } else {
          //xử lý chức năng tương ứng với API

          const sanPhams = await SanPham.find().populate('ma_Loai');
          res.json(sanPhams);
        }
      });
    } else {
      res.status(401).json({ "status": 401 });
    }

    const sanPhams = await SanPham.find().populate('ma_Loai');
    res.json(sanPhams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy thông tin một sản phẩm theo ID
router.get('/:id', async (req, res) => {
  try {
    const sanPham = await SanPham.findById(req.params.id).populate('ma_Loai');
    if (!sanPham) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }
    res.json(sanPham);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo mới sản phẩm
router.post('/', async (req, res) => {
  const { ten_SanPham, gia, mota, hinhanh, danhgia, ma_Loai } = req.body;

  const sanPham = new SanPham({
    ten_SanPham,
    gia,
    mota,
    hinhanh,
    danhgia,
    ma_Loai,
  });

  try {
    const newSanPham = await sanPham.save();
    res.status(201).json(newSanPham);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật thông tin sản phẩm theo ID
router.put('/:id', async (req, res) => {
  try {
    const sanPham = await SanPham.findById(req.params.id);
    if (!sanPham) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    sanPham.ten_SanPham = req.body.ten_SanPham || sanPham.ten_SanPham;
    sanPham.gia = req.body.gia || sanPham.gia;
    sanPham.mota = req.body.mota || sanPham.mota;
    sanPham.hinhanh = req.body.hinhanh || sanPham.hinhanh;
    sanPham.danhgia = req.body.danhgia || sanPham.danhgia;
    sanPham.ma_Loai = req.body.ma_Loai || sanPham.ma_Loai;

    const updatedSanPham = await sanPham.save();
    res.json(updatedSanPham);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sản phẩm theo ID
router.delete('/:id', async (req, res) => {
  try {
    const sanPham = await SanPham.findById(req.params.id);
    if (!sanPham) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    await sanPham.remove();
    res.json({ message: 'Sản phẩm đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
