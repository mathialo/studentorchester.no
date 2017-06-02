function updateCSSfile() {
	var file = document.getElementById("elementsCSSFile");

	if (window.innerWidth < 800) {
		file.href = "css/elementsMobile.css";
	} else {
		file.href = "css/elements.css";
	}
}