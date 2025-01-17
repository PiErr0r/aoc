
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
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {

	let res;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	if (res) {
		exec(getExecStr(2021, 23, 1, res));
	}
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 23, 2, res));
	// }
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("23_input").toString("utf-8");

	// sovled by hand with index.html
	part1(data); // 15412
	part2(data); // 52358
	process.exit(0);
}

main();
