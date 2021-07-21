/*
* 专门用于展示的UI路由
* */

let {Router} = require("express");

let router = new Router();

//UI路由start
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/regsiter.html")
})


module.exports = function () {
    return router;
}
//UI路由end