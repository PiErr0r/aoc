
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

// const AREA = [[96,125], [-144,-98]];
const AREA = [[2000, 2039], [-9960, -9956]];
// 49595820 
// 336 
// const AREA = [[22000, 22045], [-99960, -99956]];
// 4995950820 
// 391 

const simulate = (vx, vy) => {
	let px = 0, py = 0, wasIn = false;
	let dy = -1, dx = -1
	while (px < AREA[0][1] && py > AREA[1][0]) {
		px += vx;
		py += vy;
		vx += dx;
		--vy;
		if (!vx) dx = 0;
		if ( AREA[0][0] <= px && px <= AREA[0][1] 
			&& AREA[1][0] <= py && py <= AREA[1][1]) {
			return 1;
		}
	}
	return 0;
}

function part1(data) {

	let res1 = 0, res2 = 0;

	const S = n => n * (n + 1) / 2;

	res1 = S(-1 * (min(...AREA[1]) + 1));
	const xs = [], ys = [];
	for (let x = 0; x <= AREA[0][1]; ++x) {
		let dx = x;
		let rx = 0;
		while (dx) {
			rx += dx;
			if (AREA[0][0] <= rx && rx <= AREA[0][1]) {
				xs.push(x);
				break;
			}
			--dx;
		}
	}

	for (let y = AREA[1][0]; y <= -AREA[1][0]; ++y) {
		let dy = y;
		let ry = 0;
		while (dy >= AREA[1][0]) {
			ry += dy;
			if (AREA[1][0] <= ry && ry <= AREA[1][1]) {
				ys.push(y);
				break;
			}
			--dy;
		}
	}

	iter(xs, x => {
		iter(ys, y => {
			res2 += simulate(x, y)
		})
	})

	debug(res1);
	console.log("END OF PART1");
	debug(res2);
	console.log("END OF PART2");

	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("17_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
