const fs = require('fs');
const path = require('path');
// const fetch = require('node-fetch');

class Contenedor{
    constructor(url){
        this.url = url;
    }
    async save(product){
        try {
            let productos = await this.getAll();
            let newProduct_Id = productos.length; 
            if(productos.length == 0){
                newProduct_Id = 1;
                let newProduct = {id: newProduct_Id,
                    ...product
                    };
                    productos.push(newProduct);
                
            }else{
                newProduct_Id = productos.length + 1;
                let newProduct = {id: newProduct_Id,
                    ...product
                    };
                productos.push(newProduct);                    
            }
            let contenidoProducto = JSON.stringify(productos, null, 2);
            await fs.promises.writeFile(`${this.url}`, contenidoProducto);
        return newProduct_Id;
        } catch (error) {
            throw new Error(error);
        }
        
    }
    async getById(id){
        try {
            let respuesta = 'Error server'
            let productos = await this.getAll();
            if(productos.length > 0){
                productos.forEach(element => {
                    element.id == id ? respuesta = element : null;
                });
            }
            return respuesta;
        } catch (error) {
            throw new Error(error);
        }
            
        }
        
    
    async getAll(){
        try {
            let productos = await fs.promises.readFile(`${this.url}`, 'utf-8');   
            return JSON.parse(productos);
        } catch (error) {
            console.log(error);          
        } 
    }

    async deleteById(id){
        let productos = await this.getAll();
        productos = productos.filter(productoDeleteById => productoDeleteById.id != id);
        let contenidoProducto = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile(`${this.url}`, contenidoProducto);
        console.log(productos)
    }
    async deleteAll(){
        await fs.promises.writeFile(`${this.url}`, '[]');
    }
}
module.exports = Contenedor;



