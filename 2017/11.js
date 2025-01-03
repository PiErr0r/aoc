
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

const getDir = d => {
	// console.log(d)
	return true &&
		d === 'n'  ? [-1,  0] :
		d === 's'  ? [ 1,  0] :
		d === 'ne' ? [-1,  1] :
		d === 'sw' ? [ 1, -1] :
		d === 'nw' ? [ 0, -1] :
		d === 'se' ? [ 0,  1] :
		console.log("FAIL");
}

function part1(data) {

	let res = 0;
	data = data.split(',')
	let x = 0, y = 0;
	iter(data, dir => {
		const [dy, dx] = getDir(dir);
		y += dy;
		x += dx;
	})
	res = max(abs(y), abs(x))
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = data.split(',')
	let x = 0, y = 0;
	iter(data, dir => {
		const [dy, dx] = getDir(dir);
		y += dy;
		x += dx;
		res = max(res, abs(y), abs(x))
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
