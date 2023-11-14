// Chuyển cấu hình kết nối database từ json sang js
require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: "+07:00",
  },
};
// // File kết nối đến dbeaver để tạo bảng
// {
//     "development": {
//       "username": "postgres",
//       "password": "giang@211103",
//       "database": "rest06",
//       "host": "127.0.0.1",
//       "dialect": "postgres",
//       "logging":false,
//       "timezone":"+07:00"
//     }
//   }
