// full screen map view
var mapId = document.getElementById('map');
function fullScreenView() {
   if (document.fullscreenElement) {
      document.exitFullscreen()  
   } else {
      mapId.requestFullscreen();
   }  
}
L.control.browserPrint({ position: 'topright' }).addTo(map);

//Leflet Geocoder search
L.Control.geocoder().addTo(map);

//map measure
 L.control.measure({
   primaryLengthUnit: 'meters', secondaryLengthUnit: 'kilometers',
   primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'acres' 
}).addTo(map);

//zoom to layer
$('.zoom-to-layer').click(function() {
    map.setView([27.4712, 89.6339], 5)
 });
 