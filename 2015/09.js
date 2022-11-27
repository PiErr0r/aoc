
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
const { next_permutation } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {
	data = parse(data, 'w w w = d');
	const cities = new set();
	const travel = {};
	iter(data, ([f, _, l, num]) => {
		cities.add(f);
		cities.add(l);
		travel[`${f}-${l}`] = num;
		travel[`${l}-${f}`] = num;
	});
	let res1 = Infinity, res2 = 0;
	const c = [...cities];
	c.sort();
	do {
		let curr = 0;
		range(c.length - 1)(i => {
			curr += travel[`${c[i]}-${c[i+1]}`];
		})
		res1 = min(res1, curr);
		res2 = max(res2, curr);
	} while (next_permutation(c));

	debug(res1);
	console.log("END OF PART1");
	debug(res2)
	console.log("END OF PART2");
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
