// fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7fb5c1a57477a9413791eceb21f426c2')
//   .then(response => response.json())
//   .then(json => console.log(json))

// fetch('http://api.openweathermap.org/geo/1.0/direct?q=Tucuman,AR&limit=5&appid=7fb5c1a57477a9413791eceb21f426c2')
//   .then(response => response.json())
//   .then(json => console.log(json))

const getDatosCiudad = async (lat,lon) => {
  const resultado = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7fb5c1a57477a9413791eceb21f426c2`);
  const datos = await resultado.json();
  return console.log(datos)
}

const getCoordenadas = async (ciudad,pais) => {
  const resultado = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=7fb5c1a57477a9413791eceb21f426c2`);
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
  return 0
}

getDatos('Salta','AR');
