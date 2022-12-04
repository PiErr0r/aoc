
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
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
	data = parse(data, 'd-d,d-d');

	let res1 = 0, res2 = 0;
	iter(data, ([x1, y1, x2, y2]) => {
		if (x1 >= x2 && y1 <= y2 || x2 >= x1 && y2 <= y1) ++res1; // @3:15
		if (x1 <= y2 && y1 >= x2)  ++res2; // 8:35
	})


	debug(res1);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
	let data = fs.readFileSync("04_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
