
//暴露users模型对象

//引入mongoose
const mongoose = require("mongoose");

//引入模式对象
const Schema = mongoose.Schema;

//创建约束对象
const usersRule = new Schema({
//   约束条件
    email:{
        type: String, //类型
        required: true, //必填项
        unique: true  //唯一性
    },
    nick_name:{
        type: String,
        required: true, //必填项
    },
    password:{
        type: String,
        required: true, //必填项
    },
//还有两个必加项
    date:{
        type: Date,
        default: Date.now()
    },
    enable_flag:{
        type:String,
        default:"Y" //默认在数据库里是无法删除的
    }
})

//创建模型对象
module.exports = mongoose.model("users", usersRule);
