const asyncHandler = require("express-async-handler"); // dùng để bắt lỗi thay cho try catch
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandle");


// Đăng ký
const createNewProperty = asyncHandler(async (req, res) => {
  const { uid } = req.user;  // từ verifyToken khi đã check token thành công
  //Handle register
  const response = await db.User.findByPk(uid,{
    attributes:{
      exclude:["password"]   // không cho trả về password
    }
  });
  return res.json({
    //   nếu không truyền status thì mặc định 200
    success: Boolean(response),
    // nếu phần tử thứ 2 trong response bằng true là tạo thành công
    mes: response
      ? "Got."
      : "Cannot get user.",
    currentUser:response
  });
});


module.exports ={
    getCurrent
}