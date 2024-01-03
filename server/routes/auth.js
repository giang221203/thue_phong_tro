const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const { stringReq, numberREq } = require("../middlewares/joiSchema");
const validateDto = require("../middlewares/validation");

router.post(
  "/register",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberREq,
      role: stringReq,
    })
  ),
  ctrls.register
); // truyền object phone password khi đăng ký

router.post(
  "/signin",
  validateDto(
    Joi.object({
      password: stringReq,
      phone: numberREq,
    })
  ),
  ctrls.signIn
); // truyền object phone password khi đăng ký

module.exports = router;
