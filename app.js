var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const khachHangRouter = require('./routes/KhachHang');
const phanLoaiRouter = require('./routes/phanLoai');
const sanPhamRouter = require('./routes/sanPham')
const gioHangRouter = require('./routes/gioHang');
const chiTietDonHangRouter = require('./routes/chiTietDonHang');
const donhangrouter = require('./routes/donHang');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/ASMTai')
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/khachhang', khachHangRouter);
app.use('/api/phanloai', phanLoaiRouter);
app.use('/api/sanpham', sanPhamRouter);
app.use('/api/giohang', gioHangRouter);
app.use('/api/chitietdonhang', chiTietDonHangRouter);
app.use('/api/donhang', donhangrouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
