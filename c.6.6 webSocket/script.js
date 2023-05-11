const wsUri = " wss://echo-ws-service.herokuapp.com"
const geo = " https://www.openstreetmap.org/"

const btn-work = document.querySelector('.btn-work');
const btn-geo = document.querySelector('.btn-geo');

const value = document.querySelector('input').value;

const j-chat = document.getElementById("j-chat")
btn.addEventListener('click', () => {
  btn.classList.toggle('btn--magic');
});

function writeToScreen(message) {
	let sms = document.createElement("p");
	sms.style.wordWrap = "break-word";
	sms.innerHTML = message;
	output.appendChild(sms);
}

const websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
	writeToScreen('evt.data');
};

btnSend.addEventListener('click', () => {
	const message = value;
	writeToScreen(message);
	websocket.send(message);
});

const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

const success = (position) => {
  writeToScreen(position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn-geo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success);
  }
});