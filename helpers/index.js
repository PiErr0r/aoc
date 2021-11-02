
function disp(grid) {
	for (let i = 0; i < grid.length; ++i) {
		if (Array.isArray(grid[i])) 
			console.log("%s", grid[i].join(''));
		else {
			console.log("%s", grid[i]);
		}
	}
	console.log();
}

function debug(...data) {
	let msg = '';
	data.forEach(dIn => {
		if (typeof dIn === 'number') {
			if (Number.isInteger(dIn)) {
				msg += '%d ';
			} else if (!Number.isNaN(dIn)) {
				msg += '%f ';
			} else {
				msg += '%o ';
			}
		} else if (typeof dIn === 'string') {
			msg += '%s ';
		} else {
			msg += dIn instanceof Set ? '%o ' : '%j ';
		}
	});
	console.log(msg, ...data);
}

function range(start, end = null, step = 1) {
	if (step === 0) throw new Error("Zero step!");
	if (end === null) { end = start; start = 0; }
	const cond = step < 0 ? (n) => n > end : (n) => n < end;
	return (fn) => {
		let res = true;
		for (let i = start; cond(i) && res; i += step) {
			res = !fn(i);
		}
		return res;
	}
}

function drange(start, end = null, step = 1) {
	if (step === 0) throw new Error("Zero step!");
	if (end === null) { end = start; start = 0; }
	const cond = step < 0 ? (n) => n > end : (n) => n < end;
	return (fn) => {
		let res = true;
		for (let i = start; cond(i) && res; i += step) {
			for (let j = start; cond(j) && res; j += step) {
				res = !fn(i, j);
			}
		}
		return res;
	}
}

function trange(start, end = null, step = 1) {
	if (step === 0) throw new Error("Zero step!");
	if (end === null) { end = start; start = 0; }
	const cond = step < 0 ? (n) => n > end : (n) => n < end;
	return (fn) => {
		let res = true;
		for (let i = start; cond(i) && res; i += step) {
			for (let j = start; cond(j) && res; j += step) {
				for (let k = start; cond(k) && res; k += step) {
					res = !fn(i, j, k);
				}
			}
		}
		return res;
	}
}

// const ord = (c) => (c.charCodeAt(0));
// const chr = (n) => (String.fromCharCode(n));

module.exports.disp = disp;
module.exports.debug = debug;
module.exports.range = range;
module.exports.drange = drange;
module.exports.trange = trange;
module.exports.ord = (c) => (c.charCodeAt(0));
module.exports.chr = (n) => (String.fromCharCode(n));
