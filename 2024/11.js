
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

const splitN = (n) => {
	const l = (n + "").length / 2;
	let a = 0;
	let T = 1;
	range(l)(i => {
		const rem = n % 10;
		a = (rem * T) + a;
		n = floor(n / 10);
		T *= 10;
	})
	return [n, a];
}

function part1(data) {

	let res = 0;
	data = ints(data);

	range(25)(_ => {
		const nData = [];
		iter(data, n => {
			if (n === 0) {
				nData.push(1);
			} else if ((n + "").length % 2 == 0) {
				const [a, b] = splitN(n);
				nData.push(a);
				nData.push(b);
			} else {
				nData.push(n * 2024);
			}
		})
		data = nData;
	})
	res = data.length;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const MEMO = {};
const ways = (n, times) => {
	if (n in MEMO && times in MEMO[n]) return MEMO[n][times];
	if (times === 0) {
		if (!(n in MEMO)) MEMO[n] = { 0: 1 };
		else MEMO[n][times] = 1;
		return 1;
	}
	if (!(n in MEMO)) MEMO[n] = {};
	if (n === 0) {
		const tmp = ways(1, times - 1);
		MEMO[n][times] = tmp;
	} else if ((n + "").length % 2 === 0) {
		const [a, b] = splitN(n);
		const tmp1 = ways(a, times - 1);
		const tmp2 = ways(b, times - 1);
		MEMO[n][times] = tmp1 + tmp2;
	} else {
		const tmp = ways(n * 2024, times - 1);
		MEMO[n][times] = tmp;
	}
	return MEMO[n][times];
}

function part2(data) {

	let res = 0;
	data = ints(data);
	iter(data, n => {
		res += ways(n, 75);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("11_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
