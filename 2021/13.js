
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

function part1(data) {

	data = getGroups(data);
	let res;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = getGroups(data);
	const dots = parse(data[0], 'd,d');
	const folds = parse(data[1], 'w w w=d');

	let mxx = 0, mxy = 0;

	let coords = new set();
	let nDots = [...dots];
	iter(folds, (f, i) => {
		if (i === 1) {
			debug(nDots.length)
			console.log("END OF PART1");
		}
		const [_1, _2, axis, n] = f;
		nDots.forEach(d => {
			const [x, y] = d;
			if (axis === 'x') {
				mxx = n;
				coords.add([x > n ? 2 * n - x : x, y])
			} else {
				mxy = n;
				coords.add([x, y > n ? 2 * n - y : y]);
			}
		})

		nDots = [...coords];
		coords = new set();
	})

	const G = empty((mxy + 2)).map(_ => empty(mxx + 3).map(a => '##'));
	nDots.forEach(d => {
		const [x, y] = d;
		G[y + 1][x + 2] = '  ';
	})
	disp(G)
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("13_input").toString("utf-8");

	// part1(data);
	part2(data);
	process.exit(0);
}

main();
