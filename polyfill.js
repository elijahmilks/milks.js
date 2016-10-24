// XMLHttpRequest polyfill
function httpRequest(url,callback,context) {
	
	var request = null;

	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		request = new XMLHttpRequest();

	} else if (window.ActiveXObject) { // IE
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) {
				console.log('error');
			}
		}
	}

	if (!request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	function serveContent(){
		if (request.readyState === 4) {
			if (request.status === 200) {
				callback.call(context,JSON.parse(httpRequest.responseText));
			} else {
				console.log('There was a problem with the request.');
			}
		}
	}

	request.onreadystatechange = serveContent;
	request.open('GET', url);
	request.send();
}