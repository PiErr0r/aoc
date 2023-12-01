
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

const D = (n) => /-?\d/.test(n);

const OPS = {
	cpy: (R, x, y) => R[y] = x in R ? R[x] : int(x),
	inc: (R, x, y = 0) => R[x]++,
	dec: (R, x, y = 0) => R[x]--,
	jnz: (R, x, y) => R.p += (x in R ? R[x] : int(x)) !== 0 ? int(y) - 1 : 0,
}

function part1(data) {
	let res = 0;
	data = lines(data).map(l => l.split(' '));
	let a = 0
	while (true) {
		const R = { a, b: 0, c: 0, d: 0, p: 0 }
		let prev = 1;
		debug(a);
		while (R.p < data.length) {
			const [op, ...args] = data[R.p];
			if (op === 'out') {
				let tmp = D(args[0]) ? int(args[0]) : R[ args[0] ];
				if (!(prev^tmp)) break;
				prev = tmp
			} else {
				OPS[op](R, ...args);
			}
			++R.p;
		}
		a++;
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
