
document.addEventListener('DOMContentLoaded', () => {


    //1. Crar el objeto mapa
    let map = L.map('map', { fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } });

    // CREA OBJETO LAYER CONTROL PARA CONTROLAR LA CAPAS
    const layerControl = L.control.layers(null,null,{ position: 'topleft',collapsed:false});

    //3.- Añadir una cartografía base
    const Topografica = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    const Satelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        minZoom: 0,
        maxZoom: 18
    });

    const OpenStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors',
        errorTileUrl: '0',
        minZoom: 3,
        maxZoom: 19
    });
    OpenStreetMap.addTo(map);

    // AÑADIENDO UN RECUEDRO PARA LAS COORDENADAS
    L.control.coordinates({
        position: "bottomleft",
        decimals: 6,
        enableUserInput: false,
        decimalSeperator: ",",
        labelTemplateLat: "{y}",
        labelTemplateLng: "{x}"
    }).addTo(map);


    // MARCARDO INICIALMENTE UN CENTRO DEL MAPA
    map.setView([-33.393850938743675, -71.12627685070039], 18)


    // CREANDO MARCADORES PARA LUGARES DE REUNIÓN
    const salon = L.marker([-33.40174220812829, -71.13112628459932]);
    const lazcano = L.marker([-33.398629676103276,-71.12742483615877]);
    const barrera = L.marker([-33.40544666167808, -71.14462852478029]);
    const ampuero = L.marker([-33.39134725917198, -71.12310111522676]);
    const mirta = L.marker([-33.39304027400479, -71.12457633018495]);

    // AGRUPARLOS EN UN LAYERGROUP
    const puntos = L.layerGroup([salon, lazcano, barrera, ampuero, mirta]);

        

    // Insertando una imagen en el mapa en la esquina superior derecha
    var legend = L.control({
        position: 'topright'
    });
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML += '<img alt="Descripcion de la imagen" src="/images/predi.png" width="80px" title="Estas buenas nuevas del Reino se predicarán en toda la tierra habitad">';
        return div;
    };
    legend.addTo(map);

    //add geojson layer
    // aqui cargo el geojson pero no parece ocurrir nada
    // Vario la opacidad por cada feature
    const geoJsonUrl = 'data/territorios.json'
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            const capaLimites = L.geoJSON(data, {
                style: function (feature) {
                    const { codregion, fillColor } = feature.properties
                    return {
                        opacity: 0.5,   // controla la opacidad del borde 
                        stroke: true,   // true = Con Borders remarcados
                        color: "#000",
                        fillColor: fillColor, // Establece el color de relleno del feature
                        fillOpacity: 0.4 // controla el nivel de opacidad ( 0 a 1) del relleno del feature
                    };
                },
                onEachFeature: muestraFeatureDatos
            })
            capaLimites.addTo(map)
            layerControl.addOverlay(capaLimites, 'Limites');
        })
        .catch(function (error) {
            console.log(`Se produjo el error ->  ${error}`)
        })


    const botonera = document.querySelector("#botonera")

    // Botonera de acceso direct
    botones.forEach(rotulo => {
        const { name, latitud, longitud } = rotulo
        const boton = document.createElement('button')
        boton.className = 'btn btn-outline-success text-dark m-1 p-1 btn-sm'
        boton.innerHTML = `${name.toString().padStart(3, '0')}`

        boton.addEventListener('click', (e) => {
            map.flyTo([latitud, longitud], 19)
        })
        botonera.appendChild(boton)
    })

    // Capa de rotulos de los territorios
    numeros = L.layerGroup();
    rotulos.forEach(rotulo => {
        const { name, latitud, longitud } = rotulo
        numeros.addLayer(L.tooltip({
            permanent: true,
            direction: 'center',
            className: 'my-label'
        }).setContent(name).setLatLng([latitud, longitud]))
    })
    numeros.addTo(map)


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


    // AGREGANDO UN LAYER CONTROL PARA LOS DIFERENTES LAYES DEL MAPA
    layerControl.addBaseLayer(Satelital, "Satelital");
    layerControl.addBaseLayer(Topografica, "Satelital");
    layerControl.addBaseLayer(OpenStreetMap, "Open Street Map");
    layerControl.addOverlay(puntos, "P. Encuentro")
    layerControl.addOverlay(numeros, 'Número Territorios');
    layerControl.addTo(map)
    
    
    // Oculta o Muestra capa dependiendo del nivel de zoom
    map.on('zoomend', function (e) {
        if (map.getZoom() < 16){
            map.removeLayer(numeros);
        }else if (map.getZoom() >= 16){
            map.addLayer(numeros);
        }
    })


})

