
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

const bfs = (G, sy, sx, gy, gx) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	while (!q.empty()) {
		const [y, x, steps] = q.pop();
		if (y === gy && x === gx) return steps;
		if (seen.has([y, x])) continue;
		seen.add([y, x]);

		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === 1) return;
			q.push([y+dy, x+dx, steps+1]);
		})
	}
	return -1;
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%d,%d");
	const G = empty(71, 71);
	iter(data, ([x, y], i) => {
		if (i >= 1024) return true;
		G[y][x] = 1;
	})
	res = bfs(G, 0, 0, G.length - 1, G.length - 1);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%d,%d");
	const G = empty(71, 71);
	iter(data, ([x, y], i) => {
		debug(i)
		G[y][x] = 1;
		const tmp = bfs(G, 0, 0, G.length - 1, G.length - 1);
		if (tmp === -1) {
			res = [x, y];
			return true;
		}
	})

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
