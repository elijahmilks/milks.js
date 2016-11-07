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
		let display = flatten(this.content).join("");

		if (this.style) {
			let styles = '<style>' + flatten(this.style).join("") + '</style>';
			
			display = styles.concat(display);
		}

		return display;
	}
}

// ercursive function to flatten arrays (including nested)
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