const carrito = document.getElementById('miModal');
      listaProductos = document.querySelector('tbody');
      vaciarCarrito = document.getElementById('vaciar-carrito');
      productos = document.getElementById('lista-productos');
      
let articulosCarrito = [];

const limpiarHTML = () => {
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
}

const sincronizarStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
};

const carritoHTML = () => {
    limpiarHTML();

    articulosCarrito.forEach(articulo => {
        const { imagen, descripcion, precio, cantidad, id } = articulo;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="tdmodal">
                <img src=${imagen} width="100">
            </td>
            <td class="tdmodal">
                ${descripcion}
            </td>
            <td class="tdmodal">
                ${cantidad}
            </td>
            <td class="tdmodal">
                ${precio * cantidad}
            </td>
            <td class="tdmodal">
                <a href=# class="borrar-producto fas fa-times-circle" data-id=${id}> </a>
            </td>
        `;
        
        listaProductos.appendChild(row);
    })
      
    sincronizarStorage();
}

const leerDatosArticulo = (articulo) => {
    const infoArticulo = {
        imagen : articulo.querySelector('img').src,
        descripcion: articulo.querySelector('p.descripcion').textContent,
        precio: articulo.querySelector('.precio span').textContent,
        id: articulo.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(articulo => articulo.id === infoArticulo.id);
    console.log(existe);

    if(existe){
        const articulos = articulosCarrito.map(articulo => {
            if(articulo.id === infoArticulo.id){
                articulo.cantidad++;
                //objeto actualizado
                return articulo;
            }else{
                //objeto sin repetidos
                return articulo;
            }
        })
        articulosCarrito = [...articulos];
    }else{
        articulosCarrito = [...articulosCarrito, infoArticulo];
    }
      
    carritoHTML(infoArticulo);
}

const agregarArticulo = (e) => {
    e.preventDefault();

    if(e.target.classList.contains('agregar_carrito')){
        const articuloSeleccionado = e.target.parentElement;
        leerDatosArticulo(articuloSeleccionado);
    }
}

const eliminarArticulosCarrito = (e) => {
    if(e.target.classList.contains('borrar-producto')){
        const articuloId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(articulo => articulo.id !== articuloId);
        
        carritoHTML();
    }
}

const registrarEventListeners = () => {
    document.addEventListener("DOMContentLoaded", () => {
      articulosCarrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
      carritoHTML();
    });
    
    productos.addEventListener('click', agregarArticulo);

    carrito.addEventListener('click', eliminarArticulosCarrito);

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHTML();
    })
}

registrarEventListeners();
