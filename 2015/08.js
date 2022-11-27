
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
	data = lines(data)
	// debug(data[0])
	let res1 = 0, res2 = 0, res3 = 0;
	iter(data, s => {
		for (let i = 0; i < s.length; ++i) {
			if (s[i] === "\"") {
				// pass
				res3 += 2;
			} else if (s[i] === '\\') {
				if (s[i+1] === '\"' || s[i+1] === '\\') {
					res3 += 2;
					++res2;
					++i;
				} else if (s[i+1] === 'x') {
					++res3;
					++res2;
					i += 3;
				} else {
					debug("BAD!!!", s[i+1]);
				}
			} else {
				++res2;
			}
		}
		res1 += s.length;
		res3 += s.length;
	})

	debug(res1 - res2);
	console.log("END OF PART1");
	debug(res3 - res1);
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
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
