let Contenedor = require('./contenedorArchivos.js');
let contenedor = new Contenedor('./productos.txt');

const main = async () => {
    let productoNuevo = await contenedor.save({
    "title": "algo nuevo",
    "price": 100,
    "thumbnail": "url5"});

    console.log(await contenedor.getAll());
   console.log(await contenedor.getById(productoNuevo));
}
main();
// console.log(contenedor.save());
// console.log(contenedor.deleteById(null));