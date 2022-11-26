
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

const vowels3 = (s) => {
	const V = 'aeiou';
	let r = 0;
	iter(s.split(''), l => {
		if (V.indexOf(l) !== -1) ++r;
	});
	return r >= 3;
}

const twice = (s) => {
	let r = false;
	range(s.length - 1)(i => {
		if (s[i] === s[i + 1]) {
			r = true;
		}
		return r;
	});
	return r;
}

const notBad = (s) => {
	const bad = ['ab', 'cd', 'pq','xy'];
	return bad.every(b => s.indexOf(b) === -1);
}

function part1(data) {

	data = words(data)
	let res = 0;

	iter(data, s => {
		if (vowels3(s) && twice(s) && notBad(s))
			++res;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const pairTwice = (s) => {
	for (let i = 0; i < s.length - 1; ++i) {
		if (s.slice(0, i).indexOf(s.slice(i, i+2)) !== -1 || s.slice(i + 2).indexOf(s.slice(i, i+2)) !== -1) {
			return true;
		}
	}
	return false;
}

const between = (s) => {
	let r = false;
	range(s.length - 2)(i => {
		if (s[i] === s[i+2]) {
			r = true;
		}
		return r
	});
	return r;
}

function part2(data) {

	let res = 0;
	data = words(data);
	iter(data, s => {
		if (between(s) && pairTwice(s)) {
			++res;
		} 
	})

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
