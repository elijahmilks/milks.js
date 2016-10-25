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
	if (/\?/.test(location)) {
		params = getURLParams(location)

		let m = /#(.*)\?/.exec(location);
		location = m[1];
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

function getURLParams(url) {
	let regex = /(?:\?|&)([^=&#]+)*(?:=?([^&#]*))/g;
	let m;
	let params = [];

	while ((m = regex.exec(url)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
	
		params[m[1]] = m[2];
	}

	return params;
}