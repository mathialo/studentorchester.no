function updateCSSfile() {
	var file = document.getElementById("elementsCSSFile");

	if (window.innerWidth < 850) {
		file.href = "css/elementsMobile.css";
	} else {
		file.href = "css/elements.css";
	}
}