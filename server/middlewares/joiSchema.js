const Joi = require('joi')

exports.string = Joi.string().allow(null, "")  // giá trị gửi lên có thể null hoặc rỗng
exports.stringReq = Joi.string().required()
exports.number = Joi.string().allow(null, "")
exports.numberREq = Joi.number().required()
exports.array = Joi.array().allow(null, "")
exports.arrayReq = Joi.array().required()

 