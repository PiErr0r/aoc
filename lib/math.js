const is = (n) => n !== undefined && n !== null;
// if b is undefined or null return randint(0, a);
const randint = (a, b) => ((is(b) ? a : 0) + Math.floor(Math.random() * ((is(b) ? b : a) - (is(b) ? a : 0))));

// greatest common divisor
const gcd = (a, b) => {
	let res = 0;
	while (b) {
		const tmp = a;
		a = b;
		b = tmp % b;
	}

	return a;
}

// least common multiple
const lcm = (a, b) => a * b / gcd(a, b);

// solve a * x = b mod c
const solve = (a, b, c) => {
	let i = 0;
	while (++i)
		if (a * i % c === b)
			return i;
}

// chinese remainder theorem
/**
 * solve equation:
 * 	 x = a1 mod p1
 *   x = a2 mod p2
 *   x = a3 mod p3
 * 		...
 * t = [[a1, p1], [a2, p2], ...]
 */
const crt = (t) => {
	// n = p1 * p2 * p3 * ...
	const n = t.reduce((acc, curr) => acc * curr[1], 1);
	// n1 = n / p1; n2 = n / p2; ...
	const ns = t.map(mod => n / mod[1]);
	// find xs such that n1 * x1 = a1 mod p1
	const sols = t.map((mod, i) => solve(ns[i], mod[0], mod[1]));
	// x0 = x1 * n1 + x2 * n2 + ... xn * nn mod n
	return ns.reduce((acc, curr, i) => (acc + curr * sols[i]) % n, 0) % n;
}

// if m != 0 calculate modulo power
const modPow = (a, b, m = 0) => {
	let res = 1;
	while (b) {
		if (b & 1) {
			res *= a;
			if (m) {
				res %= m;
			}
		}
		a *= a;
		if (m) a %= m;
		b >>= 1;
	}
	return res;
}

const mod = (a, n) => ((a % n ) + n ) % n;

module.exports = {
	randint,
	gcd,
	lcm, 
	crt,
	modPow,
	mod
}
