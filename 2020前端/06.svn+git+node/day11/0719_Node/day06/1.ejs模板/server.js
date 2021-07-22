const express = require("express");

const app = express();

// 让你的服务器知道你再用哪一个模板引擎
app.set("view engine", "ejs")
// 让你的服务器知道你的模板在哪里目录下，配置模板目录
app.set("views", "view");



app.get("/show", (req, res) => {
    const personArr = [
        {name:"peiqi", age:4},
        {name:"xuxi", age:5},
        {name:"peideluo", age:6}
    ]
    res.render("person", {person:personArr})
})

app.listen(3000, (err) => {
    if(!err) console.log("服务器启动成功");
    else console.log(err);
})