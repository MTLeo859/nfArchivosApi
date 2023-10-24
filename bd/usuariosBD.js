var conexion=require("./conexion").conexionUsuarios;
var Usuario=require("../modelos/Usuario");
var fs = require("fs").promises;
var path = require("path");
const { log } = require("console");

var {generarPassword, validarPassword} = require("../middlewares/funcionesPassword");

async function login(datos){
    var user;
    var usuarioBd = await conexion.where("usuario","==",datos.usuario).get();
    if(usuarioBd.empty){
        console.log("usuario no existe");
        return user;
    }else{
        usuarioBd.forEach((doc) => {
            var validP = validarPassword(datos.password,doc.data().salt,doc.data().password);
            if(validP===false){
                console.log("PASSWORD INCORRECTO");
                user=0; //return user;
            }else{
                console.log("SI SE VALIDO")
                user=1;
            }
        });
    }
    return user;
}

async function mostrarUsuarios(){
    var users=[];
    try{
    
    var usuarios=await conexion.get();
    usuarios.forEach(usuario => {

    var user=new Usuario(usuario.id, usuario.data())

   if(user.bandera==0){
       users.push(user.obtenerUsuario);
       
   } 
   });
    }
    catch(err){
        console.log("error al mostrar"+err);
        
    }
    return users;

}

async function nuevoUsuario(datos){
    var error=1;
    var {salt,hash} = generarPassword(datos.password);
    datos.salt=salt;
    datos.password=hash;
    try{
        var usuario1 = new Usuario(null,datos);
        if(usuario1.bandera==0){
            conexion.doc().set(usuario1.obtenerUsuario);
            error=0;
        }else{
            console.log("datos de usuario incorrectos");
        }
    }catch(err){
        console.log("Error al crear nuevo usuario "+err);
    }
    return error;
}

async function buscarPorID(id){
    var user;
    try{
        var usuario=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if (usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerDatos;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario: "+err);
    }
    return user;
}


async function borrarUsuario(id){
    var error=1;
    var user=await buscarPorId(id);
    if (user!=undefined){


        try{

            var foto='./web/images/'+ user.foto;
           await fs.unlink(foto);

            await conexion.doc(id).delete();
            console.log("registro borrado");
            error=0;
    
        }
        catch(err){
            console.log("error al borrar al usuario"+err);
        }
    }
    return error;
    
}
async function modificarUsuario(datos){
    var error = 1;
    var usuario = await buscarPorID(datos.id);
    console.log(datos.foto);
    if (datos.foto==usuario.foto) {
        datos.foto = datos.fotoVieja;
    } else {
        var fotoRuta = './web/Usuarios/images/' + usuario.foto;
        await fs.unlink(fotoRuta);
    }
    if (usuario != undefined) {
        if (datos.password="") {
            datos.password=datos.passwordAnt;
                     
        } else {
            var {salt,hash} = generarPassword(datos.password);
            datos.salt=salt;
            datos.password=hash;
        }
        var user=new Usuario(datos.id,datos)
        error=1;
        if (user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerDatos);
                console.log("Registro actualizado ");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al usuario: "+err);
            }
        }
        return error;
    }
}

  


module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorID,
    modificarUsuario,
    borrarUsuario,
    login
}