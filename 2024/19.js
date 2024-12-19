
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
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const canDo = (t, patterns) => {
	if (patterns.has(t)) return true
	if (t.length === 0) return true;
	let r = 1;
	let possible = false;
	while (r <= t.length && !possible) {
		if (patterns.has(t.slice(0, r))) {
			possible ||= canDo(t.slice(r), patterns);
		}
		++r;
	}
	return possible;
}

function part1(data) {

	let res = 0;
	data = getGroups(data);
	const patterns = new set(data[0].split(', '))
	const towels = lines(data[1])

	iter(towels, t => {
		res += canDo(t, patterns);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

let MEMO = {};
const calculateWays = (t, patterns) => {
	if (t in MEMO) return MEMO[t];
	if (t.length === 0) return 1;
	let r = 1;
	let res = 0//patterns.has(t);
	while (r <= t.length) {
		if (patterns.has(t.slice(0, r))) {
			const tmp = calculateWays(t.slice(r), patterns);
			MEMO[t.slice(r)] = tmp;
			res += tmp;
		}
		++r;
	}
	MEMO[t] = res;
	return res;
}

function part2(data) {

	let res = 0;
	data = getGroups(data);
	const patterns = new set(data[0].split(', '))
	const towels = lines(data[1])

	iter(towels, t => {
		res += calculateWays(t, patterns);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("19_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
