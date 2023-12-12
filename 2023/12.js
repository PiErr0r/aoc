
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, manDist, modPow, modPowBig, modInv, mod, prod, prodBig, randint, shoelace, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

let MEMO = {};
const possible = (src, goal, si = 0, gi = 0) => {
	if (MEMO[[si, gi]] !== undefined) return MEMO[[si, gi]];
	let ss = si;
	let mm = si, sit = si;
	while (si < src.length && src[si] === '.') {
		++si;
		++mm;
	};
	while (sit < src.length && in_(src[sit], '.?')) ++sit;
	if ((si >= src.length || sit >= src.length) && gi >= goal.length) return 1;
	if (si >= src.length || gi >= goal.length) return 0;
	if ((goal.length - gi > src.length - si) || goal[gi] > src.length - si) return 0;

	let cnt = 0;
	while (si < src.length && cnt < goal[gi] && in_(src[si], '#?')) {
		++cnt;
		++si;
	}

	let res = 0;
	if (cnt === goal[gi] && (si === src.length || src[si] !== '#')) {
		let tmp = possible(src, goal, si + 1, gi + 1);
		MEMO[[si+1, gi+1]] = tmp;
		res += tmp
	}
	if (src[mm] !== '#') {
		let tmp = possible(src, goal, mm + 1, gi);
		MEMO[[mm+1, gi]] = tmp;
		res += tmp;
	}
	MEMO[[ss, gi]] = res;
	return res;
}

function part1(data) {

	let res = 0;
	data = lines(data);
	iter(data, line => {
		let [src, goal] = line.split(' ');
		goal = ints(goal);
		MEMO = {};
		let tmp = possible(src, goal);
		let i = 0;
		res += tmp;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}


function part2(data) {

	let res = 0;
	data = lines(data);
	iter(data, (line, i) => {
		let [osrc, ogoal] = line.split(' ');
		let src = [], goal = [];
		range(5)(_ => {
			src.push(osrc);
			goal.push(ogoal);
		})
		src = src.join('?');
		goal = ints(goal.join(','));
		MEMO = {};
		let tmp = possible(src, goal)
		res += tmp;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("12_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
