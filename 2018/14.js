
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res;
	data = int(data);
	let f = [0, 3];
	let s = [1, 7];
	let scores = [3, 7];
	while (scores.length < data + 10) {
		let S = f[1] + s[1];
		let [ff, ss] = [floor(S/10), S % 10];
		if (ff) scores.push(ff);
		scores.push(ss);
		f[0] = (f[0] + f[1] + 1) % scores.length;
		f[1] = scores[f[0]];
		s[0] = (s[0] + s[1] + 1) % scores.length;
		s[1] = scores[s[0]];
	}

	res = scores.slice(data, data + 10).join('');


	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;
	data = data;
	let f = [0, 3];
	let s = [1, 7];
	let scores = [3, 7];
	while (scores.length < data.length 
		|| scores.slice(scores.length - data.length).join('') !== data 
		&& scores.slice(scores.length - data.length - 1, scores.length - 1).join('') !== data
	) {
		let S = f[1] + s[1];
		let [ff, ss] = [floor(S/10), S % 10];
		if (ff) scores.push(ff);
		scores.push(ss);
		f[0] = (f[0] + f[1] + 1) % scores.length;
		f[1] = scores[f[0]];
		s[0] = (s[0] + s[1] + 1) % scores.length;
		s[1] = scores[s[0]];
	}

	if (scores.slice(scores.length - data.length).join('') === data) res = scores.length - data.length;
	else res = scores.length - data.length - 1;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
