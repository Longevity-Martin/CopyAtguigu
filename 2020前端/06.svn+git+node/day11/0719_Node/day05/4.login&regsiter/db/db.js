/*
* 该模块主要用于连接数据库，且判断数据库的连接状态
* */

//引入mongoose
const mongoose = require("mongoose");

//使用一个新的索引创建器
mongoose.set("useCreateIndex", true);

function db(resolve, reject){

    //连接数据库
    mongoose.connect("mongodb://localhost:27017/oys", {
        useNewUrlParser: true, //使用一个新的URL解析器，用于解决一些安全性问题。
        useUnifiedTopology: true //使用一个统一的新的拓扑结构。
    })


    //绑定数据库连接的监听
    mongoose.connection.on("open", (err) => {
        if (!err){
            console.log("数据库连接成功");
            resolve();
        }else{
            console.log("数据库连接失败");
            reject();
        }
    })
}

module.exports = db;
