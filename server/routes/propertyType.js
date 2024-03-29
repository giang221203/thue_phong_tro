const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyType");

const validateDto = require("../middlewares/validation");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const { stringReq, string } = require("../middlewares/joiSchema");
const rateLimiter = require("../middlewares/rateLimiter");

router.use(rateLimiter)  // middleware chống spam

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
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateDto(
    Joi.object({ name: string, description: string, image: string })
  ),
  ctrls.updatePropertyType
);
router.delete(
    "/:id",
    verifyToken,
    isAdmin,
 
    ctrls.removePropertyType
  );
module.exports = router;
