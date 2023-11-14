const { Sequelize } = require("sequelize");
//tạo hàm để kết nối với database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging : false,   // bỏ những dòng log mặc định không cần thiết
    timezone:"+07:00",  // múi giờ 
  }
);

const dbconn = async()=>{
    try {
        await sequelize.authenticate();  // Nêú kết nối database thành công thì loggin
        console.log('DB CONNECTED!');
      } catch (error) {
        console.error('Unable to connect to the database:', error); // nếu kết nối không thành công thì bắn error
      }
}

module.exports = dbconn