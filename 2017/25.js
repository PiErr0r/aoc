
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

const getMachine = () => ({
	state: 'A',
	steps: 12302209,
	machine: {
		A: { 0: [1, 'r', 'B'], 1: [0, 'l', 'D'] },
		B: { 0: [1, 'r', 'C'], 1: [0, 'r', 'F'] },
		C: { 0: [1, 'l', 'C'], 1: [1, 'l', 'A'] },
		D: { 0: [0, 'l', 'E'], 1: [1, 'r', 'A'] },
		E: { 0: [1, 'l', 'A'], 1: [0, 'r', 'B'] },
		F: { 0: [0, 'r', 'C'], 1: [0, 'r', 'E'] }
	}
})

function part1(data) {


	const { state: _state, steps, machine } = getMachine()
	let state = _state;
	const tape = new DD();
	let cursor = 0;

	range(steps)(_ => {
		const [w, m, c] = machine[state][ tape[cursor] ];
		tape[cursor] = w;
		if (m === 'r') ++cursor;
		else --cursor;
		state = c;
	})

	let res = 0;
	iter(values(tape), v => {
		res += v === 1;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
