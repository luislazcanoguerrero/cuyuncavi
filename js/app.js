import { botones } from "../data/botones.js";
import { rotulos } from "../data/rotulos.js";

document.addEventListener('DOMContentLoaded', () => {

    //1. Crar el objeto mapa
    let map = L.map('map', { fullscreenControl: true, fullscreenControlOptions: { position: 'topleft' } });

    // CREA OBJETO LAYER CONTROL PARA CONTROLAR LA CAPAS
    const layerControl = L.control.layers(null, null, { position: 'topleft', collapsed: true });


    //3.- Añadir una cartografía base
    const Topografica = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });

    const Satelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        minZoom: 0,
        maxZoom: 18
    });

    const OpenStreetMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap<\/a> contributors',
        errorTileUrl: '0',
        minZoom: 3,
        maxZoom: 19
    });

    OpenStreetMap.addTo(map);


    // MARCARDO INICIALMENTE UN CENTRO DEL MAPA
    map.setView([-33.4013205, -71.129367], 18)

    // AÑADIENDO UN RECUEDRO PARA LAS COORDENADAS
    L.control.coordinates({
        position: "bottomleft", decimals: 6, enableUserInput: false,
        decimalSeperator: ",",
        labelTemplateLat: "{y}",
        labelTemplateLng: "{x}"
    }).addTo(map);


    //CREANDO ICONO PARA LAS VILLAS
    var villasIcon = L.icon({
        iconUrl: '../images/svg/house-home-svgrepo-com.svg',
        iconSize: [40, 40], // size of the icon
        iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
    });


    // Agregando una marca al mapa
    // const marca = L.marker([-33.40239157125629,-71.13067567348482])
    // marca.bindPopup("Luis Lazcano",{className: 'label-villas'})
    // marca.addTo(map)

    const aires = L.marker([-33.40863864443387, -71.1273229122162], { icon: villasIcon })
    const patriotas = L.marker([-33.39184441774129, -71.1224788427353], { icon: villasIcon })
    const cementerio = L.marker([-33.40225228747265, -71.12020701169969], { icon: villasIcon })
    const racimos = L.marker([-33.40382417650575, -71.1269634962082], { icon: villasIcon })
    const padre = L.marker([-33.40678472120551, -71.12734973430635], { icon: villasIcon })
    const valle = L.marker([-33.39761034661416, -71.1307454109192], { icon: villasIcon })
    const williams = L.marker([-33.39077395567001, -71.12598180770875], { icon: villasIcon })
    const german = L.marker([-33.39555825065173, -71.13075613975526], { icon: villasIcon })
    const alberto = L.marker([-33.40024193682605, -71.12517714500429], { icon: villasIcon })
    const conquista = L.marker([-33.39355176906471, -71.120263338089], { icon: villasIcon })
    const bajo = L.marker([-33.3855719913699, -71.11980199813844], { icon: villasIcon })
    const alto = L.marker([-33.3879011526993, -71.11716270446779], { icon: villasIcon })
    const sol = L.marker([-33.39787279894641, -71.122784614563], { icon: villasIcon })
    const carol = L.marker([-33.39237292553458, -71.12376630306245], { icon: villasIcon })

    aires.bindTooltip("Aires de Curacavi",)
    patriotas.bindTooltip("Los Patriotas", { permanent: true, direction: 'right', className: 'label-villas' })
    cementerio.bindTooltip("Cementerio", { permanent: true, direction: 'right', className: 'label-villas' })
    racimos.bindTooltip("Los Racimos", { permanent: true, direction: 'right', className: 'label-villas' })
    padre.bindTooltip("Padre Hurtado", { permanent: true, direction: 'right', className: 'label-villas' })
    valle.bindTooltip("Valle de los Sueños", { permanent: true, direction: 'right', className: 'label-villas' })
    williams.bindTooltip("Williams Rebolledo", { permanent: true, direction: 'right', className: 'label-villas' })
    german.bindTooltip("Germán Riesco", { permanent: true, direction: 'right', className: 'label-villas' })
    alberto.bindTooltip("San Alberto", { permanent: true, direction: 'right', className: 'label-villas' })
    conquista.bindTooltip("Los Conquistadores", { permanent: true, direction: 'right', className: 'label-villas' })
    bajo.bindTooltip("Cuyuncaví Bajo", { permanent: true, direction: 'right', className: 'label-villas' })
    alto.bindTooltip("Cuyuncaví Alto", { permanent: true, direction: 'right', className: 'label-villas' })
    sol.bindTooltip("Villa el Sol", { permanent: true, direction: 'right', className: 'label-villas' })
    carol.bindTooltip("Carol Urzúa", { permanent: true, direction: 'right', className: 'label-villas' })

    // Crear un agrupamiento de marcas usando layerGroup
    const villas = L.layerGroup([aires, patriotas, cementerio, racimos, padre, valle, williams, german, alberto, conquista, bajo, alto, sol, carol]);



    // icono para los puntos de encuentros
    var puntosIcon = L.icon({
        iconUrl: '../images/ubicaciones.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
    });

    // CREANDO MARCADORES PARA LUGARES DE REUNIÓN
    const salon = L.marker([-33.401945519487285, -71.13113433122636], { icon: puntosIcon });
    const lazcano = L.marker([-33.398629676103276, -71.12742483615877], { icon: puntosIcon });
    const barrera = L.marker([-33.40544666167808, -71.14462852478029], { icon: puntosIcon });
    const ampuero = L.marker([-33.39134725917198, -71.12310111522676], { icon: puntosIcon });
    const monasterio = L.marker([-33.40714923267345, -71.12753748893739], { icon: puntosIcon });
    const mirta = L.marker([-33.39374792651667, -71.12491965293886], { icon: puntosIcon });
    const carvajal = L.marker([-33.39292336942326, -71.12353831529619], { icon: puntosIcon });
    const dina = L.marker([-33.3956352632954, -71.1313033103943], { icon: puntosIcon });
    const gladys = L.marker([-33.391761103289184, -71.12308502197267], { icon: puntosIcon });


    salon.bindTooltip("Salón del Reino. <br> <small> Willian Rebolledo N°1803 </small>", { permanent: false, direction: 'right', className: 'label-villas' })
    lazcano.bindTooltip("Familia Lazcano <br> <small> Manuel Larraín N°435 </small>", { permanent: false, direction: 'right', className: 'label-villas' })
    barrera.bindTooltip("", { permanent: false, direction: 'right', className: 'label-villas' })
    ampuero.bindTooltip("Familia Ampuero. <br> <small> Av. Los Patriotas N°2154, Villa el Carol Urzua </small> ", { permanent: false, direction: 'right', className: 'label-villas' })
    mirta.bindTooltip("Hna. Mirta Ormazabal. <br> <small> Villa el Olivar Pasaje Camilo Henríquez N°1040</small>", { permanent: false, direction: 'right', className: 'label-villas' })
    dina.bindTooltip("Hna. Eduvina Garcia", { permanent: false, direction: 'right', className: 'label-villas' })
    gladys.bindTooltip("Hna. Gladys Palomino", { permanent: false, direction: 'right', className: 'label-villas' })
    monasterio.bindTooltip("Familia Monaterio Ventura <br> <small> Pasaje El Coigüe N°1822</small>", { permanent: false, direction: 'right', className: 'label-villas' })
    carvajal.bindTooltip("Familia Carvajal <br> <small> Manuel de Salas N° 2132, Villa el Carol Urzua</small>", { permanent: false, direction: 'right', className: 'label-villas' })


    // AGRUPARLOS EN UN LAYERGROUP
    const puntos = L.layerGroup([salon, lazcano, barrera, ampuero, monasterio, mirta, dina, carvajal, gladys]);

    //add geojson layer
    const geoJsonUrl = 'data/territorios.json'
    fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
            const capaLimites = L.geoJSON(data, {
                style: function (feature) {
                    const { fillColor } = feature.properties
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


    // Botonera de acceso direct
    const botonera = document.querySelector("#botonera")
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
    const numeros = L.layerGroup();
    rotulos.forEach(rotulo => {
        const { name, latitud, longitud } = rotulo
        numeros.addLayer(L.tooltip({
            permanent: true,
            direction: 'center',
            className: 'my-label'
        }).setContent(name).setLatLng([latitud, longitud]))
    })
    numeros.addTo(map)


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


    function muestraFeatureDatos(feature, layer) {
        //Encontrando el centro del poligono
        var polygon = L.polygon(feature.geometry.coordinates[0])
        const { lat, lng } = polygon.getBounds().getCenter()

        layer.on({
            click: (e) => {
                console.log(`"latitud":"${e.latlng.lat}","longitud":"${e.latlng.lng}"`)
                console.log(`${e.latlng.lat},${e.latlng.lng}`)
            },
        })

        if (feature.properties) {
            layer.bindPopup(`Territorio N°: ${feature.properties.name}`);
        }
    }


    // AGREGANDO UN LAYER CONTROL PARA LOS DIFERENTES LAYES DEL MAPA
    layerControl.addBaseLayer(Satelital, "Satelital");
    layerControl.addBaseLayer(Topografica, "Topografica");
    layerControl.addBaseLayer(OpenStreetMap, "Open Street Map");
    layerControl.addOverlay(puntos, "P. Encuentro")
    layerControl.addOverlay(numeros, 'Número Territorios');
    layerControl.addOverlay(villas, 'Villas');
    layerControl.addTo(map)

    map.on('click', (e) => {
        console.log(e.latlng)
    })

    // CAMBIA FONT SIZE DE LOS ROTULOS DEPENDIENDO DEL ZOOM
    map.on('zoomend', function (e) {
        const clase = document.getElementsByClassName('my-label')
        const zoomLevel = map.getZoom();

        let zoomFontSize = '0.3rem'
        if (zoomLevel >= 15) {
            switch (zoomLevel) {
                case 15:
                    zoomFontSize = '0.6rem'
                    break;
                case 16:
                    zoomFontSize = '0.8rem'
                    break;
                case 17:
                    zoomFontSize = '0.8rem'
                    break;
                case 18:
                    zoomFontSize = '1.1rem'
                    break;
                case 19:
                    zoomFontSize = '2.2rem'
                    break;
                default:
                    zoomFontSize = '2.2rem'
                    break;
            }
        }
        for (let i = 0; i < clase.length; i++) {
            clase[i].style.fontSize = zoomFontSize;
        }

    })

    map.on('locationfound', function (e) {
        var radius = e.accuracy;
        L.marker(e.latlng).addTo(map)
            .bindPopup("Estás aquí<br>± " + radius.toFixed(1) + " metros de precisión").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    });


    var printer = L.easyPrint({
        tileLayer: OpenStreetMap,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'cuyuncavi',
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);

    function manualPrint() {
        printer.printMap('CurrentSize', 'MyManualPrint')
    }
})

