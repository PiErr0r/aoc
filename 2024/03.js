
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

const tryParse = (data, i) => {
	let [x, y] = [0, 0];
	const def = [0, 0];
	if (data[i] !== '(') return def;
	++i;
	if (isNaN(int(data[i])) && data[i] !== '-') return def;
	const neg1 = data[i] === '-';
	if (neg1)
		++i;
	while (data[i] >= '0' && data[i] <= '9') {
		x = x * 10 + int(data[i++]);
	}
	if (data[i] !== ',') return def;
	++i;
	if (isNaN(int(data[i])) && data[i] !== '-') return def;
	const neg2 = data[i] === '-';
	if (neg2)
		++i;
	while (data[i] >= '0' && data[i] <= '9') {
		y = y * 10 + int(data[i++]);
	}
	if (data[i] !== ')') return def;
	if (neg1) x = -x;
	if (neg2) y = -y;
	return [x, y];
}

function part1(data) {

	let res = 0;
	let i = 0;
	while (i < data.length) {
		if (data.slice(i, i + 3) === 'mul') {
			let j = i + 3;
			const [x, y] = tryParse(data, i + 3);
			res += x * y;
		}
		++i;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	let i = 0;
	let enabled = true;
	while (i < data.length) {
		if (data.slice(i, i + 4) === 'do()') enabled = true;
		if (data.slice(i, i + 7) === "don't()") enabled = false;
		if (enabled && data.slice(i, i + 3) === 'mul') {
			const [x, y] = tryParse(data, i + 3);
			res += x * y;
		}
		++i;
	}

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
