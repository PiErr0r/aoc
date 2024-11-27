
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const compare = G => {
	const { A, B } = G;
	let [a, b] = [bin(A), bin(B)];
	while (a.length < 16) a = '0' + a;
	while (b.length < 16) b = '0' + b;

	let ret = true;
	range(16)(i => {
		if (a[a.length - 1 - i] !== b[b.length - 1 - i]) ret = false;
	})
	return ret;
}

function part1(data) {

	let res = 0;
	// data = scanf(data, "Generator %w starts with %d");
	const G = { A: 634, B: 301 };
	// const G = { A: 65, B: 8921 };
	const F = { A: 16807, B: 48271 };
	const DIV = 2147483647;
	range(40_000_000)(_ => {
	// range(5)(_ => {
		if (_ % 100000 === 0) debug(_)
		iter('AB', g => {
			G[g] = (G[g] * F[g]) % DIV;
		});
		res += compare(G);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	// data = scanf(data, "Generator %w starts with %d");
	const G = { A: 634, B: 301 };
	// const G = { A: 65, B: 8921 };
	const F = { A: 16807, B: 48271 };
	const COND = { A: 4, B: 8 };
	const DIV = 2147483647;
	range(5_000_000)(_ => {
	// range(5)(_ => {
		if (_ % 100000 === 0) debug(_)
		iter('AB', g => {
			G[g] = (G[g] * F[g]) % DIV;
			while (G[g] % COND[g] !== 0) {
				G[g] = (G[g] * F[g]) % DIV;
			}
		});
		res += compare(G);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
