// let files = [
// 	'./lib/milksjs/Page.js',
// 	'./js/Blog.js',
// 	'./js/Home.js',
// 	'./js/Work.js',
// 	'./lib/milksjs/polyfill.js',
// 	'./lib/milksjs/Router.js'
// ];

// window.onload = function() {
// 	// ADD ESSENTIAL JS FILES TO HEADER OF HTML FILE

// 	let head = document.getElementsByTagName('head')[0];

// 	for (let i = 0; i < files.length; i++) {
// 		let fileref = document.createElement('script');
// 		fileref.setAttribute('type', 'text/javascript');
// 		fileref.setAttribute('src', files[i]);
// 		head.appendChild(fileref);
// 	}

// 	router(window.location.hash);
// };

// window.onhashchange = function() {
// 	router(window.location.hash);
// };