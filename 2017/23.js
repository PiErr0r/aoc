
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const getVal = (R, n) => {
	n = n.trim();
	if (isNaN(num(n))) return R[n];
	else return num(n);
}

const OP = {
	set: (R, x, y) => (R[x] = getVal(R, y), 1),
	sub: (R, x, y) => (R[x] -= getVal(R, y), 1),
	mul: (R, x, y) => (R[x] *= getVal(R, y), 1),
	jnz: (R, x, y) => getVal(R, x) !== 0 ? getVal(R, y) : 1,
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%w %w %.");
	let i = 0;
	const R = new DD();
	while (i < data.length) {
		const [op, x, y] = data[i];
		i += OP[op](R, x, y);
		res += op === 'mul';
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const prime = (n) => {
	let isPrime = false;
	range(2, ceil(sqrt(n)))(i => {
		if (n % i === 0) isPrime = true;
		return isPrime;
	})
	return isPrime;
}

function part2(data) {

	let res = 0;
	// the code in data calculates how many primes are there in interval [108100, 125100] with step of 17

	let b = 108100
	const c = 125100
	while (b <= c) {
		if (prime(b)) ++res;
		b += 17;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("23_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
