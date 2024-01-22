const redis = require('redis')

const client = redis.createClient({
    url: 'redis://default:giang@211103@redis-14680.c281.us-east-1-2.ec2.cloud.redislabs.com:14680'
  });

client.on('error', err => console.log('Redis Client Error', err));


const connectionRedis  = async ()=>{
    await client.connect();
    console.log("Redis connect");
}
connectionRedis()   
module.exports = client