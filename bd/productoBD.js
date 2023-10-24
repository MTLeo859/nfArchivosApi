var conexion=require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");
var fs = require("fs").promises;
var path = require("path");
var  subirArchivo1=require("../middlewares/middlewares");
async function mostrarProductos(){
    var products=[];
    try{
        
    var productos=await conexion.get();
    productos.forEach(producto=> {
    //console.log(usuario.id);
    var producto1=new Producto(producto.id, producto.data())
    //console.log(usuario1);
   if(producto1.bandera==0){
       products.push(producto1.obtenerProducto);
       
   } 
   });
    }
    catch(err){
        console.log("error al mostrar"+err);
        
    }
    return products;

}

async function nuevoProducto(newProduct){
    var error=1;
    try{
        var producto1=new Producto(null,newProduct);
        if(producto1.bandera==0){

            conexion.doc().set(producto1.obtenerProducto);
            error=0;


        }

       else{
        console.log("datos incorrectos de formulario");
       }

    }
    catch(err){
        console.log("error al crear nuevo Producto"+err);
    }
    return error;

}

async function buscarPorId(id){
 var product;
 try{
 var  productoBD=await conexion.doc(id).get(); 
 
  var productoObejto=new Producto( productoBD.id, productoBD.data());
    if (productoObejto.bandera==0){
    product=productoObejto.obtenerProducto;
  }
}
    catch(err){
        console.log("error al recuperar al producto"+err);

    }
 
 return product;
}
async function modificarProducto(datos){
   
    var product=await buscarPorId(datos.id)
    var error=1;
    if(product!=undefined){
        var product=new Producto(datos.id,datos);
     
        if (product.bandera==0){
            try{
       
               await conexion.doc(product.id).set(product.obtenerProducto);
               console.log("los datos se modificaron correctamente");
               error=0;
            }
            catch(err){
             console.log("error al modificar al producto"+err);
       
            }
           }
           else{
               console.log("error los datos no son validos");
       
       
           }
    }
    
    return error;

}

async function borrarProducto(id){
    var error=1;
    var product=await buscarPorId(id)
    if (product!=undefined){
        try{
            var foto='./web/images/'+ product.foto;
           await fs.unlink(foto);
            await conexion.doc(id).delete();
            console.log("registro borrado");
            error=0;
    
        }
        catch(err){
            console.log("error al borrar al producto "+err);
        }
    
    }
    return error;
   
  
}

module.exports={
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    modificarProducto,
    borrarProducto
}