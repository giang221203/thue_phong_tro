const express = require('express')
require('dotenv').config()    // sử dụng biến môi trường
const cors = require('cors')
const dbconn = require('./config/dbconn')
const initRoutes = require('./routes')
const { errHandler } = require('./middlewares/errorHandle')
const app = express()
app.use(cors({
    origin:process.env.CLIENT_URL      // Chỉ localhost client mới được phép vào lấy tài nguyên, kết nối
}))
app.use(express.json())       // Convert data từ client gửi lên trả về data gốc , nếu client gửi lên 1 mảng,gửi theo kiểu json ,midlewera này sẽ đọc và gửi về thành 1 mảng, limit giới hạn là bao nhiêu mb 
app.use(express.urlencoded({extended:true}))    // Thiên về body , khi data gửi các method theo param , theo body thì middleware này đọc nó 
initRoutes(app)


dbconn()   // Gọi hàm để kết nối db
const PORT = process.env.PORT || 7777
app.listen(PORT,()=>{
    console.log("SERVER READY ON " + PORT);
})
