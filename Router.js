window.onload = function() {
	router(window.location.href.replace(window.location.origin + window.location.pathname, ''));
};

window.onhashchange = function() {
	router(window.location.href.replace(window.location.origin + window.location.pathname, ''));
};

function router(location) {
	let params = [];

	// regex to remove hash from beginning of location string
	// and get url parameters
	if (location.charAt(0) == '#') {
		if (location.includes('?')) {
			params = getURLParams(location)

			let m = /#(.*)\?/.exec(location);
			location = m[1];
		} else {
			let m = /#(.*)/.exec(location);

			location = m[1];
		}
	} else {
		params = getURLParams(location);
		location = '';
	}

	// get the block object
	let route = routes[location].get(params);
	// render the block as html
	let block = route.display();

	// append rendered html to block
	document.getElementById('app').innerHTML = block;
}

function getURLParams(url) {
	let regex = /(?:\?|&)([^=&#]+)*(?:=?([^&]*))/g;
	let m;
	let params = [];

	while ((m = regex.exec(url)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
	
		params[m[1]] = m[2];
	}

	console.log(params);

	return params;
}