const asyncHandler = require("express-async-handler"); // dùng để bắt lỗi thay cho try catch
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandle");
const { roles } = require("../utils/constant");

// Đăng ký
const initRoles = asyncHandler(async (req, res) => { 
  const response = await db.Role.bulkCreate(roles);  //   tạo 1 lúc nhiều roles
  return res.json({
    success: Boolean(response),
    mes: response ? "Inserted." : "Some thing went rwong.",
  });
});

module.exports = {
    initRoles,
};
