const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const { stringReq, numberREq } = require("../middlewares/joiSchema");
const validateDto = require("../middlewares/validation");

router.post(
  "/register",
  validateDto(
    Joi.object({ password: stringReq, name: stringReq, phone: numberREq })
  ),
  ctrls.register
); // truyền object email password khi đăng ký

module.exports = router;
