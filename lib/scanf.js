const in_ = (a, arr) => arr.indexOf(a) !== -1;

const consumeInt = (data, i) => {
	const neg = data[i] === '-';
	if (neg) ++i;
	let s = '';
	const re = /\d/;
	while (re.test(data[i])) s += data[i++];

	return [(neg ? -1 : 1) * parseInt(s, 10), i];
}

const consumeWord = (data, i) => {
	const re = /\w/;
	let s = '';
	while (i < data.length && re.test(data[i])) s += data[i++];
	return [s, i];
}

const consumeFloat = (data, i) => {
	const neg = data[i] === '-';
	if (neg) ++i;
	let s = '';
	const re = /\d/;
	while (i < data.length && re.test(data[i])) s += data[i++];
	if (data[i] === '.') {
		s += '.';
		++i;
		while (i < data.length && re.test(data[i])) s += data[i++];
	}
	return [(neg ? -1 : 1) * parseFloat(s), i];
}

const consumeWhitespace = (data, i) => {
	const re = /\s/;
	let s = '';
	while (i < data.length && re.test(data[i])) s += data[i++];
	return [s, i];
}

const consumeSymbols = (data, i) => {
	const re = /[^a-zA-Z0-9_ \n-]/
	let s = '';
	while (re.test(data[i])) s += data[i++];
	return [s, i];
}

const consumeUntilEnd = (data, i) => {
	let s = '';
	while (i < data.length) s += data[i++];
	return [s, i];
}

const parseToken = (data, di, pattern, pi) => {
	switch (pattern[pi + 1]) {
	case 'd': return consumeInt(data, di);
	case 'w': return consumeWord(data, di);
	case 'f': return consumeFloat(data, di);
	case ' ': return consumeWhitespace(data, di);
	case '$': return consumeSymbols(data, di);
	case '.': return consumeUntilEnd(data, di);
	default:
		throw new Error(`Unrecognized pattern token '${pattern[pi + 1]}'`)
	}
}

const match = (data, pattern) => {
	let pi = 0, di = 0;
	const res = [];
	while (pi < pattern.length && di < data.length) {
		if (pattern[pi] === '%') {
			if (pattern[pi + 1] === '%') {
				pi += 2;
				++di;
				continue;
			}
			let parsed;
			[parsed, di] = parseToken(data, di, pattern, pi);
			pi += 2;
			res.push(parsed)
		} else {
			console.assert(data[di++] === pattern[pi++]);
		}
	}
	if (pi === pattern.length - 2 && pattern[pi] === '%' && pattern[pi + 1] === '.') {
		pi += 2;
		res.push("");
	}
	if (pi !== pattern.length || di !== data.length) {
		throw new Error(`Something was not parsed pattern=${pattern} data=${data}`);
	}
	return res;
}

const scanf = (data, pattern) => {
	const lines = data.split('\n');
	const res = [];

	for (let i = 0; i < lines.length; ++i) {
		const parsed = match(lines[i], pattern);
		res.push(parsed);
	}

	return res;
}

module.exports = {
	scanf
}
