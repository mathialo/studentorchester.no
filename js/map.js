
var cities = [
	"Oslo",
	"Bergen",
	"Kristiansand",
	"Trondheim",
	"Tromsø",
	"Ås"
];

var cityCenters = [
	[142, 500],
	[35,  450],
	[95,  545],
	[150, 350],
	[285, 105],
	[155, 517]
];

var orchestras = [
	[
		"<img src='img/bb.png' style='float: left; margin-right: 10px; height: 40px;'><a href='http://foreninger.uio.no/bb/'>Biørneblæs</a>. Et åpent orchester for alle, men med en overvekt av realister.",
		"<img src='img/bb.png' style='float: right; margin-left: 10px; height: 40px;'><a href='http://www.blindern-studenterhjem.no/livet/haarn-oc-blaese/'>Blindern Haarn oc Blaese</a>. For beboere på Blindern studenthjem.",
		"<img src='img/bb.png' style='float: left; margin-right: 10px; height: 40px;'><a href='http://www.corpsusjuris.com'>Corpsus Juris</a>. For studenter ved det Juridiske fakultet.",
		"<img src='img/bb.png' style='float: right; margin-left: 10px; height: 40px;'><a href='https://www.facebook.com/medicinsk.paradeorchaester/'>Medisinsk paradeorchester</a>. For medisinere."
	],
	[
		"Bergenorkestere, i dunno"
	],
	[
		"Lol, Kristiansand"
	],
	[
		"Ingeniørfolk"
	],
	[
		"Gokk"
	],
	[
		"Bondemusikanter"
	]
];

var canvas; var context;

function getWidth() {
	return document.getElementById("map").width;
}

function getHeight() {
	return document.getElementById("map").height;
}

function loadMap() {
	canvas = document.getElementById("map");
	context = canvas.getContext("2d");

	context.imageSmoothingEnabled = false;
	resetImage();

	context.font = "12pt Arial";
	// context.fillStyle = 'green';
}

function resetImage() {
	context.clearRect(0,0,canvas.width,canvas.height);
	var image = document.getElementById("imageLoader");
	context.drawImage(image, getWidth()/2 - 240, 0, 480, 650);
	addCityCenters();
}

function addCityCenters() {
	context.fillStyle = "#454545";

	for (var i=0; i<cityCenters.length; i++) {
		context.fillRect(cityCenters[i][0], cityCenters[i][1], 6, 6);
	}
}

function updateCityName(event) {
	// reset canvas
	resetImage();

	var nearestIndex = getNearestCity(event);

	context.fillStyle = "black";
	context.fillText(
		cities[nearestIndex],
		cityCenters[nearestIndex][0] - 10,
		cityCenters[nearestIndex][1] - 10
	);
}

function importCityInfo(event) {
	var nearestIndex = getNearestCity(event);
	outputCityInfo(nearestIndex);
}

function outputCityInfo(index) {
	var output = document.getElementById("mapOutput");

	output.innerHTML = "<h2 id='" + cities[index] + "'>Studentorchestere i " + cities[index] + "</h2>";

	// output.innerHTML += "<ul>";
	for (var i=0; i<orchestras[index].length; i++) {
		output.innerHTML += "<p class='orchestraItem'>" + orchestras[index][i] + "</p>";
	}
	// output.innerHTML += "</ul>";

	window.location.replace(window.location.href.split("#")[0] + "#" + cities[index]);
}

function autoLoadFromUrl() {
	var city = window.location.href.split("#")[1];

	for (var i=0; i<cities.length; i++) {
		if (cities[i] == city) {
			outputCityInfo(i);
		}
	}
}

function getNearestCity(event) {
	var mousePos = getMousePos(event);

	var nearestSorFar = 0;
	var lowestDistance = l2distance(cityCenters[nearestSorFar], mousePos);

	for (var i=1; i<cities.length; i++) {
		if (l2distance(mousePos, cityCenters[i]) < lowestDistance) {
			nearestSorFar = i;
			lowestDistance = l2distance(mousePos, cityCenters[i]);
		}
	}

	return nearestSorFar;
}

function getMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	return [
		event.clientX - rect.left,
		event.clientY - rect.top
	];
}

function l2distance(point1, point2) {
	return Math.sqrt(
		Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
	);
}