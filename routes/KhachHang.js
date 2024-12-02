const express = require('express');
const router = express.Router();
const KhachHang = require('../modoles/KhachHang');
const JWT = require('jsonwebtoken');
const config = require("../ulti/config");

// API đăng nhập
router.post('/login', async function (req, res) {
    try {
        const { ten_dangnhap, matkhau } = req.body;
        const checkUser = await KhachHang.findOne({ ten_dangnhap: ten_dangnhap, matkhau: matkhau });
  
        if (checkUser == null) {
            res.status(400).json({ status: false, message: "Tên đăng nhập hoặc mật khẩu không đúng" });
        } else {
            var token = JWT.sign({ten_dangnhap: ten_dangnhap}, config.SECRETKEY, {expiresIn: '30s'});
            var reftoken = JWT.sign({ten_dangnhap: ten_dangnhap}, config.SECRETKEY, {expiresIn: '1h'});
  
            res.status(200).json({ status: true, message: "Đăng nhập thành công", token: token, reftoken: reftoken });
        }
    } catch (e) {
        console.error("Lỗi xảy ra khi đăng nhập:", e); // In chi tiết lỗi vào console
        res.status(400).json({ status: false, message: "Đã có lỗi xảy ra" });
    }
  });
// Tạo khách hàng
router.post('/', async (req, res) => {
  try {
    const khachHang = new KhachHang(req.body);
    await khachHang.save();
    res.status(201).json(khachHang);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lấy danh sách khách hàng
router.get('/', async (req, res) => {
  try {
    const khachHangs = await KhachHang.find();
    res.status(200).json(khachHangs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
