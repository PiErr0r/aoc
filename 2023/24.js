
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

const checkDir = (X, Y, x1, y1, x2, y2, vx1, vy1, vx2, vy2) => {
	return sign(X - x1) === sign(vx1)
		&& sign(Y - y1) === sign(vy1)
		&& sign(X - x2) === sign(vx2)
		&& sign(Y - y1) === sign(vy1);
}

function part1(data) {

	let res = 0;
	// const MN = 7;
	// const MX = 27;
	const MN = 200000000000000;
	const MX = 400000000000000;
	data = scanf(data, "%d, %d, %d @ %d, %d, %d")
	for (let i = 0; i < data.length; ++i) {
		for (let j = i + 1; j < data.length; ++j) {
			const [x1, y1, _1, vx1, vy1, __1] = data[i];
			const [x2, y2, _2, vx2, vy2, __2] = data[j];
			k1 = vy1 / vx1;
			k2 = vy2 / vx2;
			// y - y1 = k (x - x1)
			// k1 (x - x1) + y1 = k2 (x - x2) + y2
			// k1 x - k1 x1 + y1 = k2 x - k2 x2 + y2
			// x (k1 - k2) = y2 - k2 x2 - y1 + k1 x1
			// x = (y2 - k2 x2 - y1 + k1 x1) / (k1 - k2)
			const X = (y2 - k2 * x2 - y1 + k1 * x1) / (k1 - k2);
			const Y = k1 * (X - x1) + y1;
			if (X >= MN && X <= MX && Y >= MN && Y <= MX) {
				res += checkDir(X, Y, x1, y1, x2, y2, vx1, vy1, vx2, vy2);
			}
		}
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	// solved in 24.py
	
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
