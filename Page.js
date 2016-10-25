class Page {
	constructor(params) {
		this.state = {};

		this.build(params);

		this.content = this.render();
	}

	display() {
		let string = flatten(this.content).join("");
		return string;
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