
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
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
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const reverse = (L, curr, n) => {
	const nArr = [];
	range(n)(i => {
		nArr.push(L[(curr + i) % L.length]);
	})
	nArr.reverse();
	range(n)(i => {
		L[(curr + i) % L.length] = nArr[i];
	})
}

function part1(data) {

	let res = 0;
	data = ints(data);
	const LIST = new Array(256).fill(0).map((_, i) => i);
	let curr = 0;
	let skip = 0;

	iter(data, n => {
		reverse(LIST, curr, n);
		curr = (curr + n + skip) % LIST.length;
		++skip; 
	})
	res = LIST[0] * LIST[1]
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const dense = (L) => {
	const res = [];
	let curr = 0;
	range(L.length)(i => {
		if (i && i % 16 === 0) {
			res.push(curr);
			curr = 0;
		}
		curr ^= L[i];
	})
	res.push(curr);
	return res;
}

function part2(data) {

	let res = 0;
	data = data.split('').map(c => ord(c)).concat([17, 31, 73, 47, 23])
	const LIST = new Array(256).fill(0).map((_, i) => i);
	let curr = 0;
	let skip = 0;

	range(64)(_ => {
		iter(data, n => {
			reverse(LIST, curr, n);
			curr = (curr + n + skip) % LIST.length;
			++skip; 
		})
	})
	const nList = dense(LIST);
	res = nList.map(n => hex(n)).join('');

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("10_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
