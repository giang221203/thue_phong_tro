const router = require("express").Router();

const ctrls = require("../controllers/user");

const validateDto = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/current",verifyToken, ctrls.getCurrent);   // phải chạy qua middleware trước và lấy được req.user 

module.exports = router 
    