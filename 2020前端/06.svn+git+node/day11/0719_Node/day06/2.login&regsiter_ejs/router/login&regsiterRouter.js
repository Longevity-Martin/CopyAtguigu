/*
* 专门用于管理登录、注册的业务路由
* */

//引入Router构造函数
const {Router}  = require("express");

//创建一个Router实例（路由器就是一个小型的app）
const router = new Router();

//引入模型对象
const usersModel = require("./../model/usersModel");

//业务路由start
//登录路由
router.post("/login", (req, res) => {
    let {email, password} = req.body;

    //校验邮箱的正则表达式
    const emailReg = /^[a-zA-Z0-9]{6,10}@[a-z0-9]{2,5}\.com$/;
    //校验密码的正则表达式
    const passwordReg = /^[a-zA-Z0-9_.#&@]{5,10}$/;

    //设置错误对象
    const errMsg = {};
    if(!emailReg.test(email)){
        errMsg.emailErr = "邮箱格式不合法，请检查";
    }
    if (!passwordReg.test(password)){
        errMsg.passWordErr = "用户输入密码错误";
    }
    if (JSON.stringify(errMsg) === "{}"){
        //去数据库中查找该邮箱是否已经被注册了
        usersModel.findOne({email, password}, (err, data) => {
            if(err){
                //引入报警模块，触发报警
                console.log(err);
                errMsg.errNetWork = "网络不稳定，稍后重试";
                res.render("login", {errMsg})
                return;
            }
            if(data){
                res.redirect("https://www/baidu.com");
            }else{
                errMsg.loginErr = "用户名或密码输入错误"
                res.render("login", {errMsg})
            }
        })
    }else{
        res.render("login", {errMsg});
    }
})

//注册路由
router.post("/regsiter", (req, res) => {
    let {email, nick_name, password, re_password} = req.body;

    /*
    * 校验数据的合法性：（一般是前端和后端同时验证）
    *       1.校验成功
    *           -去数据库中查找该邮箱是否注册过
    *               -注册过：提示用户邮箱已被占用
    *               -未注册：写入数据库
    *       2.校验失败
    *           - 提示用户具体哪里输入不对
    * */

    //校验邮箱的正则表达式
    const emailReg = /^[a-zA-Z0-9]{6,10}@[a-z0-9]{2,5}\.com$/
    //校验昵称的正则表达式
    const nickNameReg = /[\u4e00-\u9fa5]/gm;
    //校验密码的正则表达式
    const passwordReg = /^[a-zA-Z0-9_.#&@]{5,10}$/;

    //设置接收错误的对象
    const errMsg = {};
    //使用正则去校验
    if (!emailReg.test(email)){
        errMsg.emailErr = "邮箱格式不合法，请检查";
    }
    if (!nickNameReg.test(nick_name)){
        errMsg.nickNameErr = "用户昵称不对，请重新写入";
    }
    if(!passwordReg.test(password)){
        errMsg.passWordErr = "用户输入密码错误";
    }
    if (password !== re_password){
        errMsg.repasswordErr = "密码不一致";
    }

    //如果错误收集对象为空，说明验证正确
    if (JSON.stringify(errMsg) === "{}"){
        //去数据库里查找该邮箱是否被注册过
        usersModel.findOne({email},(err, data) => {
            //如果存在该邮箱
            if(data){
                //如果注册过，引入计数模块--当达到一个敏感的阈值，触发安全机制
                console.log(`邮箱为${email}的用户注册失败，因为邮箱重复`);
                errMsg.emailErr = "邮箱为${email}已被注册过了"
                res.render("register", {errMsg})
            }else {
                //如果没被注册过
                //写入数据库
                usersModel.create({email, nick_name, password},(err) => {
                    if(!err){
                        console.log(`邮箱为${email}的用户注册成功`);
                        // 写入成功
                        res.redirect(`http://localhost:3000/login/email=${email}`)
                    }else {
                        //如果写入失败了
                        //引入报警模块，当达到敏感阈值，触发报警
                        console.log(err);
                        errMsg.networkErr = `您当前的网络状态不稳定，稍后重试`
                        res.render('register',{errMsg})
                    }
                })
            }
        })
    }else{
        //ejs渲染。。。
        // 说明总有一项是错误的
        res.render("register", {errMsg})
    }
})


module.exports = function () {
    return router;
}
//业务路由end