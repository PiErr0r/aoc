
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res = 0;
	let steps;
	[steps, data] = groups(data);

	let curr = 'AAA';
	let mapp = {};
	iter(data, line => {
		const [c, L, R] = scanf(line, '%w = (%w, %w)')[0];
		mapp[c] = {L, R};
	})
	let i = 0;
	steps = steps[0]
	const sl = steps.length;
	while (true) {
		if (curr === 'ZZZ') break;
 		curr = mapp[ curr ][ steps[i%sl] ];
		++i;
	}
	res = i
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	let steps;
	[steps, data] = groups(data);

	let mapp = {};
	iter(data, line => {
		const [c, L, R] = scanf(line, '%w = (%w, %w)')[0];
		mapp[c] = {L, R};
	})
	let currs = keys(mapp).filter(a => a[2] === 'A');
	steps = steps[0]
	const tmp = [];
	iter(currs, curr => {
		let i = 0;
		const sl = steps.length;
		while (true) {
			if (curr[2] === 'Z') break;
	 		curr = mapp[ curr ][ steps[i%sl] ];
			++i;
		}
		tmp.push(i);
	})
	res = tmp.reduce((acc, curr) => lcm(acc, curr), 1)
	
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
