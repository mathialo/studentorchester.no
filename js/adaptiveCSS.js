function updateCSSfile() {
	var elements = document.getElementById("elementsCSSFile");
	var mainstyle = document.getElementById("mainstyleCSSFile");

	if (window.innerWidth < 850) {
		elements.href = "css/elementsMobile.css";
		mainstyle.href = "css/mainstyleMobile.css";
	} else {
		elements.href = "css/elements.css";
		mainstyle.href = "css/mainstyle.css";
	}
}