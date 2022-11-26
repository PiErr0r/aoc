
const digits = (data) => data.match(/\d/g).map(n => parseInt(n, 10));
const ints = (data) => data.match(/-?\d+/g).map(n => parseInt(n, 10));
const floats = (data) => data.match(/-?\d+\.\d*/g).map(n => parseFloat(n));
const singles = (data) => data.split('').filter(l => l.trim());
const words = (data) => data.match(/\w+/g);
const lines = (data) => data.split('\n');
const table = (data) => data.split('\n').map(r => r.split(''));
const groups = (data, fDel = '\n\n', sDel = '\n') => data.split(fDel).map(group => group.split(sDel));
const getGroups = (data, del = '\n\n') => data.split(del);

const groupsWith = (data, start) => {
	const res = [];
	while (data.startsWith(start)) {
		let i = data.slice(start.length).indexOf(start);

		if (i === -1) {
			res.push(data);
			break;
		}

		i += start.length;
		res.push(data.slice(0, i).trim());
		data = data.slice(i);
	}

	return res;
}

const re = {
	d: '-?\\d+',								// integer
	w: '\\w+',									// word
	W: '[A-Za-z ]+',						// word or space
	f: '-?\\d+\\.d*',						// float
	l: '[A-Za-z]+',							// letters
	' ': '\\s+',								// whitespace
	'$': '[^a-zA-Z0-9_ \n-]+',	// symbols
	'/': '\\/',									// slash
}

const reFns = { // functions which parse return data
	d: n => parseInt(n, 10),
	w: s => s,
	W: s => s.trim(),
	f: n => parseFloat(n),
	l: s => s,
	' ': s => s,
	'$': s => s,
	'/': s => s,
}

const parse = (data, pattern) => {
	if (!pattern) throw new Error("Expected pattern");
	const p = pattern
		.split(/\s/g) 		// split by newline
		.map(s => (
			s
			.split('')			// split by char
			.map(ss => (
				re[ss] ?? ss 	// if exists in re
			))
			.join('')
		))
		.join(re[' ']);		// join by whitespace
	// console.log(p)
	return data
		.match(new RegExp(p, 'g'))
		.map(r => parseLine(r, pattern));
}

const parseLine = (line, pattern) => {
	pattern = pattern.replaceAll('\\s?', '');
	let i = 0;
	let tmp;
	const res = [];
	while (line.length && i < pattern.length) {
		let curr = pattern[i];
		if (re[curr]) {
			tmp = line.match( new RegExp(re[curr]) )[0];
			line = line.slice(tmp.length);
			if (curr !== ' ' || curr === '/')
				res.push(reFns[curr](tmp));
		} else {
			tmp = line.match( new RegExp(curr) )[0];
			line = line.slice(tmp.length);
		}
		++i;
	}
	return res;	
}

module.exports = {
	digits,
	ints,
	floats,
	singles,
	words,
	lines,
	table,
	groups,
	getGroups,
	groupsWith,
	parse,
	parseLine,
}