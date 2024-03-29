const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/auth");
const { stringReq, numberREq,string } = require("../middlewares/joiSchema");
const validateDto = require("../middlewares/validation");

router.post(
  "/signup",
  validateDto(
    Joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberREq,
      roleCode: string, 
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
