const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Khai báo Schema từ mongoose
const ObjectId = Schema.Types.ObjectId; // Sử dụng ObjectId đúng cách

// Định nghĩa Schema cho KhachHang
const khachHangSchema = new Schema({
  id: { type: ObjectId },
  ten_KhachHang: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Đảm bảo email là duy nhất
  sdt: { type: String, required: true },
  diachi: { type: String },
  ten_dangnhap: { type: String, required: true, unique: true }, // Đảm bảo tên đăng nhập là duy nhất
  matkhau: { type: String, required: true },
  ma_KhachHang: { type: String, required: true, unique: true }, // Đảm bảo mã khách hàng là duy nhất
});

// Tạo model từ schema
module.exports = mongoose.model('KhachHang', khachHangSchema);
