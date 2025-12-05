
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
	let [idRanges, ids] = getGroups(data);
	idRanges = scanf(idRanges, "%d-%d")
	ids = ints(ids)

	iter(ids, id => {
		iter(idRanges, ([a, b]) => {
			if (a <= id && id <= b) {
				++res;
				return 1;
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const overlap = ([a, b], [c, d]) => {
	return !(b < c || a > d);
}

const merge = ([a, b], [c, d]) => {
	return [min(a, c), max(b, d)];
}

const checkAndUpdate = (A, rngs) => {
	let inserted = false;
	let [a, b] = A;
	for (let i = 0; i < rngs.length; ++i) {
		const [c, d] = rngs[i];
		if (overlap([a, b], [c, d])) {
			[a, b] = merge([a, b], [c, d]);
			rngs.splice(i, 1);
			inserted = true;
			break;
		}
	}
	if (!inserted) {
		rngs.push([a, b])
		return false;
	}
	A[0] = a;
	A[1] = b
	return true;
}

function part2(data) {

	let res = 0;
	let [idRanges, ids] = getGroups(data);
	idRanges = scanf(idRanges, "%d-%d")

	const rngs = [];
	iter(idRanges, (rng) => {
		while (checkAndUpdate(rng, rngs));
	})
	iter(rngs, ([a, b]) => {
		res += b - a + 1;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
