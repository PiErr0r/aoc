
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
			msg += '%j ';
		}
	});
	console.log(msg, ...data);
}

function range(start, end, step = 1) {
	if (step === 0) throw new Error("Zero step!");
	const cond = step < 0 ? (n) => n > end : (n) => n < end;
	return (fn) => {
		let res = true;
		for (let i = start; cond(i) && res; i += step) {
			res = !fn(i);
		}
		return res;
	}
}

function drange(start, end, step = 1) {
	if (step === 0) throw new Error("Zero step!");
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

function trange(start, end, step = 1) {
	if (step === 0) throw new Error("Zero step!");
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

module.exports.debug = debug;
module.exports.range = range;
module.exports.drange = drange;
module.exports.trange = trange;