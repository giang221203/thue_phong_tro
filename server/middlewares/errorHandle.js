const errHandler = (error, req, res, next) => {
  // hàm config lại lỗi validate
  const formatedMessage = error.message?.replaceAll(`\"`, "") // thay thế dấu / , dấu " thành chuỗi rỗng 
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    mes: formatedMessage,
  })
};

const throwErrorWithStatus = (code, message, res, next) => {
  const formatedMessage = message?.replaceAll(`\"`, "") // thay thế dấu / , dấu " thành chuỗi rỗng 
  const error = new Error(formatedMessage);
  res.status(code);
  next(error);
};

const badRequestException = (req, res ,next)=>{
    // hàm config hiển thị lỗi khi đường dẫn sai
    const error = new Error(`Route ${req.originalUrl} not found. `);
    res.status(404)
    next(error)
}
module.exports = {
  errHandler,
  throwErrorWithStatus,
  badRequestException
};
