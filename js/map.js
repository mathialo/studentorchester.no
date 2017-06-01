var cities = [
	"Oslo",
	"Bergen",
	"Kristiansand",
	"Trondheim",
	"Tromsø",
	"Ås"
];

var cityCenters = [
	[142, 500], // Oslo
	[35,  450], // Bergen
	[95,  545], // Kristiansand
	[150, 350], // Trondheim
	[285, 105], // Tromsø
	[155, 517]  // Ås
];

var orchestras = [
	[ // Oslo
		{
			name: "Studentorchesteret Biørneblæs",
			link: "http://foreninger.uio.no/bb/",
			image: "img/bb.png",
			desc: "Et åpent orchester for alle, men med en overvekt av realister."
		},
		{
			name: "Blindern Haarn oc Blaese",
			link: "http://www.blindern-studenterhjem.no/livet/haarn-oc-blaese/",
			image: "img/blindernhornochblaese.png",
			desc: "For beboere på Blindern studenthjem."
		},
		{
			name: "Corpsus Juris",
			link: "http://www.corpsusjuris.com",
			image: "img/corpsus.png",
			desc: "For studenter ved det Juridiske fakultet."
		},
		{
			name: "Medisinsk paradeorchester",
			link: "https://www.facebook.com/medicinsk.paradeorchaester/",
			image: "img/mpo.png",
			desc: "Orchester for medisinere."
		}
	],
	[ // Bergen
		{
			name: "Direksjonsmusikken",
			link: "http://www.direksjonsmusikken.com/",
			image: "img/direksjonsmusikken.png",
			desc: "Studentorchester tilknyttet Norges Handelshøyskole."
		},
		{
			name: "Force Marsjør Juzz-Band",
			link: "http://force.uib.no",
			image: "img/bb.jpg",
			desc: "For studenter ved det Juridiske fakultet ved UiB."
		},
		{
			name: "Medicinsk Blæse et Spadserensemble",
			link: "https://www.facebook.com/Ensemblet/",
			image: "img/bb.jpg",
			desc: "Orchester for medisinere"
		},
		{
			name: "Musikselskabet Larmonien",
			link: "http://larmonien.b.uib.no/",
			image: "img/bb.jpg",
			desc: "Et orchester for alle fakulteter og studiesteder i Bergen."
		},
		{
			name: "Teknolikken",
			link: "https://www.facebook.com/teknolikken/",
			image: "img/bb.jpg",
			desc: "Blåseorchester ved Høgskolen i Bergen"
		}
	],
	[ // Kristiansand
		{
			name: "Spadser & Blæse-ensemblet",
			link: "http://www.stastudent.no/spadser-blaese-ensemblet/",
			image: "img/bb.jpg",
			desc: "Det eneste studentorchesteret i Kristiansand. Åpent for alle."
		}
	],
	[ // Trondheim
		{
			name: "Berseblæsten",
			link: "http://org.ntnu.no/berse/",
			image: "img/bb.jpg",
			desc: "Studentorchesteret til Berstudentenes forening. "
		},
		{
			name: "Studentorchesteret Dei Taktlause",
			link: "https://taktlaus.no",
			image: "img/taktlause.png",
			desc: "Orchesteret til linjeforeningen Sct. Omega Broderskab, men åpent for alle."
		},
		{
			name: "Dragern",
			link: "https://www.facebook.com/Dragern/",
			image: "img/dragern.png",
			desc: "Et orchester som har utspring fra Bygglinjen på Gløshaugen"
		},
		{
			name: "Strindens Promenade Orchester",
			link: "http://www.strindens.no",
			image: "img/bb.jpg",
			desc: "Studentersamfunnets studentorchester."
		},
		{
			name: "TapHel & Toddy",
			link: "http://ttoddy.blogspot.no",
			image: "img/bb.jpg",
			desc: "Studentorchester ved Høiskolens Chemikerforening."
		}
	],
	[ // Tromsø
		{
			name: "Ompagniet",
			link: "http://www.heinrich.no/ompagniet/",
			image: "img/bb.jpg",
			desc: "Verdens nordligste studentorchester."
		}
	],
	[ // Ås
		{
			name: "Åsblæsten",
			link: "http://www.samfunnetiaas.no/asblaestn/",
			image: "img/aasblaesten.png",
			desc: "Det eneste studentorchesteret i Ås. Åpent for alle."
		}
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

	
	for (var i=0; i<orchestras[index].length; i++) {
		var orch = orchestras[index][i];

		var imageOrientation = i%2 == 0 ? "floatLeft" : "floatRight";

		output.innerHTML += "<p class='orchestraItem'>"
			+ "<a class='nostyle' href='" + orch.link + "'><img src='" + orch.image + "' class='orchestraImage " + imageOrientation + "'></a>"
			+ "<a href='" + orch.link + "' class='underlineOnHover'>" + orch.name + "</a>.<br>"
			+ orch.desc + "</p>";
	}
	

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
