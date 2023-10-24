var express=require("express");
var cors=require("cors");
var path=require("path");
require("dotenv").config();
var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasProductos=require("./rutas/productosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasProductosApis=require("./rutas/productosRutasApis")
var session = require("cookie-session");

var app=express();
app.set("view engine","ejs");
app.use(cors());
//app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",express.static(path.join(__dirname,"/web")));
app.use("/",rutasUsuarios);
app.use("/",rutasProductos)
app.use("/",rutasUsuariosApis);
app.use("/",rutasProductosApis);
var port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("servidor en http://localhost:"+port)

});

