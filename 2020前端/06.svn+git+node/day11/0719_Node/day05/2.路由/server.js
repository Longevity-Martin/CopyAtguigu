const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("页面展示");
})


app.use(express.Urlencoded({extended: true}))

/**
 * request：
 *  request.query ----get方法的查询字符串参数
 *  request.params --- 请求参数路由的
 *  request.body ---POST请求体参数（需要借助中间件）
 *  requeat.get() --get请求方式key对应的value值
 * 
 * response：
 *  response.send()：不能传入纯函数，否则express会当成状态码
 *  response.end():不会自动追加响应头
 *  response.download() :相对+绝对
 *  response.sendFile(): 绝对路径
 * response.set():必须在send()之前
 * response.get():必须在send()之后
 * response.status:响应状态码
*/


app.listen(3000, (err) => {
    if(!err) console.log("ok");
    else console.log(err);
})