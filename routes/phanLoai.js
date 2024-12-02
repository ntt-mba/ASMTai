const express = require('express');
const router = express.Router();
const PhanLoai = require('../modoles/PhanLoai');  // Đảm bảo đường dẫn đúng

// 1. Lấy tất cả các loại
router.get('/', (req, res) => {
  PhanLoai.find()
    .then(phanLoai => res.json(phanLoai))
    .catch(err => res.status(500).json({ message: 'Lỗi khi lấy danh sách PhanLoai', error: err }));
});

// 2. Lấy một loại theo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  PhanLoai.findById(id)
    .then(phanLoai => {
      if (!phanLoai) {
        return res.status(404).json({ message: 'PhanLoai không tìm thấy' });
      }
      res.json(phanLoai);
    })
    .catch(err => res.status(500).json({ message: 'Lỗi khi lấy PhanLoai', error: err }));
});

// 3. Tạo mới một loại
router.post('/', (req, res) => {
  const { ten_Loai } = req.body;
  const phanLoai = new PhanLoai({
    ten_Loai
  });

  phanLoai.save()
    .then(savedPhanLoai => res.status(201).json(savedPhanLoai))
    .catch(err => res.status(500).json({ message: 'Lỗi khi tạo PhanLoai', error: err }));
});

// 4. Cập nhật một loại theo ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { ten_Loai } = req.body;

  PhanLoai.findByIdAndUpdate(id, { ten_Loai }, { new: true })
    .then(updatedPhanLoai => {
      if (!updatedPhanLoai) {
        return res.status(404).json({ message: 'PhanLoai không tìm thấy' });
      }
      res.json(updatedPhanLoai);
    })
    .catch(err => res.status(500).json({ message: 'Lỗi khi cập nhật PhanLoai', error: err }));
});

// 5. Xóa một loại theo ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  PhanLoai.findByIdAndDelete(id)
    .then(deletedPhanLoai => {
      if (!deletedPhanLoai) {
        return res.status(404).json({ message: 'PhanLoai không tìm thấy' });
      }
      res.json({ message: 'PhanLoai đã được xóa', deletedPhanLoai });
    })
    .catch(err => res.status(500).json({ message: 'Lỗi khi xóa PhanLoai', error: err }));
});

module.exports = router;
