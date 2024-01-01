const errHandler = (error, req, res, next) => {
  // hàm config lại lỗi validate
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    mes: error.message,
  })
};

const throwErrorWithStatus = (code, message, res, next) => {
  const error = new Error(message);
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
