// fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7fb5c1a57477a9413791eceb21f426c2')
//   .then(response => response.json())
//   .then(json => console.log(json))

// fetch('http://api.openweathermap.org/geo/1.0/direct?q=Tucuman,AR&limit=5&appid=7fb5c1a57477a9413791eceb21f426c2')
//   .then(response => response.json())
//   .then(json => console.log(json))

const getDatosCiudad = async (lat,lon) => {
  const resultado = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7fb5c1a57477a9413791eceb21f426c2&units=metric&lang=es`);
  const datos = await resultado.json();
  return datos
}

const getCoordenadas = async (ciudad,pais) => {
  const resultado = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=7fb5c1a57477a9413791eceb21f426c2`);
  const coordenadas = await resultado.json();
  return coordenadas
}

const getDatos = async (ciudad,pais) => {
  let lat = 0;
  let lon = 0;
  const coordenadas = await getCoordenadas(ciudad,pais);
  const datos = coordenadas.map(ciudad => {
    lat = ciudad.lat;
    lon = ciudad.lon;

  })
  const datosObj = await getDatosCiudad(lat,lon);
  console.log('hola');
  console.log(datosObj);
  return datosObj
}

const setDatos = async () => {
  let ciudad = document.getElementById('nombreCiudad').value;
  let codigo = document.getElementById('codPais').value;
  let codigoImg,textClima;
  const div = document.getElementById('card');
  const div1 = document.getElementById('minima');
  const div2 = document.getElementById('maxima');

  const datosClima = await getDatos(ciudad,codigo);

  const datImg = (datosClima.weather).map(cod => {
    codigoImg = cod.icon;
    textClima = cod.description;
  })

  const card = (
    `
    <div class="card-fluid text-center mt-5" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title fs-2 fw-bold">${datosClima.name}</h5>
        <img src="https://openweathermap.org/img/wn/${codigoImg}@2x.png" class="card-img w-25" alt="...">
        <p class="card-text fs-1 fw-bold">${datosClima.main.temp}°C</p>
        <p class="card-text fs-5">${textClima}</p>
      </div>
    </div>
    `
  )

  const card1 = (
    `
    <div class="card text-center mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title fs-4">Minima</h5>
        <p class="card-text fs-5 fw-bold">${datosClima.main.temp_min}°C</p>
      </div>
    </div>
    `
  )

  const card2 = (
    `
    <div class="card text-center mb-3" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title fs-4">Maxima</h5>
        <p class="card-text fs-5 fw-bold">${datosClima.main.temp_max}°C</p>
      </div>
    </div>
    `
  )

  div.innerHTML = card;
  div1.innerHTML = card1;
  div2.innerHTML = card2;
}

setDatos();