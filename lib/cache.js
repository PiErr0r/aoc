

let CACHE = {};
const cache = (fn) => new Proxy(fn, {
	apply: (f, _, args) => {
		const ARGS = args.map(a => JSON.stringify(a)).join('-');
		if (ARGS in CACHE) return CACHE[ARGS];
		f.p = cache(f);
		const res = f(...args);
		CACHE[ARGS] = res;
		return res;
	}
})

const fib = (n) => {
	if (n <= 1) return 1;
	return fib.p(n-1) + fib.p(n-2);
}

const main = () => {
	const TIMES = 10000;
	const N = 200;
	console.time("FIB");
	const f = cache(fib);
	for (let i = 0; i < TIMES; ++i) {
		CACHE = {};
		const res = f(N);
	}
	console.timeEnd("FIB");
}

// main(); // use to test cache

module.exports = {
	cache: (fn) => { CACHE = {}; return cache(fn); },
}