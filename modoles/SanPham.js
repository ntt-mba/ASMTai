const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const sanPhamSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  ten_SanPham: { type: String, required: true },
  gia: { type: Number, required: true },
  mota: { type: String },
  hinhanh: { type: String },
  danhgia: { type: Number },
  ma_Loai: { 
    type: mongoose.Schema.Types.ObjectId, // Sử dụng ObjectId để tham chiếu đến PhanLoai
    ref: 'PhanLoai', // Tham chiếu đến model 'PhanLoai'
    required: true 
  },
});

module.exports = mongoose.model('SanPham', sanPhamSchema);
