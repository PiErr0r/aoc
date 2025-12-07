
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle, rangeOverlap } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { binSearch, Counter, DD, empty, FastQueue, PriorityQueue, Queue, RBTree, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

function part1(data) {

	let res = 0;
	data = table(data);
	const index = data[0].indexOf('S');
	let curr = new set();
	curr.add(index);
	iter(data, (r, ri) => {
		if (ri === 0) return;
		if (ri === data.length - 1) {
			// res = curr.size;
			return;
		}
		const tmp = new set();
		iter(curr, i => {
			if (r[i] === '^') {
				tmp.add(i - 1);
				tmp.add(i + 1);
				++res;
			} else {
				tmp.add(i);
			}
 		})
		curr = tmp;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const index = data[0].indexOf('S');
	let curr = {};
	curr[index] = 1;
	iter(data, (r, ri) => {
		if (ri === 0) return;
		if (ri === data.length - 1) {
			return;
		}
		const tmp = {};
		iter(keys(curr), i => {
			i = int(i);
			if (r[i] === '^') {
				if (tmp[i-1]) tmp[i-1] += curr[i];
				else tmp[i-1] = curr[i];
				if (tmp[i+1]) tmp[i+1] += curr[i];
				else tmp[i+1] = curr[i];
			} else {
				if (tmp[i]) tmp[i] += curr[i];
				else tmp[i] = curr[i];
			}
 		})
		curr = tmp;
	})
	res = sum(values(curr))

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
