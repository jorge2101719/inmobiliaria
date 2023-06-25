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

// se usa un Oídor para rescatar el evento Click y se define una función anónima
// que contiene las instrucciones a realizar
boton.addEventListener('click', function() {
  html = '';
  contador = 0;
  for (let dato of propiedadesJSON) {
    // comienza examinando condiciones erradas
    if (cuartos.value == '' || Number(cuartos.value) < 1) {
      errorCuartos.innerHTML = `El número de cuartos ha de ser al menos 1`;
      errorCuartos.style.backgroundColor = 'red';
      errorCuartos.style.marginTop = '10%';
      errorCuartos.style.padding = '2%';
      errorCuartos.style.borderRadius = '10px';
    } else if (desde.value == '') {
      errorMetros.innerHTML = 'Por favor, indique desde cuantos metros desea buscar';
      errorMetros.style.backgroundColor = 'red';
      errorMetros.style.borderRadius = '10px';
      errorMetros.style.padding = '2%';
    } else if (hasta.value == '') {
      errorMetros.innerHTML = 'Por favor, indique hasta cuantos metros desea buscar';
      errorMetros.style.backgroundColor = 'red';
      errorMetros.style.borderRadius = '10px';
      errorMetros.style.padding = '2%';
    } else
    // se evalúa si el primer valor del metraje (desde) es mayor o igual que el segundo (hasta)
    if (Number(desde.value) >= Number(hasta.value)) {
      errorMetros.innerHTML = "La longitud no puede ser menor que la del inicio";
      errorMetros.style.backgroundColor = 'red';
      errorMetros.style.marginTop = '10%';
      errorMetros.style.padding = '2%';
      errorMetros.style.borderRadius = '10px';
    } else
    // si todo está bien, se compara la información ingresada, con el contenido
    // y se dibujan las tarjetas respectivas
    // en este caso, el número de cuartos ingresados, se considera como valor mínimo
    if (Number(dato.rooms) >= Number(cuartos.value) && Number(dato.m) >= Number(desde.value) && Number(dato.m) <= Number(hasta.value) ) {
      // se limpian los mensajes de advertencias y errores
      errorCuartos.style.backgroundColor = '';
      errorMetros.style.backgroundColor = '';
      errorMetros.innerHTML = '';
      errorCuartos.innerHTML = '';
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
});