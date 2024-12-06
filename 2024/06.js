
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

const right = (dy, dx) => {
	return [dx, -dy];
}

function part1(data) {

	let res = 0;
	let sy, sx;
	data = table(data);
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '^') {
				sy = i;
				sx = j;
			}
		})
	})
	data[sy][sx] = '.'
	let [y, x] = [sy, sx];
	let dy = -1;
	let dx = 0;
	const visited = new set();
	let py, px;
	visited.add([y, x])
	while (true) {
		if (!inBB(y+dy, x+dx, data)) {
			break;
		}
		if (data[y+dy][x+dx] === '#') {
			[dy, dx] = right(dy, dx);
		}
		turn = 0;
		[py, px] = [y, x];
		[y, x] = [y+dy, x+dx];
		visited.add([y, x]);
	}
	res = visited.size;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(data, sy, sx, visited);
	return;
}

function part2(data, sy, sx, V) {

	let res = 0;
	iter(V, ([i, j]) => {
		if (i === sy && j === sx) return;
		data[i][j] = '#';
		let [y, x] = [sy, sx];
		let dy = -1;
		let dx = 0;
		const visited = new set();
		let isLoop = true
		let same = 0;
		while (true) {
			if (visited.has([y, x, dy, dx])) {
				break
			}
			visited.add([y, x, dy, dx]);
			if (!inBB(y+dy, x+dx, data)) {
				isLoop = false;
				break;
			}
			if (data[y+dy][x+dx] === '#') {
				[dy, dx] = right(dy, dx);
			} else {
				[y, x] = [y+dy, x+dx];
			}
		}

		if (isLoop) {
			++res;
		}

		data[i][j] = '.';
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
