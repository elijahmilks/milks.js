class Page {
	constructor(params) {
		this.state = {};

		this.build(params);

		if (this.styles) {
			this.style = this.styles();
		}

		this.content = this.render();
	}

	display() {
		let display = [];
		
		try {
			display = renderRecursive(this.content);
		} catch (error) {
			errorHandle.apply(this, [error]);
		}
		
		display = flatten(display).join("");

		if (this.style) {
			let styles = '<style>' + flatten(this.style).join("") + '</style>';
			
			display = styles.concat(display);
		}

		return display;
	}
}

// recursive function to render pages in display
function renderRecursive(array) {
	let rendered = [];

	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Array) {
			rendered.push(renderRecursive(array[i]));
		} else if (array[i] instanceof Page) {
			rendered.push(array[i].display());
		} else if (typeof array[i] === 'string') {
			rendered.push(array[i]);
		} else {
			throw new Error('Unexpected ' + typeof array[i] + ' in this.constructor.name::render() returned array. Expecting: String, Array or Page.');
		}
	}

	return rendered;
}

// recursive function to flatten arrays (including nested)
function flatten(array) {
	let flat = [];

	for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Array) {
            flat.push.apply(flat, flatten.apply(this, arguments[i]));
        } else {
            flat.push(arguments[i]);
        }
    }

    return flat;
}

// parse error message to display more comprehensive error to developer (with Page name)
function errorHandle(error) {
	let error_msg = error.message.replace('this.constructor.name', this.constructor.name);

	console.error(error_msg);
}