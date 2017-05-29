function addSpydigKommentar() {
	var comments = [
		". Ædda bædda, vi kom først &nbsp;<i>#domeneparkering</i>",
		", som åpenbart er det beste orchesteret i landet",
		". Hurra, bravo, vi klarte det!",
		" - norgesmestere i Holmenkollmarsj (44 sek)."
	];

	document.getElementById("spydigKommentar").innerHTML = comments[Math.floor(Math.random()*comments.length)];
}