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

module.exports = {
	range,
	drange,
	trange,
}