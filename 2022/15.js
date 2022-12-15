
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const ROW = 2000000;
// const ROW = 10;

const mandist = (xa, ya, xb, yb) => abs(xa - xb) + abs(ya - yb);

function part1(data) {
	data = lines(data).map(r => ints(r))

	let res = 0;
	const intervals = [];
	iter(data, ([ sx, sy, bx, by ], i) => {
		const M = mandist(sx, sy, bx, by);
		const dy = abs(sy - ROW);
		if (dy > M) return;
		const diff = abs(M - dy);
		intervals.push([ sx - diff, sx + diff ]);
	});

	sort(intervals, (a, b) => a[0] - b[0]);
	const real = [];
	range(intervals.length)(i => {
		if (!real.length) real.push(intervals[i]);
		const [a1, a2] = real[real.length - 1];
		const [b1, b2] = intervals[i];
		if (b1 >= a1 && b2 <= a2) {
			// do nothing
		} else if (b1 <= a2) {
			real[real.length - 1] = [a1, b2];
		} else {
			real.push([b1, b2]);
		}
	})

	iter(real, ([x1, x2]) => {
		res += x2 - x1;
	});

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = lines(data).map(r => ints(r))
	const ROWS = 4000000;

	let res = 0;
	range(1, ROWS + 1)(Y => {
		const intervals = [];
		iter(data, ([ sx, sy, bx, by ], i) => {
			const M = mandist(sx, sy, bx, by);
			const dy = abs(sy - Y);
			if (dy > M) return;
			const diff = abs(M - dy);
			intervals.push([ sx - diff, sx + diff ]);
		});

		sort(intervals, (a, b) => a[0] - b[0]);
		const real = [];
		range(intervals.length)(i => {
			if (!real.length) real.push(intervals[i]);
			const [a1, a2] = real[real.length - 1];
			const [b1, b2] = intervals[i];
			if (b1 >= a1 && b2 <= a2) {
				// do nothing
			} else if (b1 <= a2) {
				real[real.length - 1] = [a1, b2];
			} else {
				real.push([b1, b2]);
			}
		});
		if (real.length !== 1 || real[0][0] > 0 || real[0][1] < ROWS) {
			const x = real[0][1] + 1;
			// Y = 2634249; x = 3120101
			res = ROWS * x + Y;
			return true;
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
