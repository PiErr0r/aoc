
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

const bfs = (data, zy, zx, part = 1) => {
	const q = new Queue();
	q.push([zy, zx, '0']);
	const seen = new set();
	let cnt = 0;
	while (!q.empty()) {
		const [y, x, state] = q.pop();
		if (part === 1) {
			if (seen.has([y, x, state])) continue;
		}
		seen.add([y, x, state]);
		if (state === '9') {
			++cnt;
			continue;
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (data[y+dy][x+dx] !== ('' + (int(state) + 1))) return;
			q.push([y+dy, x+dx, ('' + (int(state) + 1))])
		})
	}
	return cnt;
}

function part1(data) {

	let r1 = 0, r2 = 0;
	data = table(data);
	const zeros = [];
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '0') zeros.push([i, j]);
		})
	})
	iter(zeros, ([zy, zx]) => {
		r1 += bfs(data, zy, zx, 1);
		r2 += bfs(data, zy, zx, 2);
	})

	debug(r1, r2);
	// if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF BOTH PARTS");
	return;
}

function main() {
	let data = fs.readFileSync("10_input").toString("utf-8");

	part1(data);
	process.exit(0);
}

main();
