const vinos = [
    {nombre: 'Malbec Reserva', tipo: 'Tinto', precio: 15500},
    {nombre: 'chardonnay', tipo: 'Blanco', precio:4500},
    {nombre: 'Pinot Noir', tipo:'Tinto', precio:10500},
    {nombre: 'Suavignon Blanc', tipo:'Blanco', precio:6500},
    {nombre: 'Rosé de Syrak', tipo:'Rosado', precio:12000},
    {nombre: 'Prosecco', tipo:'Espumoso', precio:16000},
    {nombre: 'Cabernet Suavignon', tipo:'Tinto', precio:12500},
];
function filtrarVinos(tipo) {
  const vinosFiltrados = vinos.filter(vino => vino.tipo === tipo);
  const listaVinos = document.getElementById('listaVinos');
  listaVinos.innerHTML = '';

  if (vinosFiltrados.length > 0) {
    vinosFiltrados.forEach(vino => {
      const li = document.createElement('li');
      li.textContent = `${vino.nombre} - $${vino.precio}`;
      listaVinos.appendChild(li);
    });
    if (vinosFiltrados === 0) {
      listaVinos.innerHTML = '<p class= "text.center"> No hay vinos disponibles en esta seccion.</p>'
    }
  } else {
    alert(`No hay vinos de tipo ${tipo} disponibles.`);
  }
}

const nombreUsuario = prompt("¿Cuál es tu nombre?");
if (nombreUsuario) {
  alert(`Hola, ${nombreUsuario}!`);
  const deseaVerVinos = confirm("¿Deseas ver los vinos disponibles?");
  if (deseaVerVinos) {
    alert("A continuación, te mostramos los vinos disponibles.");

  } else {
    alert("Entendido, que tengas un buen día.");
  }
} else {
  alert("No se proporcionó un nombre.");
}

//Pedir la edad del usuario
const edad = Number(prompt("Por favor, introduzca su edad:"));

if (isNaN(edad) || edad <= 0 ) {
    alert("Por favor, ingrese una edad valida.");
} else if (edad <18) {
    alert("Eres menor de edad, no se te permitira interactuar con la pagina.");
    //Ocultar o deshabilitar seccion de vinos
    document.getElementById('listaVinos').style.display = 'none';
} else {
    alert("Bienvenido a la Vinoteca,");
    document.getElementById('listaVinos').style.display = 'block';
}

console.log(nombreUsuario);

function ordenarVinosPorPrecio(vinosFiltrados) {
  return vinosFiltrados.sort((a, b) => a.precio - b.precio);
}
//Pequeño cuestionario
const preguntas = [
  {
    pregunta:"¿Cual es el tipo de vino mas vendido en Argentina?",
    opciones: ["Malbec", "Cabernet Suavignon", "Syrah", "Chardonnay"],
    respuestaCorrecta:1
  },
  {
    pregunta: "¿Que tipo de vino es un Prosecco?",
    opciones: ["Tinto", "Blanco", "Rosado", "Espumoso"],
    respuestaCorrecta:3
  },
  {
    pregunta:"¿Cual es el pais de origen del Chardonnay?",
    opciones: ["Argentina", "Francia", "Italia", "España"],
    respuestaCorrecta:1
  }
];
function iniciarCuestionario() {
  let respuestasCorrectas = 0;

  preguntas.forEach((pregunta, index) => {
    const respuesta = prompt(
      `${pregunta.pregunta}\n\n` +
      pregunta.opciones.map((opcion, i) => `${i + 1}. ${opcion}`).join("\n") +
      `\n\nIngresa el número de tu respuesta (1-${pregunta.opciones.length}):`
    );

    if (parseInt(respuesta) - 1 === pregunta.respuestaCorrecta) {
      respuestasCorrectas++;
    }
  });

  alert(`Has respondido correctamente ${respuestasCorrectas} de ${preguntas.length} preguntas.`);
}

iniciarCuestionario();

