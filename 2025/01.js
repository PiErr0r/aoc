
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
	data = lines(data);
	let dial = 50;
	iter(data, r => {
		const dir = r[0];
		const step = int(r.slice(1))
		switch (dir) {
			case 'L': dial = mod(dial - step, 100); break;
			case 'R': dial = mod(dial + step, 100); break;
			default: debug("ERROR");
		}
		if (dial === 0) ++res;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data);
	let dial = 50;
	iter(data, r => {
		const dir = r[0];
		const step = int(r.slice(1))
		switch (dir) {
			case 'L':
				const tmp1 = dial - step
				res += -floor((tmp1 - 1) / 100)
				if (!dial) --res;
				dial = mod(dial - step, 100); break;
			case 'R':
				const tmp2 = dial + step;
				res += floor(tmp2 / 100)
				dial = mod(dial + step, 100); break;
			default: debug("ERROR");
		}
		// debug(dir, step, dial, res);
	})
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("01_input").toString("utf-8");

	part1(data);
	part2(data);
	part2xx(data);
	process.exit(0);
}

main();
