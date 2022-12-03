
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

function part1(data) {
	data = lines(data)
	let res = 0;;
	iter(data, row => {
		let fst = row.slice(0, int(row.length / 2));
		let snd = row.slice(int(row.length / 2));
		let diff = set.and(fst, snd);
		const L = [...diff][0];
		if ('a' <= L && L <='z') {
			res += ord(L) - ord('a') + 1;
		} else {
			res += ord(L) - ord('A') + 27; 
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = lines(data);
	let res = 0;
	range(0, data.length, 3)(i => {
		let diff = set.and(data[i], set.and(data[i+1], data[i+2]));
		let L = [...diff][0];
		if ('a' <= L && L <='z') {
			res += ord(L) - ord('a') + 1;
		} else {
			res += ord(L) - ord('A') + 27; 
		}
	})

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
