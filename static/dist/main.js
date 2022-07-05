var map = L.map('map').setView([27.4712, 89.6339], 5);
map.zoomControl.setPosition('topright')

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   subdomains: 'abcd',
   minZoom: 1,
   maxZoom: 16,
   ext: 'jpg'
});

var stamenToner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   subdomains: 'abcd',
   minZoom: 0,
   maxZoom: 20,
   ext: 'png'
});

singleMarker = L.marker([27.4712, 89.6339]).bindPopup('Bhutan water network.').openPopup();

//add map scale
L.control.scale().addTo(map)  

//map coordinates
map.on('mousemove', function (e) {
   $('.coordinate').html(`Latitude: ${e.latlng.lat} Longtitude: ${e.latlng.lng}`)
});

//GeoJson load
var marker = L.markerClusterGroup();
var bhut = L.geoJSON(data, {
   onEachFeature: function(feature,layer)
   {
    layer.bindPopup(feature.properties.name)
   }
});
bhut.addTo(marker);
marker.addTo(map);

//Leaflet Layer Control
var baseLayer = {
   "OSM":osm,
   "Water color map":watercolorMap,
   "stamen Toner": stamenToner
}
var overlayMap = {
    'GeoJSON Markers': marker,
    "single marker": singleMarker
}
L.control.layers(baseLayer, overlayMap, {collapsed: false, position:'topleft'}).addTo(map);