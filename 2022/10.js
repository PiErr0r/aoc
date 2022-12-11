
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

function part1(data) {


	let res = 0;
	let cycle = 0;
	let finish = 1;
	let x = 1;
	let next = 20;
	data = lines(data);
	let di = 0;
	let prev = null;
	while (cycle < 220) {
		cycle += 1;
		if (cycle === finish) {
			if (data[di] === 'noop') {
				finish = cycle + 1;
				x += prev !== null ? prev : 0;
				prev = null;
			} else {
				const val = int(data[di].split(' ')[1]);
				x += prev !== null ? prev : 0;
				prev = val;
				finish = cycle + 2;
			}
			++di;
		}
		if (cycle === next) {
			res += next * x;
			next += 40;
		}
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let cycle = 0;
	let finish = 1;
	let x = 1;
	let next = 40;
	data = lines(data);
	let di = 0;
	let prev = null;
	const img = [];
	const row = [];
	while (cycle < 240) {
		cycle += 1;
		if (x - 1 <= (cycle - 1) % 40 && (cycle - 1) % 40 <= x + 1) {
			row.push('##');
		} else {
			row.push('..');
		}
		if (cycle === finish - 1 && prev !== null) {
			x += prev;
		}
		if (cycle === finish) {
			if (data[di] === 'noop') {
				finish += 1;
				prev = null;
			} else {
				prev = int(data[di].split(' ')[1]);
				finish += 2;
			}
			++di;
		}
		
		if (cycle === next) {
			next += 40;
			img.push([...row].join(''));
			row.length = 0;
		}
	}
	disp(img); // RBPARAGF

	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("10_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
