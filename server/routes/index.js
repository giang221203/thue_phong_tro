const { errHandler, badRequestException } = require("../middlewares/errorHandle");
const auth = require("./auth")
const user = require("./user")

const initRoutes = (app)=>{
    app.use('/api/auth',auth)
    app.use('/api/user',user)

    app.use(badRequestException)
    app.use(errHandler);
}

module.exports = initRoutes