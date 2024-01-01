const asyncHandler = require("express-async-handler"); // dùng để bắt lỗi thay cho try catch

// Đăng ký
const register = asyncHandler(async (req, res) => {
  // bên người dùng gửi bằng urlencode hoặc bằng formdata thì server sẽ nhận được qua req.body
  // bên người dùng gửi bằng params (?q=dadlandlan) thì server sẽ nhận được qua req.query
  // bên người dùng truyền theo link api/user/:id  thì server sẽ nhận được qua req.params từ :id

  const { password,phone,  name,role } = req.body

  return res.json({   //   nếu không truyền status thì mặc định 200
    success :true,
    mes :"api",
    data:{password,phone,  name,role }
  })
});

module.exports = {
  register,
};
