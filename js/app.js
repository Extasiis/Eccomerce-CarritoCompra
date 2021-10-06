const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaProducto = document.querySelector("#lista-producto");

//carrito de compra #5
let carritoCompra = [];

/* Debug
console.log(carrito);
console.log(listaCarrito);
console.log(vaciarCarrito);
console.log(listaProducto);
*/

//Contenerdor de addEventListener #2
addEventListener();
function addEventListener() {
  listaProducto.addEventListener("click", seleccionarProducto);
  carrito.addEventListener("click", eliminarProducto);
  document.addEventListener("DOMContentLoaded", carritoLocalStorage);
  vaciarCarrito.addEventListener("click", vaciandoCarrito);
}

//Funcion Seleciona Producto #3
function seleccionarProducto(e) {
  if (e.target.classList.contains("card__btn-2")) {
    const seleccionado = e.target.parentElement.parentElement;

    leerSelecionado(seleccionado);
  }
}

//Funcion leer datos #4
function leerSelecionado(seleccionado) {
  const infoSeleccionado = {
    image: seleccionado.querySelector("img").src,
    title: seleccionado.querySelector("h4").textContent,
    price: seleccionado.querySelector("p").textContent,
    id: seleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  carritoCompra = [...carritoCompra, infoSeleccionado];
  carritoHTML();
}

//Funcion Creando el HTML #6
function carritoHTML() {
  limpiadorCarritoHTML();

  carritoCompra.forEach((carrito) => {
    const { image, title, price, cantidad, id } = carrito;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src=${image} ></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="btn-eliminar" data-id="${id}"></a>
            </td>
        `;
    contenedorCarrito.appendChild(row);

    localStorageGet();
  });
}

// Funcion vacia el arreglo #7
function limpiadorCarritoHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

//Eliminar Producto #8
function eliminarProducto(e) {
  if (e.target.classList.contains("btn-eliminar")) {
    iDProducto = e.target.getAttribute("data-id");

    carritoCompra = carritoCompra.filter(
      (carrito) => carrito.id !== iDProducto
    );
    carritoHTML();
  }
}

//Vaciando el carrtio #9
function vaciandoCarrito(e) {
  e.preventDefault();
  carritoCompra = [];
  carritoHTML();
}

//Local Storage set #10
function localStorageGet() {
  localStorage.setItem("carrito", JSON.stringify(carritoCompra));
}

//Local Storage get #11
function carritoLocalStorage() {
  carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];

  carritoHTML();
}
