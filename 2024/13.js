
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

const EPS = 0.01;

const solveEq = (ax, ay, bx, by, x, y) => {
	/** 
	 * a * ax + b * bx = x
	 * a * ay + b * by = y
	 * a = (x - b * bx) / ax
	 * b = (y - a * ay) / by
	 * b = (y - (x - b * bx) / ax * ay) / by
	 * b = y / by - ay * (x - b * bx) / (ax * by) 
	 * b = y / by - ay * x / (ax * by) + b * ay * bx / (ax * by)
	 * b = (y / by - ay * x / (ax * by)) / (1 - ay * bx / (ax * by))
	 */
	// console.assert(ax !== 0)
	// console.assert(by !== 0)
	// console.assert(ax * by !== ay * bx)
	const b = (y / by - ay * x / (ax * by)) / (1 - ay * bx / (ax * by))
	const a = (x - b * bx) / ax;
	// console.log(a * ax + b * bx === x, a * ax + b * bx, x)
	// console.log(a * ay + b * by === y, a * ay + b * by, y)
	// console.assert(Math.fround(a * ax + b * bx) === x)
	// console.assert(Math.fround(a * ay + b * by) === y)
	return [a, b]
}

function part1(data) {

	let res = 0;
	data = getGroups(data);
	iter(data, g => {
		const [A, B, prize] = lines(g);
		const [[ax, ay]] = scanf(A, "Button A: X+%d, Y+%d");
		const [[bx, by]] = scanf(B, "Button B: X+%d, Y+%d")
		const [[x, y]] = scanf(prize, "Prize: X=%d, Y=%d")
		const [ta, tb] = solveEq(ax, ay, bx, by, x, y);
		if (abs(ta - Math.round(ta)) > EPS || abs(tb - Math.round(tb)) > EPS) return
		res += ta * 3 + tb; 
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = getGroups(data);
	const ADD = 10000000000000;
	iter(data, g => {
		const [A, B, prize] = lines(g);
		const [[ax, ay]] = scanf(A, "Button A: X+%d, Y+%d");
		const [[bx, by]] = scanf(B, "Button B: X+%d, Y+%d")
		const [[x, y]] = scanf(prize, "Prize: X=%d, Y=%d")
		const [ta, tb] = solveEq(ax, ay, bx, by, x + ADD, y + ADD);
		if (abs(ta - Math.round(ta)) > EPS || abs(tb - Math.round(tb)) > EPS) return
		res += ta * 3 + tb; 
	})

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
