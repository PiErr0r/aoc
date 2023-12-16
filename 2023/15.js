
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


const hash = (data) => {
	let res = 0;
	iter(data, c => {
		res += ord(c);
		res = (res * 17) % 256
	})
	return res;
}

// precomputed table and fast hashing
const T = empty(16);
range(1, 16)(i => {
	T[i] = modPow(17, i, 256);
});
const hash2 = (data) => {
	let res = 0;
	range(data.length)(i => {
		res = (res +  ord(data[i]) * T[(data.length - i) & 0xF]) & 0xFF;
	})
	return res & 0xFF;
}

function part1(data) {

	let res = 0;
	data = data.split(',');
	iter(data, s => {
		res += hash2(s)
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = data.split(',');
	const B = empty(256).map(_ => ({}));
	iter(data, s => {
		let ss, op, num;
		if (in_('-', s)) {
			ss = s.split('-')[0];
			op = '-';
		} else {
			[ss, num] = s.split('=');
			op = '=';
		}
		if (op === '-') {
			delete B[hash2(ss)][ss];
		} else {
			B[hash2(ss)][ss] = int(num);
		}
	})

	iter(B, (b, i) => {
		iter(keys(b), (k, j) => {
			res += (i + 1) * b[k] * (j + 1);
		});
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
