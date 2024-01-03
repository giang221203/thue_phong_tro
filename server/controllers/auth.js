const asyncHandler = require("express-async-handler"); // dùng để bắt lỗi thay cho try catch
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandle");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký
const register = asyncHandler(async (req, res) => {
  // bên người dùng gửi bằng urlencode hoặc bằng formdata thì server sẽ nhận được qua req.body
  // bên người dùng gửi bằng params (?q=dadlandlan) thì server sẽ nhận được qua req.query
  // bên người dùng truyền theo link api/user/:id  thì server sẽ nhận được qua req.params từ :id

  const { phone } = req.body;
  //Handle register
  const response = await db.User.findOrCreate({
    // User từ modelName: 'User' trong file model User
    where: { phone: phone }, // findOrCreate :tìm hoặc thêm mới , where:{phone :phone} :nếu không tìm thấy phone trong db thì defaults:req.body: thêm mới
    defaults: req.body,
  });
  return res.json({
    //   nếu không truyền status thì mặc định 200
    success: response[1],
    // nếu phần tử thứ 2 trong response bằng true là tạo thành công
    mes: response[1]
      ? "Your account is created."
      : "PhoneNumber already had exists",
  });
});

//Đăng nhập

const signIn = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  //Handle login
  const user = await db.User.findOne({
    where: { phone: phone }, // findOne :tìm dữ liệu gửi lên có sdt bằng sdt trong db
  });
  if (!user)
    return throwErrorWithStatus(
      401,
      "User with that phone havent register.",
      res,
      next
    ); // nếu tìm không thành công thì bắn lỗi
  const isMatchingPassword = bcrypt.compareSync(password, user.password); // comparaSync (password,user.password) so sánh tham số đầu tiên là password truyền lên có khớp với tham số thứ 2 là password đã has trong db ko
  if (!isMatchingPassword)
    return throwErrorWithStatus(401, "Password is wrong.", res, next); // nếu không khớp password thì bắn lỗi
  const token = jwt.sign(
    { uid: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  // sign dùng để tạo token ,tham số đầu tiên là tạo token có payload chứa dữ liệu là id và role , tham số thứ 2 là key , tham số thứ 3 là hạn sử dụng token

  return res.json({
    //   nếu không truyền status thì mặc định 200
    success: true,
    mes: "Sign in is successfully.",
    accessToken :token
  });
});
module.exports = {
  register,
  signIn,
};
