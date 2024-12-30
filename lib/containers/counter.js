const { DefaultDict } = require("./default_dict");

function Counter(container) {
	const c = DefaultDict();
	if (typeof container === 'string' || Array.isArray(container)) {
		for (let i = 0; i < container.length; ++i)
			++c[ container[i] ];
	} else {
		throw new Error(`Unrecognized container type: ${typeof container}`);
	}
	return c;
}

module.exports = {
	Counter,
}