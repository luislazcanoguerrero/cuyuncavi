
document.addEventListener('DOMContentLoaded', () => {

    //1. Crar el objeto mapa
    let map = L.map('map', { fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } });

    //2. Estableciendo el centro y nivel de zoom
    map.setView([-33.393850938743675,-71.12627685070039], 18)

    //3.- Añadir una cartografía base
    const baseMapa = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors',
        errorTileUrl: '0',
        minZoom: 3
    });
    baseMapa.addTo(map);


    // 4. Añadiendo un visor con las coordenadas
    L.control.coordinates({
        position: "bottomleft",
        decimals: 6,
        enableUserInput: false,
        decimalSeperator: ",",
        labelTemplateLat: "{y}",
        labelTemplateLng: "{x}"
    }).addTo(map);


    //5. Insertando una leyenda en el mapa
    var legend = L.control({
        position: 'topright'
    });

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<img alt="Descripcion de la imagen" src="/images/predi.png" width="80px" title="Estas buenas nuevas del Reino se predicarán en toda la tierra habitad">';
        return div;
    };
    legend.addTo(map);

    // 6. Herramienta de medición de distancia 
    var options = {
        position: 'topleft',
        lengthUnit: {
            display: 'km',
            label: 'Distancia: ',
            decimal: 2,
        },
        angleUnit: {
            display: '&deg;',
            decimal: 2,
            factor: null,
            label: 'Rumbo: '
        }
    };
    L.control.ruler(options).addTo(map);

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
            map.flyTo([latitud, longitud], 18)
        })

        botonera.appendChild(boton)
    })


    function muestraFeatureDatos(feature, layer) {
        //Encontrando el centro del poligono
        var polygon = L.polygon(feature.geometry.coordinates[0])
        const { lat, lng } = polygon.getBounds().getCenter()

        layer.on('click', function (e) {
            console.log(`"latitud":"${e.latlng.lat}","longitud":"${e.latlng.lng}"`)
            console.log(`${e.latlng.lat},${e.latlng.lng}`)
        })

        if (feature.properties) {
            layer.bindPopup(`Territorio N°: ${feature.properties.name}`);
        }
    }


})

