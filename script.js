const vinos = [
    {
        nombre: 'Trumpeter Reserva Malbec',
        tipo: 'tinto',
        precio: 19000,
        imagen: 'Trumpeter Reserva Malbec Estuche 750ml- Estuche De Regalo  - $ 19_000.jpeg'
    },
    {
        nombre: 'Príncipe de Viana Chardonnay',
        tipo: 'blanco',
        precio: 7000,
        imagen: 'Príncipe de Viana Chardonnay.jpeg'
    },
    {
        nombre: 'Trumpeter Pinot Noir',
        tipo: 'tinto',
        precio: 50000,
        imagen: 'Trumpeter Pinot Noir.jpeg'
    },
    {
        nombre: 'El maestro Suavignon Blanc',
        tipo: 'blanco',
        precio: 9000,
        imagen: 'El maestro Suavignon Blanc.jpeg'
    },
    {
        nombre: 'Vino SAURUS Rose de syrak',
        tipo: 'rosado',
        precio: 12000,
        imagen: 'Vino SAURUS Rose de syrak.jpeg'
    },
    {
        nombre: 'Prosecco DOC Extra Dry',
        tipo: 'espumoso',
        precio: 30000,
        imagen: 'Prosecco DOC Extra Dry - Viticoltori Ponte #etichette_vino #Francescon #Collodi.jpeg'
    },
    {
        nombre: 'Vinho Latitud 33° Cabernet Sauvignon',
        tipo: 'tinto',
        precio: 40000,
        imagen: 'Vinho Latitud 33° Cabernet Sauvignon 2019 Terrazas de Los Andes.jpeg'
    }
];

// Función para generar cards de vinos
function generarCards(tipo = 'todos') {
    const vinosElement = document.querySelector('.vinos');
    if (!vinosElement) return;
    
    vinosElement.innerHTML = '';

    const vinosFiltrados = vinos.filter(vino => {
        if (!tipo || tipo === 'todos') return true;
        return vino.tipo.toLowerCase() === tipo.toLowerCase();
    });

    vinosFiltrados.forEach(vino => {
        const vinoElement = document.createElement('div');
        vinoElement.classList.add('vino');
        
        // Crear la URL de la imagen de forma segura
        const imagenUrl = `./assets/img/${encodeURIComponent(vino.imagen)}`;
        
        vinoElement.innerHTML = `
            <div class="imagen-container">
                <img src="${imagenUrl}" alt="${vino.nombre}" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'no-imagen\'>Imagen no disponible</div>'">
            </div>
            <div class="info">
                <h2 class="titulo">${vino.nombre}</h2>
                <p class="descripcion">Vino ${vino.tipo} ${vino.nombre}</p>
                <div class="precio">$${vino.precio}</div>
                <button class="agregar-carrito">Agregar al carrito</button>
            </div>
        `;
        vinosElement.appendChild(vinoElement);
    });

    // Agregar eventos a los botones de agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
            const vino = {
                nombre: boton.parentNode.querySelector('.titulo').textContent,
                precio: parseFloat(boton.parentNode.querySelector('.precio').textContent.replace('$', '')),
                tipo: boton.parentNode.querySelector('.descripcion').textContent.split(' ')[1]
            };
            agregarAlCarrito(vino);
        });
    });
}

// Array de almacenamiento de productos
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar al carrito
function agregarAlCarrito(vino) {
    carrito.push(vino);
    guardarCarrito();
    actualizarCarrito();
}

// Actualizar el carrito
function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    if (!carritoLista) return;
    
    carritoLista.innerHTML = '';

    let total = 0;

    carrito.forEach((vino, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-carrito">
                <span class="nombre-vino">${vino.nombre}</span>
                <span class="precio-vino">$${vino.precio}</span>
                <button class="btn-eliminar">Eliminar</button>
            </div>
        `;
        
        const botonEliminar = li.querySelector('.btn-eliminar');
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(index);
        });
        
        carritoLista.appendChild(li);
        total += vino.precio;
    });

    // Actualizar ambos totales
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `Total: $${total}`;
    }
}

// Función para eliminar del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Evento para el botón de vaciar carrito
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el carrito
    const carritoElement = document.getElementById('carrito');
    if (carritoElement) {
        carritoElement.style.display = 'block';
    }

    // Evento para el botón de pagar
    const botonPagar = document.getElementById('pagar');
    const opcionesPagoElement = document.getElementById('opciones-pago');
    
    if (botonPagar && opcionesPagoElement) {
        botonPagar.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            opcionesPagoElement.style.display = 'block';
        });
    }

    const botonesFiltro = document.querySelectorAll('.filtro');
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            const tipo = boton.getAttribute('data-filtro');
            if (tipo) {
                generarCards(tipo);
            }
        });
    });

    // Generar cards iniciales
    generarCards();

    // Cargar carrito al iniciar
    actualizarCarrito();

    // Evento para vaciar carrito
    const botonVaciar = document.getElementById('vaciar-carrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            carrito = [];
            guardarCarrito();
            actualizarCarrito();
            if (opcionesPagoElement) {
                opcionesPagoElement.style.display = 'none';
            }
        });
    }

    // Eventos para opciones de pago
    const opcionesPago = {
        'tarjeta': 'Pago con tarjeta',
        'efectivo': 'Pago con efectivo',
        'transferencia': 'Pago con transferencia',
        'paypal': 'Pago con PayPal',
        'mercadopago': 'Pago con Mercado Pago'
    };

    Object.keys(opcionesPago).forEach(metodo => {
        const boton = document.getElementById(metodo);
        if (boton) {
            boton.addEventListener('click', () => {
                alert(opcionesPago[metodo]);
                if (opcionesPagoElement) {
                    opcionesPagoElement.style.display = 'none';
                }
            });
        }
    });
});