const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const phanLoaiSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  ten_Loai: { type: String, required: true },
});

module.exports = mongoose.model('PhanLoai', phanLoaiSchema);
