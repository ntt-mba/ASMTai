const mongoose = require('mongoose');

// Khai báo ObjectId từ Schema để sử dụng
const { Schema } = mongoose;

const gioHangSchema = new Schema({
  id: { type: Schema.Types.ObjectId },  // Tự động gán id cho mỗi dòng
  soluong: { type: Number, required: true },
  ma_KhachHang: { type: Schema.Types.ObjectId, ref: 'KhachHang', required: true },  // Liên kết với KhachHang
  ma_SanPham: { type: Schema.Types.ObjectId, ref: 'SanPham', required: true },  // Liên kết với SanPham
});

module.exports = mongoose.model('GioHang', gioHangSchema);
