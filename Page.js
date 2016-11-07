class Page {
	constructor(params) {
		this.state = {};

		this.build(params);

		this.styles = this.styles();
		this.content = this.render();
	}

	display() {
		let html = flatten(this.content).join("");
		let styles = '<style>' + flatten(this.styles).join("") + '</style>';

		let display = styles.concat(html);
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