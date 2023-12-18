
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, ord, chr, count, debug, disp, disp3, crt, gcd, lcm, manDist, modPow, modPowBig, modInv, mod, prod, prodBig, randint, shoelace, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");
const { areaInteger } = require('../lib')

const DIRS = {
	'U': [-1, 0],
	'D': [1, 0],
	'L': [0, -1],
	'R': [0, 1]
};
const ENC = 'RDLU';

function part1(data) {

	let res = 0;
	// R 9 (#066240)
	data = scanf(data, "%w %d (#%w)");
	const coords = [];
	let cx = 0, cy = 0;
	coords.push([cy, cx]);
	iter(data, ([dir, n, color]) => {
		// const [dir, n] = decode(color);
		const [dy, dx] = DIRS[dir];
		cy += n * dy;
		cx += n * dx;
		coords.push([cy, cx]);
	});
	const line = getLine(coords);
	res = shoelace(coords) + line / 2 + 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const decode = (s) => {
	let n = s.slice(0, 5);
	let dir = ENC[int(s[ s.length - 1 ])];
	return [dir, num(n, 16)]
}

const getLine = (coords) => {
	let len = 0;
	let prev = coords[coords.length - 1];
	iter(coords, (curr) => {
		len += manDist(curr, prev);
		prev = curr;
	})
	return len;
}

function part2(data) {

	let res = 0;
	// R 9 (#066240)
	data = scanf(data, "%w %d (#%w)");
	const coords = [];
	let cx = 0, cy = 0;
	coords.push([cy, cx]);
	iter(data, ([_dir, _n, color]) => {
		const [dir, n] = decode(color);
		const [dy, dx] = DIRS[dir];
		cy += n * dy;
		cx += n * dx;
		coords.push([cy, cx]);
	});
	const line = getLine(coords);
	res = areaInt(coords)// shoelace(coords) + line / 2 + 1;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("18_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
