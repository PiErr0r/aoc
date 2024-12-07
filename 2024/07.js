
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

function part1(data) {

	let res = 0;
	data = lines(data);
	const R = new set();
	iter(data, (r, ri) => {
		let [result, other] = r.split(': ');
		result = int(result);
		other = other.split(' ')
		range(2 ** (other.length - 1))(i => {
			let s = int(other[0]);
			iter(other.slice(1), (n, j) => {
				if (i & (1 << j))
					s += int(other[j + 1]);
				else
					s *= int(other[j + 1]);
			})
			if (result === s) {
				res += result
				R.add(ri);
				return true;
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(data, R, res);
	return;
}

const ter = (n) => {
	let res = '';
	while (n) {
		res += ('' + n % 3);
		n = floor(n / 3);
	}
	return res;
}

function part2(data, R, resFirst) {

	let res = 0n;
	iter(data, (r, ri) => {
		if (R.has(ri)) return;
		let [result, other] = r.split(': ');
		result = BigInt(result);
		other = other.split(' ')
		let combs = 0;
		let solve = false;
		range(3 ** (other.length - 1))(i => {
			i = ter(i);
			let s = BigInt(other[0]);
			range(other.length - 1)(j => {
				if (i[j] === '0' || j >= i.length)
					s = BigInt((s + "") + other[j + 1]);
				else if (i[j] === '1')
					s += BigInt(other[j + 1]);
				else if (i[j] === '2')
					s *= BigInt(other[j + 1]);
				if (s > result) return true;
			})
			++combs;
			if (result === s) {
				res += result;
				solve = true;
				R.add(ri)
				return true;
			}
			return solve;
		})
	})

	debug(BigInt(res) + BigInt(resFirst));
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
