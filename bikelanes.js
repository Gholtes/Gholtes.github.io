import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});


//vectormap inspo: https://openlayers.org/en/latest/examples/heatmap-earthquakes.html


// const ol = window.ol

// const raster = new TileLayer({
//   source: new Stamen({
//     layer: 'toner',
//   }),
// });

// var map = new ol.Map({
// 	target: 'map',
// 	layers: [
// 		new ol.layer.Tile({
// 		source: new ol.source.OSM()
// 		})
// 	],
// 	view: new ol.View({
// 		center: ol.proj.fromLonLat([144.9631, -37.8136]),
// 		zoom: 11,
// 		minZoom: 9,
// 		maxZoom: 17,
// 		extent: [16004370.920654759, -4644851.540275239, 16270066.03097403, -4461402.672390816] 
// 	})
// 	});


// import 'ol/ol.css';
// import Map from 'ol/Map';
// import Stamen from 'ol/source/Stamen';
// import VectorSource from 'ol/source/Vector';
// import View from 'ol/View';
// import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer';

// const blur = document.getElementById('blur');
// const radius = document.getElementById('radius');

// const vector = new HeatmapLayer({
//   source: new VectorSource({
//     url: 'data/kml/2012_Earthquakes_Mag5.kml',
//     format: new KML({
//       extractStyles: false,
//     }),
//   }),
//   blur: parseInt(blur.value, 10),
//   radius: parseInt(radius.value, 10),
//   weight: function (feature) {
//     // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
//     // standards-violating <magnitude> tag in each Placemark.  We extract it from
//     // the Placemark's name instead.
//     const name = feature.get('name');
//     const magnitude = parseFloat(name.substr(2));
//     return magnitude - 5;
//   },
// });

// const raster = new TileLayer({
//   source: new Stamen({
//     layer: 'toner',
//   }),
// });

// new Map({
//   layers: [raster],
//   target: 'map',
//   view: new View({
//     center: [0, 0],
//     zoom: 2,
//   }),
// });

// const blurHandler = function () {
//   vector.setBlur(parseInt(blur.value, 10));
// };
// blur.addEventListener('input', blurHandler);
// blur.addEventListener('change', blurHandler);

// const radiusHandler = function () {
//   vector.setRadius(parseInt(radius.value, 10));
// };
// radius.addEventListener('input', radiusHandler);
// radius.addEventListener('change', radiusHandler);