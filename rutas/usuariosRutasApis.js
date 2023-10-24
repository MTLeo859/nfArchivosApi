var ruta=require("express").Router();
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario}=require("../bd/usuariosBD");
const Usuario = require("../modelos/Usuario");

ruta.get("/api/",async(req,res)=>{
  var users=await mostrarUsuarios();
  if(users.length>0){
    res.status(200).json(users);
  }
  else{
    res.status(400).json("Usuarios no encontrados");
  }

  //res.end();

    

});


ruta.post("/api/nuevousuario",async(req,res)=>{
  var error=await nuevoUsuario(req.body);
  if(error==0){
    res.status(200).json("usuario registrado corretamente");
  }

  else{
    res.status(400).json("error al registar usuario");
  }


});

ruta.get("/api/buscarUsuarioPorId/:id",async(req,res)=>{
  var user=await buscarPorId(req.params.id);
  //res.end();
  if(user!=undefined){
    res.status(200).json(user);
  }

  else{
    res.status(400).json("usuario no encontrado");
  }


  
});

ruta.post("/api/editarUsuario",async (req,res)=>{
  var error=await modificarUsuario(req.body);
 if(error==0){
  res.status(200).json("usuario  actualizado correctamente")

 }

 else{
  res.status(400).json("Error al actualizar el usuario")
 }

})

ruta.get("/api/borrarUsuario/:id",async(req,res)=>{

  var error=await borrarUsuario(req.params.id);
  if(error==0){
    res.status(200).json("usuario borrado");


  }
  else{
    res.status(400).json("error al borrar usuario");

  }
})

module.exports=ruta;