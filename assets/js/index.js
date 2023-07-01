const propiedadesJSON = [
    {
      name: "Casa de campo",
      description: "Un lugar ideal para descansar de la ciudad",
      // src: "../assets/img/CasaDeCampo.jpg",
      src:
        "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
      rooms: 2,
      m: 170
    },
    {
      name: "Casa de playa",
      description: "Despierta tus días oyendo el oceano",
      src:
        "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
      rooms: 2,
      m: 130
    },
    {
      name: "Casa en el centro",
      description: "Ten cerca de ti todo lo que necesitas",
      src:
        "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
      rooms: 1,
      m: 80
    },
    {
      name: "Casa rodante",
      description: "Conviertete en un nómada del mundo sin salir de tu casa",
      src:
        "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
      rooms: 1,
      m: 6
    },
    {
      name: "Departamento",
      description: "Desde las alturas todo se ve mejor",
      src:
        "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
      rooms: 3,
      m: 200
    },
    {
      name: "Mansión",
      description: "Vive una vida lujosa en la mansión de tus sueños ",
      src:
        "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
      rooms: 5,
      m: 500
    }
  ];


// se declaran los elementos que rescatan los elementos del DOM
let boton = document.querySelector('button');
let cuartos = document.querySelector('#cuartos');
let desde = document.querySelector('#desde');
let hasta = document.querySelector('#hasta');
let errorCuartos = document.querySelector('#errorCuartos');
let errorMetros = document.querySelector('#errorMetros');
let total = document.querySelector('#total');
let propiedades = document.querySelector('.propiedades');
// se declara un contador para el total
let contador = 0;
// se declara la variable html que contendrá las tarjetas que cumplan con las condiciones pedidas
// y que luego se traspasará al DOM
let html = '';


for (let dato of propiedadesJSON) {
  html += `
    <div class="propiedad">
      <div class="img"><img src="${dato.src}"></div>
      <section>
          <h5>${dato.name}</h5>
          <div class="d-flex justify-content-between">
              <p>Cuartos: ${dato.rooms}</p>
              <p>Metros: ${dato.m}</p>
          </div>
          <p class="my-3">Mansión gigante</p>
          <button class="btn btn-info">Ver más</button>
      </section>
    </div>
    `;
  total.innerHTML = 6;
  propiedades.innerHTML = html;
}

// se usa un Oídor para rescatar el evento Click y se define una función anónima
// que contiene las instrucciones a realizar
boton.addEventListener('click', function() {
  html = '';

  // Se implementa una lógica en caso de que algún campo esté vacío, o bien no cumpla
  // un requerimiento lógico básico como, por ejemplo el primer campo de metros,
  // no puede ser mayor o igual al segundo, o que el número de cuartos sea 0
  if (cuartos.value == '') {
    alert('El campo CUARTOS, está vacío');
  } else if (cuartos.value != '' && desde.value == '' && hasta.value == '') {
    alert('Por favor, indique DESDE y HASTA cuantos metros desea hacer la búsqueda');
  } else if (desde.value == '' && hasta.value != '') {
    alert('Por favor, indique DESDE cuantos metros desea buscar')
  } else if (desde.value != '' &&  hasta.value == '') {
    alert('Por favor, indique HASTA cuantos metros desea buscar');
  } else if (Number(desde.value) >= Number(hasta.value)) {
    alert('El valor del camplo DESDE, debe ser menor al de HASTA');
  } else
  // Además de un mensaje de advetencia, se limpian los campos con valores negativos.
  // se evita la limpieza total, porque un potencial usuario podría seguir haciendo
  // búsquedas con los restantes valores. Por ejemplo, podría buscar entre 10 a 500
  // metros cuadrados y varias apenas el número de habitaciones, y me parece que sería
  // algo molesto estar llenando todos los campos, cuando apenas necesita modificar uno
  if (Number(cuartos.value) < 0 ) {
    alert('Cuidado, el campo CUARTOS tiene un valor negativo');
    cuartos.value = '';
  } else if (Number(desde.value) < 0) {
    alert('Cuidado, el campo DESDE tiene un valor negativo');
    desde.value = '';
  } else if (Number(hasta.value) < 0) {
    alert('Cuidado, el campo HASTA tiene un valor negativo');
    hasta.value = '';
   } else {
    console.log('Todo parece estar bien');// este mensaje es solo auxiliar al código
   }
  
  // coincidencias();

  // si todo está bien, se compara la información ingresada, con el contenido
  // y se dibujan las tarjetas respectivas
  // en este caso, el número de cuartos ingresados se considera como VALOR MÍNIMO
  for(let dato of propiedadesJSON) {
    if (Number(dato.rooms) >= Number(cuartos.value) && Number(cuartos.value) > 0 && Number(dato.m) >= Number(desde.value) && Number(desde.value) > 0 && Number(dato.m) <= Number(hasta.value) && Number(hasta.value) > 0 ) {
      // plantilla para la construcción de tarjetas a incluir en Propiedades
      html += `
      <div class="propiedad">
        <div class="img"><img src="${dato.src}"></div>
        <section>
            <h5>${dato.name}</h5>
            <div class="d-flex justify-content-between">
                <p>Cuartos: ${dato.rooms}</p>
                <p>Metros: ${dato.m}</p>
            </div>
            <p class="my-3">Mansión gigante</p>
            <button class="btn btn-info">Ver más</button>
        </section>
      </div>
      `;
      contador++;
    }
    total.innerHTML = contador;
    propiedades.innerHTML = html;
  }
  // al salir del ciclo for, volvemos el contador a 0, para que no acumule los Click dados.
  contador = 0;
  coincidencias();
});

function coincidencias() {
  let empate = 0;

  for(let dato of propiedadesJSON) {
    if(Number(dato.m) < Number(desde.value) || Number(dato.m) > Number(hasta.value) || Number(dato.rooms) != Number(cuartos.value)) {
      console.log('dentro del for', empate); // se incluye acción no visible para el usuario
    } else {
      empate++;
    }
  }

  if(empate == 0) {
    alert('No se encontraron coincidencias. Modifique la información ingresada e inténtelo otra vez');
  } else {
    console.log('nada')
  }
}