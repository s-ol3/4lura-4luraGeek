//const productosData = 'http://localhost:4000/products'; // 'npm start' para iniciar json server y usar db.json -api local-
//const productosData = 'https://4lurageek-api.vercel.app/products'; //requiere recarga de pagina, y edita a pesar de los '500 error servidor' en consola y las alertas 'error' rojas, a veces no muestra alertas, delete no muestra alerta, da error en consola, pero borra igual
//const productosData = 'db.json'; //error cors

//const productosData = 'https://my-json-server.typicode.com/s-ol3/4lura-4lurageek-api-typicode/products'; //funciona add (hasta la siguiente recarga), c alerta, delete hace una simulacion de borrado sobre los datos ya cargados en json, c alerta
const productosData = 'https://66920d8526c2a69f6e915c35.mockapi.io/flix/products';  // funciona mejor, sin errores... y mantiene los datos, no como vercel




// variable para almacenar los productos
let productos = [];



// ..................................... funcion para mostrar los productos
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
            <button class="btn-delete" data-id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    `;
    productosContainer.innerHTML += productoHTML;
  });

  // agregar event listener a los botones de eliminar producto
  const botonesEliminar = document.querySelectorAll('.btn-delete');
  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-id');
      eliminarProducto(id);
    });
  });
}




// ..................................... funcion para agregar un producto
function agregarProducto(event) {
  event.preventDefault(); // evitar el envio del formulario


  // obtener los valores del formulario
  const nombre = document.querySelector('input[name="name"]').value.trim();
  const precio = parseFloat(document.querySelector('input[name="price"]').value);
  const imagen = document.querySelector('input[name="image"]').value.trim();

  // validar los campos del formulario
  const errors = {};

  if (nombre === '') {
    errors.nombre = 'Ingresa el nombre del producto';
  } else {
    errors.nombre = '';
  }

  if (nombre.length < 3) {
    errors.nombre = 'Ingresa al menos 3 caracteres';
  }

  if (isNaN(precio) || precio < 0 || precio > 999999) {
    errors.precio = 'Ingresa un número de 0 a 999999';
  } else {
    errors.precio = '';
  }

  if (imagen === '' || !/^(http|https):\/\/[^ "]+$/.test(imagen)) {
    errors.imagen = 'Ingresa un enlace válido';
  } else {
    errors.imagen = '';
  }

  // actualizar los mensajes de error en el formulario
  document.getElementById('error-name').textContent = errors.nombre;
  document.getElementById('error-price').textContent = errors.precio;
  document.getElementById('error-image').textContent = errors.imagen;

  // si hay errores, detener el proceso
  if (Object.values(errors).some(error => error !== '')) {
    return;
  }


  // crear un nuevo objeto producto
  const nuevoProducto = {
    name: nombre,
    price: precio,
    img: imagen
  };

  // enviar el nuevo producto al servidor JSON local
  fetch(productosData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(nuevoProducto),
  })
    .then(response => response.json())
    .then(data => {
      productos.push(data); // agregar el nuevo producto al array json local
      mostrarProductos(); // actualizar la interfaz

      //alert('Producto agregado ✔');
      mostrarAlerta('Producto agregado ✔', 'success'); // alert personalizada

      document.querySelector('form').reset(); // reset formulario
    })
    .catch(error => {
      console.error('Error al agregar producto:', error);
      mostrarAlerta('Hubo un error al agregar el producto', 'error'); // mostrar alerta de error
    });
}



// ..................................... funcion para eliminar un producto
function eliminarProducto(id) {
  // enviar solicitud DELETE al servidor JSON local
  fetch(`${productosData}/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo eliminar el producto');
      }
      // actualizar array local quitando el producto eliminado
      productos = productos.filter(producto => producto.id !== parseInt(id));
      mostrarProductos(); // actualizar interfaz

      //alert('Producto eliminado ✔');
      mostrarAlerta('Producto eliminado ✔', 'success'); 

      fetchData();
    })
    .catch(error => console.error('Error al eliminar producto:', error));
}




// ..................................... funcion para obtener los datos mas recientes del servidor, para despues de eliminar
function fetchData() {
  fetch(productosData)
    .then(response => response.json())
    .then(data => {
      productos = data; // actualizar el array de productos
      mostrarProductos(); // volver a renderizar la lista de productos
    })
    .catch(error => console.error('Error al obtener los productos:', error));
}



// event listener para agregar un producto cuando se envia el formulario
document.getElementById('formulario').addEventListener('submit', agregarProducto);



// event listener para limpiar los mensajes de error al hacer clic en 'limpiar'
document.getElementById('form-btn-reset').addEventListener('click', () => {
  document.getElementById('error-name').textContent = '';
  document.getElementById('error-price').textContent = '';
  document.getElementById('error-image').textContent = '';
});




// ..............  llamada inicial para obtener los productos al cargar la pagina
window.addEventListener('DOMContentLoaded', () => {
  fetchData(); // obtener los productos al cargar la pagina
});


// .............................................. funcion para mostrar alertas personalizadas
function mostrarAlerta(message, type) {
  const alertContainer = document.getElementById('alert-container');
  const alert = document.createElement('div');
  alert.textContent = message;
  alert.classList.add('alert', type);
  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.classList.add('closing');
    setTimeout(() => {
      alert.remove();
    }, 1000); // tiempo = al de la animacion CSS
  }, 3000); // tiempo de visualizacion de la alerta
}
