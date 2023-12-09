
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
	data = lines(data).map(l => ints(l));
	const H = [];
	iter(data, r => {
		let last = [r[r.length - 1]]
		while (!r.every(a => a === 0)) {
			let ns = [];
			range(r.length - 1)(i => {
				ns.push(r[i + 1] - r[i]);
			})
			last.push(ns[ns.length - 1]);
			r = ns;
		}
		last.reverse();

		let rr = 0;
		iter(last, ll => {
			rr += ll;
		})
		H.push(rr);
	})
	res = sum(H)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data).map(l => ints(l));
	const H = [];
	iter(data, r => {
		let first = [r[0]]
		while (!r.every(a => a === 0)) {
			let ns = [];
			range(r.length - 1)(i => {
				ns.push(r[i + 1] - r[i]);
			})
			first.push(ns[0]);
			r = ns;
		}
		first.reverse();

		let rr = 0;
		iter(first, ll => {
			rr = ll - rr;
		})
		H.push(rr);
	})
	res = sum(H)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
