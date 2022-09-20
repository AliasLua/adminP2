const formularioUi = document.querySelector("#formulario");
const listaJuegos = document.getElementById("listaJuegos");
const arrayJuegos = [];

const skutabla = document.getElementById("skutabla")
const nombretabla = document.getElementById("nombretabla")
const categoriatabla = document.getElementById("categoriatabla")
const descripciontabla = document.getElementById("descripciontabla")
const publicartabla = document.getElementById("publicartabla")

const crearJuego = (sku, nombre, descripcion, categoria, publicar) => {
  let item = {
    sku: sku,
    nombre: nombre,
    descripcion: descripcion,
    categoria: categoria,
    publicar: false,
  };

  arrayJuegos.push(item);

  return item;
};

// console.log(arrayActividades)

const guardarDB = () => {
  localStorage.setItem("VideoJuegos", JSON.stringify(arrayJuegos));

  mostrarDB();
};

const mostrarDB = () => {
  listaJuegos.innerHTML = "";

  let arrayJuegos = JSON.parse(localStorage.getItem("VideoJuegos"));

  if (arrayJuegos === null) {
    arrayJuegos = [];
  } else {
    arrayJuegos.forEach((element) => {

        if(element.estado){

           
        listaJuegos.innerHTML += `<div class="alert alert-danger" role="alert">
        <i class="material-icons float-left mr-2">accessibility</i><b> ${element.sku} - ${element.nombre} - 
        ${element.descripcion} - ${element.categoria} </b> - ${element.publicar} <span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
        } else { //Pude asignar todos pero si pongo ${element. } no lo corre, no se cual seria lo correcto para que pueda seguirse viendo abajo.
                //tambien me queda la duda de que hacer con el if
                skutabla.innerHTML = element.sku
                nombretabla.innerHTML = element.nombre
                descripciontabla.innerHTML = element.descripcion
                categoriatabla.innerHTML = element.categoria
                publicartabla.innerHTML = element.publicar
            //listaJuegos.innerHTML +=`<div class="alert alert-danger" role="alert">
            //<i class="material-icons float-left mr-2">accessibility</i><b> ${element.sku} - ${element.nombre} - 
            //${element.descripcion} - ${element.categoria} </b> - ${element.publicar} <span class="float-right">
            //<i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
        }
    });
  }
};

 const eliminarDB = (sku) => { 

    let arrayIndex 

    arrayJuegos.forEach((element, index) => {

        if(element.sku === sku){
            arrayIndex = index
        }
    } )

    
     arrayJuegos.splice(arrayIndex, 1);

    guardarDB();

 }
 const editarDB = (sku) => {
    let arrayIndex = arrayJuegos.findIndex( (element) => element.sku === sku);

    console.log(arrayIndex)

    // arrayActividades[arrayIndex].estado = true;
    guardarDB();
 }


formularioUi.addEventListener("submit", (e) => {
  e.preventDefault();

  let skuUi = document.querySelector("#sku").value;
  let nombreUi = document.querySelector("#firstName").value;
  let descripcionUi = document.querySelector("#descripcion").value;
  let categoriaUi = document.querySelector("#categoria").value;
  let publicarUi = document.querySelector("#publicar").value;

  crearJuego(skuUi, nombreUi, descripcionUi, categoriaUi, publicarUi);
  guardarDB();

  formularioUi.reset();
});

document.addEventListener("DOMContentLoaded", mostrarDB);

listaJuegos.addEventListener("click", (e) => {
e.preventDefault();

console.log(e)

if(e.target.innerHTML === "done" || e.target.innerHTML === "delete"){
     let texto = e.path[2].childNodes[3].innerHTML;//ruta para saber que elemento selecciono. e.path[2] es el div que contiene el boton y e.path[2].childNodes[3] es el texto del boton 
   
    if(e.target.innerHTML === "delete"){
       eliminarDB(texto);
    }
    if(e.target.innerHTML === "done"){
       editarDB(texto);
    }

 }


})