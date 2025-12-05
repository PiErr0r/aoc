
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
	data = lines(data).map(r => digits(r));
	iter(data, r => {
		let mx = 0;
		let mxi = -1;
		iter(r, (c, ci) => {
			if (ci === r.length - 1) return;
			if (c > mx) {
				mx = c;
				mxi = ci;
			}
		})
		let mx2 = max(...r.slice(mxi + 1));
		res += mx * 10 + mx2;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data).map(r => digits(r));
	iter(data, r => {
		let previ = -1;
		let curr = 0;
		range(11, 0, -1)(end => {
			const L = r.slice(previ + 1).length;
			let mx = 0;
			let mxi = previ;
			iter(r.slice(previ + 1), (c, ci) => {
				if (ci === L - end) return 1;
				if (c > mx) {
					mx = c;
					mxi = (previ + 1) + ci;
				}
			})
			curr = curr * 10 + mx;
			previ = mxi;
		})
		let mx2 = max(...r.slice(previ + 1));
		res += curr * 10 + mx2;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
