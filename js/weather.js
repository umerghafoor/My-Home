let keyInput = document.getElementById('key');
let cityInput = document.getElementById('city');
let apply = document.getElementById('weather_apply');
let weatherAlert = document.getElementById('header__weather-alert');
let info = document.getElementById('header__weather-info');
let radioCelsius = document.getElementById('celsius');
let radioFahrenheit = document.getElementById('fahrenheit');
let weatherLS = localStorage.getItem('weather');

if (weatherLS !== null) {
	let key = JSON.parse(weatherLS).key;
	let city = JSON.parse(weatherLS).city;

	keyInput.placeholder = key;
	cityInput.placeholder = city;
	getWeatherInfo(key, city);
} else {
	getWeatherInfo(null, null);
}

apply.onclick = () => {
	let key = keyInput.value;
	let city = cityInput.value;
	let weatherLS = localStorage.getItem('weather');

	if (key === '') {
		if (weatherLS !== null) {
			key = JSON.parse(weatherLS).key;
		}
	} else {
		weatherAlert.style.display = 'none';
	}

	if (city === '') {
		if (weatherLS !== null) {
			city = JSON.parse(weatherLS).city;
		}
	} else {
		weatherAlert.style.display = 'none';
	}

	radioFahrenheit.checked ? tempUnit = 'F' : tempUnit = 'C';

	let info = {
		key: key,
		city: city,
		tempUnit: tempUnit
	};

	localStorage.setItem('weather', JSON.stringify(info));

	cityInput.value = '';
	cityInput.blur();
	cityInput.placeholder = city;

	keyInput.value = '';
	keyInput.blur();
	keyInput.placeholder = key;

	getWeatherInfo(key, city);
}
function getWeatherInfo(key, city) {
	// Use the correct API endpoint
	fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// Use the updated data structure
			let celsius = data.current.temp_c;
			let fahrenheit = data.current.temp_f;
			let description = data.current.condition.text;

			// Store the data for drawing the weather later
			drawWeather(celsius, fahrenheit, description);
		})
		.catch(function (error) {
			if (key === '' || key === null) {
				weatherAlert.style.display = '';
				weatherAlert.innerHTML = 'Remember to add your API key';
				keyInput.placeholder = 'Enter key';
			} else if (city === '' || city === null) {
				weatherAlert.style.display = '';
				weatherAlert.innerHTML = 'Remember to add city name';
				cityInput.placeholder = 'Enter city';
			} else {
				weatherAlert.style.display = 'none';
				info.innerHTML = '¯\\_(ツ)_/¯';
				console.log(error);
			}
		});
}

function drawWeather(celsius, fahrenheit, description) {
	// Check if weather settings are stored locally
	if (weatherLS) {
		if (JSON.parse(weatherLS).tempUnit === 'C') {
			temp = `${celsius}\u00B0C`;
			radioCelsius.checked = true;
		} else {
			temp = `${fahrenheit}\u00B0F`;
			radioFahrenheit.checked = true;
		}
	} else {
		// Default to Celsius if no settings are stored
		temp = `${celsius}\u00B0C`;
		radioCelsius.checked = true;
	}

	// Display the weather information
	info.innerHTML = `${description}, <span class="header__weather-temp">${temp}</span>`;
}
