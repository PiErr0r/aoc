
function memoizedFunction(fn) {
  const cache = new Map();
 
  return function(...args) {
    const key = JSON.stringify(args);
 
    if (cache.has(key)) {
      return cache.get(key);
    }
 
    const result = fn.apply(this, args);
    cache.set(key, result);
 
    return result;
  };
}


let CACHE = {};
const cache = (fn, memoArgsIndices = []) => new Proxy(fn, {
	apply: (f, _, args) => {
		const ARGS = args
			.filter((a, i) => memoArgsIndices.length === 0 || memoArgsIndices.indexOf(i) !== -1)
			.map(a => JSON.stringify(a)).join('-');
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

const fib2 = (n) => {
	if (n <= 1) return 1;
	return fib2(n-1) + fib2(n-2);
}

const memoize = (func, serialize = (...args) => args.join("\0")) => {
	let map = new Map()

	return (...args) => {
		let key = serialize(...args)

		if (map.has(key)) {
			return map.get(key)
		}

		let val = func(...args)
		map.set(key, val)
		return val
	}
}

const main3 = () => {
	// const TIMES = 10000;
	const TIMES = 1;
	// const N = 200;
	const N = 40;
	console.time("FIB");
	const f = memoizedFunction(fib2);
	for (let i = 0; i < TIMES; ++i) {
		const res = f(N);
		console.log(res);
	}
	console.timeEnd("FIB");	
}

const main2 = () => {
	const TIMES = 10000;
	const N = 200;
	console.time("FIB");
	const f = memoize(fib2);
	for (let i = 0; i < TIMES; ++i) {
		const res = f(N);
	}
	console.timeEnd("FIB");	
}

const main = () => {
	// const TIMES = 10000;
	const TIMES = 1;
	const N = 200;
	console.time("FIB");
	const f = cache(fib);
	for (let i = 0; i < TIMES; ++i) {
		CACHE = {};
		const res = f(N);
		console.log(res);
	}
	console.timeEnd("FIB");
}

// main(); // use to test cache

// main2(); // use to test memoize

// main3(); // use to test memoizedFunction

module.exports = {
	cache: (fn) => { CACHE = {}; return cache(fn); },
}