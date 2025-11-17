//L.map es la clase central de la API. Se usa para crear y manipular el mapa. 
// En el mapa establecemos unas coordeanas de la vista y un nivel de zoom.
//1.- Crar el objeto mapa

//import {rotulos} from "../data/rotulos.json"


document.addEventListener('DOMContentLoaded', () => {
    let map = L.map('map');

    // Estableciendo el centro y nivel de zoom
    map.setView([-33.39879895088932, -71.12705591086987], 18)


    //2.- Añadir una cartografía base
    const baseMapa = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors',
        errorTileUrl: '0',
        minZoom: 3
    });
    baseMapa.addTo(map);


    // 4. Añadiendo un visor con las coordenadas
    // SE AGREGA UN DISPLAY DE LAS COORDENADAS
    L.control.coordinates({
        position: "bottomleft",
        decimals: 6,
        enableUserInput: false,
        decimalSeperator: ",",
        labelTemplateLat: "{y}",
        labelTemplateLng: "{x}"
    }).addTo(map);

    //add geojson layer
    const geoJsonUrl = 'data/territorios.json'

    // aqui cargo el geojson pero no parece ocurrir nada
    // Vario la opacidad por cada feature
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: function (feature) {
                    const { codregion, fillColor } = feature.properties
                    return {
                        opacity: 0.8,   // controla la opacidad del borde 
                        stroke: false,   // true = Con Borders remarcados
                        fillColor: fillColor, // Establece el color de relleno del feature
                        fillOpacity: 0.4 // controla el nivel de opacidad ( 0 a 1) del relleno del feature
                    };
                },
                onEachFeature: muestraFeatureDatos
            }).addTo(map)
        })
        .catch(function (error) {
            console.log(`Se produjo el error ->  ${error}`)
        })

    const botonera = document.querySelector("#botonera")
    rotulos.forEach(rotulo => {
        const { name, latitud, longitud } = rotulo

        L.circleMarker([latitud, longitud], {
            radius: 18,
            fillColor: '#fff000',
            color: '#000000',
            fillOpacity: 1
        }).addTo(map);

        var text = L.tooltip({
            permanent: true,
            direction: 'center',
            className: 'my-label'
        })
            .setContent(name)
            .setLatLng([latitud, longitud]);
        text.addTo(map)


        const boton = document.createElement('button')
        boton.className = 'btn btn-outline-success text-dark m-1 btn-sm'
        boton.innerHTML = `${name.toString().padStart(3, '0')}`
        
        boton.addEventListener('click', (e) => {
            console.log(e)
            map.flyTo([latitud, longitud], 18)
        })
        
        botonera.appendChild(boton)
    })


    function muestraFeatureDatos(feature, layer) {

        //Encontrando el centro del poligono
        var polygon = L.polygon(feature.geometry.coordinates[0])
        const { lat, lng } = polygon.getBounds().getCenter()
        //  var marker = new L.marker([lng,lat], { opacity:1}); //opacity may be set to zero
        //  marker.bindTooltip('xx', { permanent: false, className: "my-label", offset: [0, 0] });
        //  marker.addTo(map);




        //console.log(`{"name":"${feature.properties.name}","latitud":"${latlon.lng}","longitud":"${latlon.lat}"},`)


        // const nuevoBoton = document.createElement('button')
        // nuevoBoton.className = 'btn btn-light btn-sm m-1'      // Para agregar multiples clases
        // nuevoBoton.textContent = Region                        // Establecer el título del boton
        // grupoBotones.appendChild(nuevoBoton)                   // Agregar el elemento al pabre 
        // nuevoBoton.id = codregion;

        // const item = document.createElement('div')
        // const titulo = document.createElement('h6')
        // const boton = document.createElement('button')
        // item.className = 'accordion-item'
        // titulo.className = 'accordion-header'
        // titulo.id = `headingOne${codregion}`

        // boton.className = 'accordion-button text-dark'
        // boton.setAttribute('type', 'button');
        // boton.setAttribute('data-bs-toggle', 'collapse');
        // boton.setAttribute('data-bs-target', `#collapse${codregion}`);
        // boton.setAttribute('aria-expanded', true);
        // boton.setAttribute('aria-controls', `collapse${codregion}`);
        // boton.innerHTML = `<small class='text-danger'>  ${Region} </small>`
        // titulo.appendChild(boton)
        // item.appendChild(titulo)

        // const cuerpo = document.createElement('div')
        // cuerpo.id = `collapse${codregion}`
        // cuerpo.className = 'accordion-collapse collapse'

        // cuerpo.setAttribute('aria-labelledby', `heading${codregion}`)
        // cuerpo.setAttribute('data-bs-parent', '#regionesMenu');

        // const cuerpoDetalle = document.createElement('div')

        // // Creando el slider para controlar la opacidad
        // const slider = document.createElement('input')
        // slider.className = 'form-range'
        // slider.setAttribute('type', 'range')
        // slider.setAttribute('min', 0)
        // slider.setAttribute('max', 1)
        // slider.setAttribute('step', 0.1)
        // slider.setAttribute('value', 0)
        // slider.setAttribute('regionId', `${codregion}`)
        // slider.setAttribute('id', `slider${codregion}`)

        // cuerpoDetalle.className = 'accordion-body'
        // cuerpoDetalle.innerHTML = "<small> Opacity </small>"
        // cuerpoDetalle.appendChild(slider)

        // slider.addEventListener('change', (e) => {
        //     const regionId = e.target.id
        //     xx = document.getElementById(regionId)
        //     //xx.setStyle({ fillOpacity: 1 });
        //     console.log(xx.options)
        // })


        // cuerpo.appendChild(cuerpoDetalle)
        // item.appendChild(cuerpo)
        // regionesMenu.appendChild(item)

        //console.log(document.getElementById("regionesMenu"))

        layer.on('click', function (e) {
            console.log(`"latitud":"${e.latlng.lat}","longitud":"${e.latlng.lng}"`)
            console.log(`${e.latlng.lat},${e.latlng.lng}`)
        })

        if (feature.properties) {
            layer.bindPopup(`Territorio N°: ${feature.properties.name}`);
        }
    }



    for (let i = 1; i <= 133; i++) {

    }


})

