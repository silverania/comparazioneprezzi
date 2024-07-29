const x = document.getElementsByTagName("footer");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x[0].innerHTML = "Geolocalizzazione non supportata !";
    }
}

function showPosition(position) {
    x[0].innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

getLocation();