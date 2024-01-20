const { throwErrorWithStatus } = require("./errorHandle")
const jwt = require('jsonwebtoken')
const db = require('../models')

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

const isAgent = async(req ,res ,next)=>{    // check có phải khách hàng hay ko
  
    const {roleCode} = req.user    // sau khi đã verify và lấy được token ,lấy được (req.user) thì chạy xuống check quyền
    if(roleCode === "ROL7"){
        return throwErrorWithStatus(401, 'Bạn không có quyền truy cập.',res , next)
    }
    next()
}

const isAdmin = async(req ,res ,next)=>{  // check có phải admin hay ko
    const {roleCode} = req.user    // sau khi đã verify và lấy được token ,lấy được (req.user) thì chạy xuống check quyền
    if(roleCode === "ROL1"){
        return throwErrorWithStatus(401, 'Bạn không có quyền truy cập.',res , next)
    }
    next()
}
const isOwner = async(req ,res ,next)=>{    // check có phải môi giới hay ko
  
    const {roleCode} = req.user    // sau khi đã verify và lấy được token ,lấy được (req.user) thì chạy xuống check quyền
    if(roleCode === "ROL7" || roleCode === "ROL5"){
        return throwErrorWithStatus(401, 'Bạn không có quyền truy cập.',res , next)
    }
    next()
}

module.exports = {
    verifyToken
}