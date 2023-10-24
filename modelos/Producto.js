class Producto{
    constructor(id,data){
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.foto=data.foto
        
    

    }
    set id(id){
        if(id!=null)
        id.length>0?this._id=id:this.bandera=1;

    }
    set nombre(nombre){
        nombre.length>0?this._nombre=nombre:this.bandera=1;
    }
    set foto(foto){
        foto.length>0?this._foto=foto:this.bandera=1;
    }
   
    get id(){
        return this._id;
    }
    get nombre(){
        return this._nombre;
    }
    get foto(){
        return this._foto;
    }
  
    get obtenerProducto(){
        if(this._id!=null)
        return{
            id:this.id,
            nombre:this.nombre,
            foto:this.foto
           
        }
    else
        return{
           
            nombre:this.nombre,
            foto:this.foto
            
        }
    }
    
}
module.exports=Producto;
