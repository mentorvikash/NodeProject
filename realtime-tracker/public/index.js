const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('send-location', { latitude, longitude });
        },
        (error) => {
            console.log("geolocation error: ", error.message);
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 2000
        }
    );
}

const map = L.map("map").setView([0, 0], 9); // Initialize with a default view

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = {};

socket.on("received-location", (data) => { // Corrected event name
    const { id, latitude, longitude } = data;

    map.setView([latitude, longitude], 9);

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (data) => {
    const { id } = data;
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
