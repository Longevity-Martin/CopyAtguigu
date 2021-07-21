
//引入 express框架
const express = require("express");

//创建app应用对象
const app = express();

// 禁止服务器返回X-Powered-By,为了安全
app.disable("x-powered-by");

//使用内置中间件暴露静态资源，不妨为路由直接写文件名+后缀也能看页面
app.use(express.static(__dirname + "/public"))

//引入模型对象模块，用于操作数据库CRUD
const usersModel = require("./model/usersModel")

//引入db模块，用于连接数据库
const db = require("./db/db")

//引入users模型对象
const usersModel = require("./model/usersModel")

//使用内置中间件用于解析POST请求的urlencodedC请求体参数
app.use(express.urlencoded({extended: true}))

//引入登录注册路由器中间件
let loginRegsiterRouter = require("./router/login&regsiterRouter")

//引入UI路由器中间件
let uiRouter = require("./router/uiRouter")

//如果数据库连接成功，随后启动服务器。在整个过程中，无论多少次请求，数据库只连接一次

//连接成功的回调
db(() => {

    //业务路由
    app.use(loginRegsiterRouter());

    //UI路由
    app.use(uiRouter());



// 服务器的监听
    app.listen(3000, (err) => {
        if(!err) console.log("服务器启动成功")
        else console.log(err)
    })
})