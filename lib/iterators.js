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

function iter(arr) {
	return (fn) => {
		let res = true;
		for (let i = 0; res && i < arr.length; ++i) {
			res = !fn(arr[i], i);
		}
		return res;
	}
}

function diter(arr) {
	return (fn) => {
		let res = true;
		for (let i = 0; res && i < arr.length; ++i) {
			for (let j = 0; res && j < arr.length; ++j) {
				res = !fn(arr[i], arr[j], i, j);
			}
		}
		return res;
	}
}

function titer(arr) {
	return (fn) => {
		let res = true;
		for (let i = 0; res && i < arr.length; ++i) {
			for (let j = 0; res && j < arr.length; ++j) {
				for (let k = 0; res && k < arr.length; ++k) {
					res = !fn(arr[i], arr[j], arr[k], i, j, k);
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
	iter,
	diter,
	titer,
}