function addSpydigKommentar() {
	var comments = [
		". Ædda bædda, vi kom først &nbsp;<i>#domeneparkering</i>",
		", som åpenbart er det beste orchesteret i landet",
		". Hurra, bravo, vi klarte det!",
		". Mere, mere, mere!",
		" - norgesmestere i Holmenkollmarsj.",
		". Begynn i Biørneblæs."
	];

	document.getElementById("spydigKommentar").innerHTML = comments[Math.floor(Math.random()*comments.length)];
}