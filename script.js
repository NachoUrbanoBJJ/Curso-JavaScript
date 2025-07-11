//VINOS TINTOS
const productos = [
    {
        id: "vino-01",
        titulo: "Trumpeter Pinot Noir",
        imagen: "./assets/img/Trumpeter Pinot Noir.jpeg",
        categoria: {
            nombre: "Vinos Tintos",
            id: "Vinos-Tintos"
        },
        precio:15000
    },
    {
        id: "vino-02",
        titulo: "Trumpeter Reserva Malbec",
        imagen: "./assets/img/Trumpeter Reserva Malbec Estuche 750ml- Estuche De Regalo  - $ 19_000.jpeg",
        categoria: {
            nombre: "Vinos Tintos",
            id: "Vinos-Tintos"
        },
        precio:25000
    },
    {
        id: "vino-03",
        titulo: "Latitud 33° Cabernet",
        imagen: "./assets/img/Vinho Latitud 33° Cabernet Sauvignon 2019 Terrazas de Los Andes.jpeg",
        categoria: {
            nombre: "Vinos Tintos",
            id: "Vinos-Tintos"
    },
        precio:20000
    },
        {
        id: "vino-04",
        titulo: "Cansillero del diablo",
        imagen: "./assets/img/Casillero del diablo.jpeg",
        categoria: {
            nombre: "Vinos Tintos",
            id: "Vinos-Tintos"
    },
        precio:20000
    },
    //Vinos blancos
    {
        id: "vino-blanco-01",
        titulo: "El Maestro Suavignon",
        imagen: "./assets/img/El maestro Suavignon Blanc.jpeg",
        categoria: {
            nombre: "Vinos Blancos",
            id: "Vinos-Blancos"
    },
        precio:10000
    },
    {
        id: "vino-blanco-02",
        titulo: "Principe de Viana Chardonnay",
        imagen: "./assets/img/Príncipe de Viana Chardonnay.jpeg",
        categoria: {
            nombre: "Vinos Blancos",
            id: "Vinos-Blancos"
    },
        precio:17000
    },
    //Espumosos
       {
        id: "vino-espumoso-01",
        titulo: "Saurus Rose de Syrak",
        imagen: "./assets/img/Vino SAURUS Rose de syrak.jpeg",
        categoria: {
            nombre: "Vinos Espumosos",
            id: "Vinos-Espumosos"
    },
        precio:10000
    },
    {
        id: "vino-espumoso-02",
        titulo: "Riccadonna Prosecco Espumoso",
        imagen: "./assets/img/VINO ESPUMOSO RICCADONNA PROSECCO 750 ML.jpeg",
        categoria: {
            nombre: "Vinos Espumosos",
            id: "Vinos-Espumosos"
    },
        precio:20000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}"alt="${producto.titulo}"> 
              <div class="producto-detalles">
              <h3 class="producto-titulo">${producto.titulo}</h3>
              <p class="producto-precio">$${producto.precio}</p>
              <button class="producto-agregar" id="${producto.id}"> Agregar al carrito</button>
              </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

    cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click" , (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }


    }) 
});

function actualizarBotonesAgregar() {
     botonesAgregar = document.querySelectorAll(".producto-agregar");

     botonesAgregar.forEach (boton => {
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



function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {

        const nuevoProducto = {
    ...productoAgregado,
    cantidad: 1
    };
    productosEnCarrito.push(nuevoProducto);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
