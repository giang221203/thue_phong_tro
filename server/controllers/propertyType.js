const asyncHandler = require("express-async-handler"); // dùng để bắt lỗi thay cho try catch
const db = require("../models");
const { throwErrorWithStatus } = require("../middlewares/errorHandle");
const { Op, Sequelize } = require("sequelize");
const redis = require("../config/redis.config")

// Thêm mới
const createNewPropertyType = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.PropertyType.findOrCreate({
    // cú pháp 1 object có 2 key , 1 là tìm , 2 là thêm mới
    where: { name },
    defaults: req.body,
  });
  return res.json({
    //   nếu không truyền status thì mặc định 200
    success: response[1],
    // nếu phần tử thứ 2 trong response bằng true là tạo thành công
    mes: response[1] ? "Created." : "Name propertyType duplicated.",
    propertyType: response[0],
  });
});

const getPropertyTypes = asyncHandler(async (req, res) => {
  // bên người dùng gửi bằng urlencode hoặc bằng formdata thì server sẽ nhận được qua req.body
  // bên người dùng gửi bằng params (?q=dadlandlan) thì server sẽ nhận được qua req.query
  // bên người dùng truyền theo link api/user/:id  thì server sẽ nhận được qua req.params từ :id
  const { limit, page, fields,name,sort, ...query } = req.query;
  const options = {};

//   Limit fields
  if (fields) {  // fields chọn trường muốn get
    const attributes = fields.split(",");  // truyền qua param với key là fields và value là id ,name thì sẽ get ra mãng chỉ có id và name,nếu là -id ,name thì sẽ loại id và name
    const isExclude = attributes.some((el) => el.startsWith("-")); // isExclude sẽ là true nếu có ít nhất một phần tử trong mảng attributes bắt đầu bằng dấu trừ (-)
    if (isExclude)    //   isExclude là true là chọn trường muốn loại bỏ
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),    // Nếu attributes là ["-id", "name"] , options.attributes sẽ trở thành { exclude: ["id", "name"] } ,exclude là loại bỏ trường
      };
    else options.attributes = attributes;
  } // attributes là cú pháp lấy các trường mình muốn
//   console.log(options);
  //  fields là chuỗi "apple,orange,banana", thì sau khi thực hiện dòng lệnh này, options.attributes sẽ là một mảng {attributes:["apple", "orange", "banana"]}.
  
//   Filter by client queries
if(name)  query.name  = Sequelize.where(Sequelize.fn('LOWER',Sequelize.col('name')),"LIKE",`%${name.toLocaleLowerCase()}%`)  // %LIKE%   // House => ou   ,giống một 2 từ trong name thì sẽ hiển thị phần tử
  

// Sorting 
// cú pháp sắp xếp của sequelize[[createdAt ,ASC],[name,DESC]]
//  sort:createdAt,-name thì cú pháp ban đầu là [createdAt ,-name]
if (sort){
    // console.log(sort);
    // gửi lên sort:createdAt,-name thì cú pháp ban đầu là [createdAt ,-name]
    const order = sort.split(",").map((el)=>el.startsWith('-') ? [el.replace("-", ""), 'DESC'] : [el, 'ASC']) 
    //nêú trong phần tử bắt đầu bằng dấu - thì xóa dấu - và chuyển cú pháp từ [-createdAt ,name] thành [[createdAt,'DESC'],[name,ASC]]
    // console.log(order);
    options.order = order;
}
if (!limit) {
    const areadyGetALl  = await redis.get('get-property-type')      // lấy dữ liệu trong redis

    if(areadyGetALl) {
        return res.json({
            //   nếu không truyền status thì mặc định 200
            success: true,
            mes:"Got. redis",
            propertyTypes: JSON.parse(areadyGetALl),
          });
    }
    const response = await db.PropertyType.findAll({
        where:query,  // nếu truyền param với key là name và value là House thì sẽ get phần tử có name là House
        ...options
    });
    redis.set('get-property-type' ,JSON.stringify(response))

    // dùng set để lưu dữ liệu db vào redis ,set truyền vào key và 'key' và value là dữ liệu phải chuyển về dạng json
    return res.json({
      //   nếu không truyền status thì mặc định 200
      success: response.length > 0,
      mes: response.length > 0 ? "Got." : "Cannot get propertyTypes.",
      propertyTypes: response,
    });
  }

//   Pagination
  const prevPage = page - 1 > 0 ? page -1 : 1
  const offset = (prevPage - 1) * limit
  if(offset) options.offset = offset
  options.limit = +limit
console.log(options);
  const response = await db.PropertyType.findAndCountAll({
    where:query,  // nếu truyền param với key là name và value là House thì sẽ get phần tử có name là House
    ...options
  });
    return res.json({
        //   nếu không truyền status thì mặc định 200
        success: response.rows.length > 0,
        mes: response.rows.length > 0 ? "Got." : "Cannot get propertyTypes.",
        propertyTypes: response,
    });
    });


    const updatePropertyType = asyncHandler(async (req, res,next) => {
        const { id } = req.params;
        if(Object.keys(req.body).length === 0) return throwErrorWithStatus(403, "Need less 1 argument.", res, next)  // check có rỗng hay ko    // cần nhập ít nhất một trường cần update
    
        const response = await db.PropertyType.update(req.body,
            {
          // cú pháp 2 object ,object 1 là data cần update ,object 2 là điều kiện update theo id
          where: { id },
        });
        return res.json({
          //   nếu không truyền status thì mặc định 200
          success: response[0] > 0,
          // nếu phần tử thứ 2 trong response bằng true là tạo thành công
          mes: response[0] > 0 ? "Updated." : "No data is update.",
        });
      });

      const removePropertyType = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const response = await db.PropertyType.destroy(
            {
          where: { id },
        });
        return res.json({
          //   nếu không truyền status thì mặc định 200
          success: response > 0,
          // nếu phần tử thứ 2 trong response bằng true là tạo thành công
          mes: response > 0 ? "Deleted." : "No data is delete.",
        });
      });
module.exports = {
  createNewPropertyType,
  getPropertyTypes,
  updatePropertyType,
  removePropertyType
};
