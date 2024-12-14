
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

function part1(data) {

	let res = 0;
	const robots = scanf(data, "p=%d,%d v=%d,%d").reduce((acc, curr, i) => {
		const [px, py, vx, vy] = curr;
		acc[i] = { px, py, vx, vy };
		return acc;
	}, {});
	const W = 101;
	const H = 103;

	range(100)(_ => {
		iter(keys(robots), i => {
			robots[i].px = mod(robots[i].px + robots[i].vx, W);
			robots[i].py = mod(robots[i].py + robots[i].vy, H);
		})
	})

	const q = empty(4);
	iter(keys(robots), i => {
		const { py, px } = robots[i];
		if (py === floor(H / 2) || px === floor(W / 2)) return;
		q[2 * floor( py / (floor(H/2) + 1) ) + floor( px / (floor(W/2) + 1) )]++; 
	})

	res = prod(q);


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const robots = scanf(data, "p=%d,%d v=%d,%d").reduce((acc, curr, i) => {
		const [px, py, vx, vy] = curr;
		acc[i] = { px, py, vx, vy };
		return acc;
	}, {});
	const W = 101;
	const H = 103;

	for (let _ = 0; _ < 10000; ++_) {
		const A = empty(H, W);
		let diff = true
		iter(keys(robots), i => {
			const X = mod(robots[i].px + _ * robots[i].vx, W);
			const Y = mod(robots[i].py + _ * robots[i].vy, H);
			if (A[Y][X]) {
				diff = false;
				return true;
			}
			A[Y][X] = 1;
		});
		if (diff) {
			disp(A);
			debug(res, _)
			res = _;
			break;
		}
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
