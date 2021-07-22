/*
* 专门用于展示的UI路由
* */

let {Router} = require("express");

let router = new Router();

//UI路由start
app.get("/login", (req, res) => {
    // 如果注册成功，相当于get请求：/login/email=?,但是这里的email信息暴露出来了
    // 在登录邮箱内已填好
    let {email} = req.query;
    res.render("login", {errMsg:{email}})
})
app.get("/register", (req, res) => {
    res.render("register",{errMsg:{}})
})


module.exports = function () {
    return router;
}
//UI路由end