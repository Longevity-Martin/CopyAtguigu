const express = require("express")
const app = express();


// 应用级中间件（全局中间件）---位置有关
app.use((req, res, next) => {
    if(req.get(Referer)){
        const a = req.get(Referer).slplit("/")[2];
        if(a === "localhost:64347"){
                res.sendFile(__dirname + "/public/err.png")
        }else{
            next();
        }
    }else{
        next();
    }
})

//作用：防盗链

// function use(req, res, next){
//     if(req.get(Referer)){
//         const a = req.get(Referer).slplit("/")[2];
//         if(a === "localhost:64347"){
//              next();
//         }else{
//                 res.sendFile(__dirname + "/public/err.png")
//         }
//     }else{
//         next();
//     }
// }

app.get("/", (res, req) =>{
    res.send('KO');
})

app.get("/meishi", (res, req) =>{
    res.send('-meishi');
})
app.post("/pictrue", (res, req) =>{
    res.send("pictrue")
})

app.listen(3000, (err) => {
    if(!err) console.log("ok");
    else console.log(err);
})

//第三方中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//内置 中间件
app.use(espress.urlencoded({extended:true}));

app.use(express.static(__dirname + "/publuc"))
// 路由器中间件