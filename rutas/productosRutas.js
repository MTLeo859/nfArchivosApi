var ruta=require("express").Router();
var subirArchivo1=require("../middlewares/middlewares").subirArchivo1
var {mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto}=require("../bd/productoBD");




ruta.get("/",async(req,res)=>{
  var products=await mostrarProductos();
  console.log(products);
  //res.end();
  res.render("productos/mostrar",{products});
    

});

ruta.get("/nuevoproducto",(req,res)=>{
  res.render("productos/nuevo");
})
ruta.post("/nuevoproducto",subirArchivo1(),async(req,res)=>{
  
  req.body.foto=req.file.originalname;

  var error=await nuevoProducto(req.body);
  res.redirect("/producto");


});

ruta.get("/editarProducto/:id",async(req,res)=>{
  var product=await buscarPorId(req.params.id);
  //res.end();
  res.render("productos/modificar",{product});
  
})

ruta.post("/editarProducto",subirArchivo1(),async (req,res)=>{
  req.body.foto=req.file.originalname;
  var error=await modificarProducto(req.body);
  res.redirect("/producto");

})

ruta.get("/borrarProducto/:id",async(req,res)=>{
  await borrarProducto(req.params.id);
  res.redirect("/producto");
})
module.exports=ruta;