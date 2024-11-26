
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

function part1(data) {

	let res = 0;
	data = scanf(data, "%d: %d");
	const G = {};
	iter(data, ([r, d]) => {
		G[r] = d;
	})
	let curr = 0;
	const mx = data[data.length - 1][0] + 1;
	while (curr < mx) {
		if (curr && G[curr]) {
			if (curr %  (2 * G[curr] - 2) === 0) {
				res += curr * G[curr];
			}
		}
		++curr;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%d: %d");
	const G = {};
	iter(data, ([r, d]) => {
		G[r] = d;
	})
	let initial = 1;
	const mx = data[data.length - 1][0] + 1;
	while (!res) {
		let curr = 0;
		let t = initial;
		res = 1;
		while (curr < mx) {
			if (G[curr]) {
				if (t % (2 * G[curr] - 2) === 0) {
					res = 0;
					break;
				}
			}
			++curr;
			++t;
		}
		++initial;
	}
	res = initial - 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("13_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
