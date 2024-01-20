const router = require("express").Router();
const ctrls = require("../controllers/insert");



router.post("/roles", ctrls.initRoles);   // phải chạy qua middleware trước và lấy được req.user 

module.exports = router 
    