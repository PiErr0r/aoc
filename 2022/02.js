
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
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const OP = { A: 0, B: 1, C: 2 };
const ME = { X: 0, Y: 1, Z: 2 };

function part1(data) {
	data = parse(data, 'w w')

	let res = 0;
	iter(data, ([op, me]) => {
		const r = mod(ME[me] - OP[op], 3);
		res += ME[me] + 1;
		switch (r) {
			case 0: //draw
				res += 3; break;
			case 1: //win
				res += 6; break;
			case 2: //lose
				break;
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = parse(data, 'w w')

	let res = 0;
	iter(data, ([op, r]) => {
		const me = mod(OP[op] + ME[r] - 1, 3)
		res += me + 1;
		switch (ME[r]) {
			case 1: //draw
				res += 3; break;
			case 2: //win
				res += 6; break;
			case 0: //lose
				break;
		}
	})

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
