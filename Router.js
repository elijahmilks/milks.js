window.onload = function() {
	router(window.location.hash);
};

window.onhashchange = function() {
	router(window.location.hash);
};

function router(location) {
	let params = [];

	// regex to remove hash from beginning of location string
	// and get url parameters
	if (/\?id=/.test(location)) {
		// NEED TO GET MULTIPLE PARAMS
		let m = /#(.*)\?(.*)=([0-9A-z]*)/.exec(location);

		location = m[1];
		params[m[2]] = m[3];
	} else if (/#(.*)/.test(location)) {
		let m = /#(.*)/.exec(location);

		location = m[1];
	}

	// get the page object
	let route = routes[location].get(params);
	// render the page as html
	let page = route.display();

	// append rendered html to page
	document.getElementById('app').innerHTML = page;
}