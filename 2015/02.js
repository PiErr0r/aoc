
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
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {

	let res = 0;
	data = parse(data, 'dxdxd')
	iter(data, ([l, w, h]) => {
		let a = max(l, w, h);

		res += 2 * (l*w + l*h + h*w) + floor(l * w * h / a);
	})
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = parse(data, 'dxdxd')
	iter(data, ([l, w, h]) => {
		let a = max(l, w, h);
		let around = 2 * (l + w + h - a);
		let bow = l * w * h;
		res += around + bow;
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
