const redis = require("../config/redis.config");

const rateLimiter =async (req, res, next) => {   // middleware tránh spam gọi api
  
  const clientId = req.headers?.client_id; // id của thằng gọi

  const currentTime = Date.now(); //ms
  const client = await redis.hGetAll(`rateLimit-${clientId}`)    //   hGetAll: lưu clientId bằng object
//   console.log(client);
  if(Object.keys(client).length === 0)  {   // nếu thằng đó chưa gọi api thì set thời gian nó gọi lần đầu và số lần nó gọi ban đầu //   Object.keys chuyển :  { name: 'John',city: 'New York'} thành [name,city]
    await redis.hSet(`rateLimit-${clientId}`,'createdAt', currentTime)   // hSet truyền vào 3 giá trị :1 name theo id của từng thằng , 2 key thời gian nó gọi là thời gian nào, 3 là giá trị thời gian nó gọi hiện tại
    await redis.hSet(`rateLimit-${clientId}`,'count', 1)       // số lần nó gọi
    return next()
  }
  let difference = (currentTime - +client.createdAt) / 1000
//   thời gian nói gọi(ms) - thời gian đầu tiên(ms) / 1000 để chuyển sang s
  if(difference >= +process.env.RATE_LIMIT_RESET){       // nếu lớn hơn 60s reset lại giây và số lần gọi ban đầu
    await redis.hSet(`rateLimit-${clientId}`,'createdAt', currentTime) 
    await redis.hSet(`rateLimit-${clientId}`,'count', 1)
    return next()
  }
  if(client.count > +process.env.RATE_LIMIT_COUNT){   // nếu số lần thằng đó gọi api lớn hơn 6 trong vòng 1p thì bắn lỗi
    return res.status(429).json({
        success:false,
        mes:"Don't spam!!!"
    })
  }else{
    await redis.hSet(`rateLimit-${clientId}`,'count', +client.count + 1)
    return next()
  }


};
module.exports =  rateLimiter