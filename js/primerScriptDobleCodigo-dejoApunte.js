const productosData = 'https://4lurageek-api.vercel.app/product';
//const productosData = 'https://s-ol3.github.io/4lura-4luraGeek/assets/data/products.json';

/*
 
// función para mostrar los productos en la página desde la api/json, apago, esta abajo de nuevo, pero funciona, hecho con curso alura 'js consumiendo y manejando datos de una API'
function mostrarProductos() {
  fetch(productosData)
    .then(response => response.json())
    .then(data => {
      const productosContainer = document.getElementById('productos-container');
      data.forEach(producto => {
        // productoHTML = cada tarjeta de producto, ${producto.img} trae el link de la imagen cargado en el json
        const productoHTML = `
        <div class="product-card">
          <img class="product-img" src="${producto.img}" alt="${producto.name}">
          <h4 class="product-name">${producto.name}</h4>
          <div class="product-content-box">
            <div class="product-content">
              <h3 class="product-price">$${producto.price}</h3>
              <div class="splitters"></div>
              <button><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>    
        `;
        // igual a 'productosContainer.innerHTML = productosContainer.innerHTML + productoHTML' (todos los productos + el siguiente producto)
        productosContainer.innerHTML += productoHTML;
      });
    })
    .catch(error => console.error('Error al obtener los productos:', error));
} 

// llama a la función para mostrar los productos al cargar la página
window.addEventListener('DOMContentLoaded', mostrarProductos);

*/




// variable para almacenar los productos
let productos = [];

// función para mostrar los productos, then y catch mas abajo
function mostrarProductos() {
  const productosContainer = document.getElementById('productos-container');
  productosContainer.innerHTML = ''; // limpiar el contenedor

  // recorrer la lista de productos y generar el HTML
  productos.forEach(producto => {
    const productoHTML = `
      <div class="product-card">
        <img class="product-img" src="${producto.img}" alt="${producto.name}">
        <h4 class="product-name">${producto.name}</h4>
        <div class="product-content-box">
          <div class="product-content">
            <h3 class="product-price">$${producto.price}</h3>
            <div class="splitters"></div>
            <button onclick="eliminarProducto(${producto.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });
}

// función para agregar un producto
function agregarProducto(event) {
  event.preventDefault(); // evitar el envío del formulario

  // obtener los valores del formulario
  const nombre = document.querySelector('input[name="name"]').value;
  const precio = parseFloat(document.querySelector('input[name="price"]').value);
  const imagen = document.querySelector('input[name="image"]').value;

  // crear un nuevo objeto producto
  const nuevoProducto = {
    id: productos.length + 1, // generar un nuevo ID
    name: nombre,
    price: precio,
    img: imagen
  };

  // agregar el nuevo producto a la lista
  productos.push(nuevoProducto);

  // mostrar los productos actualizados
  mostrarProductos();

  // limpiar el formulario
  document.querySelector('form').reset();
}

// función para eliminar un producto
function eliminarProducto(id) {
  // filtrar los productos para mantener solo aquellos que no coinciden con el ID dado
  productos = productos.filter(producto => producto.id !== id);

  // mostrar los productos actualizados
  mostrarProductos();
}

// event listener para agregar un producto cuando se envía el formulario
document.querySelector('#form-btn-add').addEventListener('click', agregarProducto);

// llamada inicial para mostrar los productos al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  // obtener los datos de los productos del JSON
  fetch(productosData)
    .then(response => response.json())
    .then(data => {
      productos = data; // almacenar los productos obtenidos
      mostrarProductos(); // mostrar los productos
    })
    .catch(error => console.error('Error al obtener los productos:', error));
});






