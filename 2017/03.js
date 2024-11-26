
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
	data = int(data);
	let sq = floor(sqrt(data)) + 1;
	if (sq % 2 === 0) ++sq;
	let big = sq ** 2, small = (sq - 2) ** 2;
	let tmp = big;
	let cnt = 0;
	while (tmp > data) {
		tmp -= (sq - 1);
		++cnt;
	}
	debug((sq - 1) / 2, data, tmp)
	res = (sq - 1) / 2 + abs((sq - 1) / 2 - (data - tmp));

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const fillData = (G, data) => {
	const l = G.length;
	let x = int(l/2), y = int(l/2);
	let i = 0;
	let dy = 0, dx = 1;
	G[y][x] = 1;
	const left = (_G, _y, _x, _dy, _dx) => {
		const [ndy, ndx] = [dy ? 0 : -dx, dx ? 0 : dy];
		return G[y + ndy][x + ndx] ? [dy, dx] : [ndy, ndx];
	}
	while (true) {
		y += dy;
		x += dx;
		let sm = 0;
		drange(3)((i, j) => {
			sm += G[y - 1 + i][x - 1 + j];
		});
		G[y][x] = sm;
		if (sm > data) return sm;
		[dy, dx] = left(G, y, x, dy, dx);
	}
}

function part2(data) {

	let res = 0;
	data = int(data);
	let sq = floor(sqrt(data));
	if (sq % 2 === 0) ++sq;
	const GRID = new Array(sq).fill(0).map(r => new Array(sq).fill(0));
	res = fillData(GRID, data);

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
