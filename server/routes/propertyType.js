const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");

const validateDto = require("../middlewares/validation");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq, string } = require("../middlewares/joiSchema");

router.post(
  "/",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({ name: stringReq, description: stringReq, image: stringReq })
  ),
  ctrls.createNewPropertyType
);
router.get("/", ctrls.getPropertyTypes);

module.exports = router;