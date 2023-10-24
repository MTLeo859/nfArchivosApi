var ruta=require("express").Router();
var {mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto}=require("../bd/productoBD");
const Producto = require("../modelos/Producto");

ruta.get("/api/Producto",async(req,res)=>{
  var products=await mostrarProductos();
  if(products.length>0){
    res.status(200).json(products);

  }
  else{
    res.status(400).json("productos no encontrados")
  }
  
 
    

});


ruta.post("/api/nuevoproducto",async(req,res)=>{
  var error=await nuevoProducto(req.body);
  if(error==0){
    res.status(200).json("usuarios registrado correctamente");

  }
  else{
    res.status(400).json("error al registrar usuario");
  }


});


ruta.get("/api/buscarProductoPorId/:id",async(req,res)=>{
  var product=await buscarPorId(req.params.id);
  //res.end();
  if(product!=undefined){
    res.status(200).json(product);
  }

  else{
    res.status(400).json("producto no encontrado");
  }
});


ruta.post("/api/editarProducto",async (req,res)=>{
  var error=await modificarProducto(req.body);
  if(error==0){
    res.status(200).json("producto  actualizado correctamente")

  }
 
  else{
   res.status(400).json("Error al actualizar el producto")
  }

})

ruta.get("/api/borrarProducto/:id",async(req,res)=>{
  var error=await borrarProducto(req.params.id);
   if(error==0){
    res.status(200).json("producto borrado");


  }
  else{
    res.status(400).json("error al borrar producto");
  }
})


module.exports=ruta;