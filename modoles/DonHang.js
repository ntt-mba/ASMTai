const mongoose = require('mongoose');

// Định nghĩa schema cho DonHang
const donHangSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },  // Dùng mongoose.Schema.Types.ObjectId thay cho ObjectId
  ngaydathang: { type: Date, required: true },
  tongtien: { type: Number, required: true },
  ma_KhachHang: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'KhachHang' }, // Tham chiếu đến KhachHang
});

// Tạo model từ schema
module.exports = mongoose.model('DonHang', donHangSchema);
