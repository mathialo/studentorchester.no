
var cities = [
	"Oslo",
	"Bergen",
	"Kristiansand",
	"Trondheim",
	"Tromsø",
	"Ås"
];

var cityCenters = [
	[130, 500],
	[35,  450],
	[75,  555],
	[150, 350],
	[285, 105],
	[150, 530]
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
}

function updateCityName(event) {
	// reset canvas
	resetImage();

	var nearestIndex = getNearestCity(event);
	context.fillText(
		cities[nearestIndex],
		cityCenters[nearestIndex][0],
		cityCenters[nearestIndex][1]
	);
}

function getNearestCity(event) {
	var mousePos = getMousePos(event);

	var nearestSorFar = 0;
	var lowestDistance = l2distance(cityCenters[nearestSorFar], mousePos);

	for (var i = 1; i < cities.length; i++) {
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