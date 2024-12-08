
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res = 0;
	data = table(data);
	const antenna = new DD(set);

	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c !== '.') {
				antenna[c].add([i, j]);
			}
		})
	})

	const freq = new set();
	iter(keys(antenna), k => {
		diter(antenna[k], ([y1, x1], [y2, x2]) => {
			if (y2 === y1 && x2 === x1) return;
			const [dy, dx] = [y2 - y1, x2 - x1];
			if (inBB(y2 + dy, x2 + dx, data)) {
				freq.add([y2+dy, x2+dx]);
			}
		})
	})
	res = freq.size

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const antenna = new DD(set);

	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c !== '.') {
				antenna[c].add([i, j]);
			}
		})
	})

	const freq = new set();
	iter(keys(antenna), k => {
		diter(antenna[k], ([y1, x1], [y2, x2]) => {
			if (y2 === y1 && x2 === x1) return;
			const [dy, dx] = [y2 - y1, x2 - x1];
			let i = 0;
			while (inBB(y1 + i*dy, x1 + i*dx, data)) {
				freq.add([y1+i*dy, x1+i*dx]);
				++i;
			}
		})
	})
	res = freq.size

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
