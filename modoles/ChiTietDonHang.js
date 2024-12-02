const mongoose = require('mongoose');
const { Schema } = mongoose;

const chiTietDonHangSchema = new Schema({
  id: { type: Schema.Types.ObjectId },  // Tự động tạo id
  tongcong: { type: Number, required: true },
  ma_DonHang: { type: Schema.Types.ObjectId, ref: 'DonHang', required: true },  // Liên kết với DonHang
  ma_SanPham: { type: Schema.Types.ObjectId, ref: 'SanPham', required: true },  // Liên kết với SanPham
});

module.exports = mongoose.model('ChiTietDonHang', chiTietDonHangSchema);
