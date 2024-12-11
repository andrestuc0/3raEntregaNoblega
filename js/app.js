// Array de productos
const productos = [
    { id: 1, nombre: "Remera Goku", precio: 1000, img: "./img/remeras/remera-goku.webp", categoria: "remeras" },
    { id: 2, nombre: "Remera Negra", precio: 800, img: "./img/remeras/remera-negra.webp", categoria: "remeras" },
    { id: 3, nombre: "Remera Blanca", precio: 800, img: "./img/remeras/remera-blanca.webp", categoria: "remeras" },
    { id: 4, nombre: "Remera Paz", precio: 900, img: "./img/remeras/remera-paz.webp", categoria: "remeras" },
    { id: 5, nombre: "Zapatillas Rojas", precio: 2000, img: "./img/zapatillas/zapa-1.webp", categoria: "zapatillas" },
    { id: 6, nombre: "Zapatillas Azules", precio: 2200, img: "./img/zapatillas/zapa-2.webp", categoria: "zapatillas" },
    { id: 7, nombre: "Zapatillas Verdes", precio: 1800, img: "./img/zapatillas/zapa-3.webp", categoria: "zapatillas" },
    { id: 8, nombre: "Zapatillas Negras", precio: 2500, img: "./img/zapatillas/zapa-4.webp", categoria: "zapatillas" },
];

const contenedorProductos = document.querySelector(".contenedorProductos");
const botonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector(".tituloPrincipal");
const numerito = document.querySelector(".cantidad");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `
            <img class="productoImg" src="${producto.img}" alt="${producto.nombre}">
            <div class="productoDescript">
                <h3 class="productoTitulo">${producto.nombre}</h3>
                <p class="productoPrecio">$${producto.precio}</p>
                <button class="productoAgregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !== "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".productoAgregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton));

    if (productosEnCarrito.some(producto => producto.id === parseInt(idBoton))) {
        const index = productosEnCarrito.findIndex(producto => producto.id === parseInt(idBoton));
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


