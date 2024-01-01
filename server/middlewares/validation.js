const { throwErrorWithStatus } = require("./errorHandle");

const validateDto = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
//   console.log(error);
  if (error) {
    const message = error.details[0].message?.replaceAll(`\"`, "") // thay thế dấu / , dấu " thành chuỗi rỗng trong joi
    throwErrorWithStatus(401,message , res, next);
  }
  next();
};

module.exports = validateDto;
