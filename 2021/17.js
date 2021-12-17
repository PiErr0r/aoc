
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

const AREA = [[96,125], [-144,-98]];
// const AREA = [[20,30], [-10,-5]]

const simulate = (vx, vy) => {
	let h = 0, px = 0, py = 0, wasIn = false;
	let dy = -1, dx = -1
	while (px < AREA[0][1] && py > AREA[1][0]) {
		px += vx;
		py += vy;
		vx += dx;
		--vy;
		if (!vx) dx = 0;
		h = max(h, py);
		if ( AREA[0][0] <= px && px <= AREA[0][1] 
			&& AREA[1][0] <= py && py <= AREA[1][1]) {
			wasIn = true;
		}
	}
	return [h, px, py, wasIn];
}

function part1(data) {

	let res1 = 0, res2 = 0;

	const S = n => n * (n + 1) / 2;
	const X = x => -1/2 + sqrt(2*x + 1/4);
	const mnx = ceil(X(AREA[0][0]));
	const mxx = floor(X(AREA[0][1]));

	res1 = S(-1 * (min(...AREA[1]) + 1));

	range(-1000, 1000)(vy => {
		range(0, 1000)(vx => {
			const [h, px, py, wasIn] = simulate(vx, vy);
			/* bruteforce p1 */
			// if (wasIn && h > res1) {
			// 	res1 = h;
			// }
			res2 += Number(wasIn)
		})
	});

	debug(res1);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	debug(res2);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
