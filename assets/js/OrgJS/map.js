const map = L.map("map").setView([33.5102, 51.9196], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 100);
