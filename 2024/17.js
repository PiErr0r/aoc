
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const out = [];
const P = (n) => out.push(n);

const cOP = {
	0: (R) => 0,
	1: (R) => 1,
	2: (R) => 2,
	3: (R) => 3,
	4: (R) => R[0],
	5: (R) => R[1],
	6: (R) => R[2],
	7: (R) => null,
}

const OP = {
	0: (R, l, i) => (R[0] = floor(R[0] / (2 ** cOP[l](R))), i + 2),
	1: (R, l, i) => (R[1] = R[1] ^ l, i + 2),
	2: (R, l, i) => (R[1] = mod(cOP[l](R), 8), i + 2),
	3: (R, l, i) => (R[0] !== 0 ? l : i + 2),
	4: (R, l, i) => (R[1] = R[1] ^ R[2], i + 2),
	5: (R, l, i) => (P(mod(cOP[l](R), 8)), i + 2),
	6: (R, l, i) => (R[1] = floor(R[0] / (2 ** cOP[l](R))), i + 2),
	7: (R, l, i) => (R[2] = floor(R[0] / (2 ** cOP[l](R))),i +  2)
}

function part1(data) {

	let res = 0;
	data = getGroups(data);
	const R = ints(data[0])
	const program = ints(data[1]);

	let i = 0;
	while (i < program.length) {
		i = OP[program[i]](R, program[i+1], i);
	}
	res = out.join(',')

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const run = (program, A) => {
	const R = [A, 0, 0];
	out.length = 0;
	let i = 0;
	while (i < program.length) {
		i = OP[program[i]](R, program[i+1], i);
	}
	return [...out];
}

const cmp = (A, B) => {
	return A.length === B.length && A.every((a, i) => a === B[i]);
}

let RET = null;
const solve = (program, A) => {
	A *= 8;
	let ret = null;
	range(8)(n => {
		const tmp = run(program, A + n);
		if (cmp(tmp, program)) RET = A + n;
		if (cmp(tmp, program.slice(program.length - tmp.length))) {
			solve(program, A + n);
		}
	})
}

function part2(data) {
	let res = 0;
	data = getGroups(data);
	const R = ints(data[0])
	const program = ints(data[1]);

	solve(program, 0);
	res = RET;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("17_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
