
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const calcTimes = (t, d) => { // bruteforce
	let res = 0;
	range(t)(i => {
		if ((t - i) * (i) > (d)) ++res;
	})
	return res;
}

const quadratic = (t, d) => {
	// eq: -x*x + t*x - d > 0
	const D = t*t - 4 * d;
	const x1 = (-t + sqrt(D)) / -2;
	const x2 = (-t - sqrt(D)) / -2;
	return floor(max(x1, x2)) - floor(min(x1, x2));
}

function part1(data) {

	let res = 1;
	const [t, d] = lines(data).map(a => ints(a));
	range(t.length)(i => {
		res *= quadratic(t[i], d[i]);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 1;
	const [t, d] = lines(data).map(a => ints(a)).map(a => a.join('')).map(a => int(a));

	// res = calcTimes(t, d)
	res = quadratic(t, d)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
