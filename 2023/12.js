
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

const possible = (src, goal, si = 0, gi = 0) => {
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
		res += tmp
	}
	if (src[mm] !== '#')
		res += possible(src, goal, mm + 1, gi);
	return res;
}

function part1(data) {

	let res = 0;
	data = lines(data);
	iter(data, line => {
		let [src, goal] = line.split(' ');
		goal = ints(goal);
		let tmp = possible(src, goal)
		// debug('---------------------------------', src, goal, tmp)
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
	let isBad = false
	iter(data, line => {
		let [src, goal] = line.split(' ');
		goal = ints(goal);
		let tmp1 = possible(src, goal)
		// src = '?' + src + '?';
		let i = 0;
		// if (!match(src, goal)) {
		// 	debug(src)
		// }

		let asd = (src.at(-1) === '#' ? '' : '?') + src ;//+ src.slice(0, 5);
		let tmp3 = possible(asd, goal)
		src = (src.at(-1) === '#' ? '' : '?') + src + src.slice(0, 1);
		// while (i < src.length && src[i] === '?') src += src[i++];
		let tmp2 = possible(src, goal)
		if (tmp2 !== tmp3) debug(asd, tmp2, tmp3)
		if (tmp2 === 0) isBad = true;
		debug('---------------------------------', src, goal, tmp1 * tmp2 * tmp2 * tmp2 * tmp2)
		res += tmp1 * tmp2 * tmp2 * tmp2 * tmp2;
	})
	debug("BAD!!!", isBad)
	// 6720660274964 - memoize
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
