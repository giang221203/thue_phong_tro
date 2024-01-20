const { throwErrorWithStatus } = require("./errorHandle")
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) =>{
    const token = req?.headers?.authorization?.startsWith('Bearer')    // xác thực token 
    if (!token){
        return throwErrorWithStatus(401,'Creds not provide',res,next)       // lỗi không cấp token
    }
    const rawToken  = req?.headers?.authorization?.split(' ')[1]      // tách bearer lấy token là phần tử thứ 2 qua dấu cách
    jwt.verify(rawToken,process.env.JWT_SECRET,(err ,decode)=>{
        if(err) return throwErrorWithStatus(401,'Creds invalid',res ,next)
        req.user = decode
        next()
    })
    // verify check token có hợp lệ hay không, truyền vào 3 tham số,
    // tham số đầu tiền là token ,tham số thứ 2 là key , tham số thứ 3 truyền vào 1 callback chứa 2 đối số , err khi verify có lỗi thì check, decode trả về payload dữ liệu đã tạo à uid và role
}


module.exports = {
    verifyToken
}