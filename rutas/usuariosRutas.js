var ruta=require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario,login}=require("../bd/usuariosBD");
var {admin} = require("../middlewares/funcionesPassword");
var fs = require("fs");
var path = require("path");
const { log } = require("console");
ruta.get("/",(req,res)=>{
  res.render("usuario/login");
});


ruta.post("/login", async(req,res)=>{
  var user = await login(req.body);
  if(user === 1){
      res.redirect("/mostrarUsuario");
  }else if(user === 0){
      res.status(400).send({ error: "Contraseña no valida" });
  }else if(user === undefined){
      res.status(400).send({ error: "El usuario no existe" });
  }
});



ruta.get("/mostrarUsuario",async(req,res)=>{
  var users = await mostrarUsuarios();
  res.render("usuario/mostrar",{users})
});
ruta.get("/nuevousuario",(req,res)=>{
  res.render("usuario/nuevo");
})
ruta.post("/nuevousuario",subirArchivo(),async(req,res)=>{

  req.body.foto=req.file.originalname;
  


  //res.end();
  
  var error=await nuevoUsuario(req.body);
  res.redirect("/");

 
});

ruta.get("/editarUsuario/:id",async(req,res)=>{
  var user=await buscarPorId(req.params.id);
  //res.end();
  res.render("usuario/modificar",{user});
  
})

ruta.post("/editarUsuario",subirArchivo(),async (req,res)=>{
  //req.body.foto=req.file.originalname;
  //var error=await modificarUsuario(req.body);
  //res.redirect("/");
  if (req.file!=undefined) {
    req.body.foto=req.file.originalname;        
} else {
    req.body.foto = req.body.fotoVieja;
}
var error=await modificarUsuario(req.body);
res.redirect("/mostrarUsuarios");

})

ruta.get("/borrarUsuario/:id",async(req,res)=>{
  /*await borrarUsuario(req.params.id);
  res.redirect("/"); */
  try{
      var usuario = await buscarPorId(req.params.id);
      if(usuario){
          var rutaImagen = path.join(__dirname,"..","web","images",usuario.foto);
          if(fs.existsSync(rutaImagen)){
              fs.unlinkSync(rutaImagen);
          }
          await borrarUsuario(req.params.id);
      }
      res.redirect("/mostrarUsuario");
  }catch(error){
      console.log("Error al borrar usuario: "+error);
  }
});





module.exports=ruta;

