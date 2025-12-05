
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
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c !== '@') return;
			let cnt = 0;
			iter(D8, ([dy, dx]) => {
				if (!inBB(y + dy, x + dx, data)) return;
				if (data[y+dy][x+dx] === '@') ++cnt;
			})
			if (cnt < 4) ++res;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const ats = new set();
	iter(data, (r, ri) => {
		iter(r, (c, ci) => {
			if (c === '@') ats.add([ri, ci]);
		})
	})
	let used = new set();
	let rm;
	do {
		rm = false;
		const tmp = new set();
		iter(ats, ([y, x]) => {
			if (used.has([y, x])) return;
			let cnt = 0;
			iter(D8, ([dy, dx]) => {
				if (ats.has([y+dy, x+dx]) && !used.has([y+dy, x+dx])) ++cnt;
			})
			if (cnt < 4) {
				tmp.add([y, x]);
			}
		})
		if (tmp.size) {
			rm = true;
			used = or(used, tmp);
		}
	} while (rm);
	res = used.size;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("04_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
