// URL del archivo JSON alojado en línea
const productosData = 'https://s-ol3.github.io/4lura-4luraGeek/assets/data/products.json';

// Función para mostrar los productos en la página
function mostrarProductos() {
  fetch(productosData)
    .then(response => response.json())
    .then(data => {
      const productosContainer = document.getElementById('productos-container');
      data.forEach(producto => {
        const productoHTML = `
        <div class="product-card">
        <img class="product-img" src="${producto.img}" alt="${producto.name}">
        <h4 class="product-name">${producto.name}</h4>
        <div class="product-content-box">
          <div class="product-content">
            <h3 class="product-price">$${producto.price}</h3>
            <div class="splitters"></div>
            <div><i class="fa-solid fa-trash"></i></div>
          </div>
        </div>
      </div>
        `;
        productosContainer.innerHTML += productoHTML;
      });
    })
    .catch(error => console.error('Error al obtener los productos:', error));
}

// Llama a la función para mostrar los productos al cargar la página
window.addEventListener('DOMContentLoaded', mostrarProductos);

