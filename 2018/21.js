
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

const OPS = {
	addr: (a, b, c, R) => (R[c] = R[a] + R[b]),
	addi: (a, b, c, R) => (R[c] = R[a] + b),
	mulr: (a, b, c, R) => (R[c] = R[a] * R[b]),
	muli: (a, b, c, R) => (R[c] = R[a] * b),
	banr: (a, b, c, R) => (R[c] = R[a] & R[b]),
	bani: (a, b, c, R) => (R[c] = R[a] & b),
	borr: (a, b, c, R) => (R[c] = R[a] | R[b]),
	bori: (a, b, c, R) => (R[c] = R[a] | b),
	setr: (a, b, c, R) => (R[c] = R[a]),
	seti: (a, b, c, R) => (R[c] = a),
	gtir: (a, b, c, R) => (R[c] = a > R[b] ? 1 : 0),
	gtri: (a, b, c, R) => (R[c] = R[a] > b ? 1 : 0),
	gtrr: (a, b, c, R) => (R[c] = R[a] > R[b] ? 1 : 0),
	eqir: (a, b, c, R) => (R[c] = a === R[b] ? 1 : 0),
	eqri: (a, b, c, R) => (R[c] = R[a] === b ? 1 : 0),
	eqrr: (a, b, c, R) => (R[c] = R[a] === R[b] ? 1 : 0),
}

function part1(data) {

	let res;
	data = lines(data);
	const ipR = int(data[0][data[0].length - 1]);
	data = data.slice(1);

	const R = [2525738, 0, 0, 0, 0, 0];
	const program = [];

	iter(data, line => {
		let [op, ...d] = line.split(' ');
		d = d.map(a => int(a));
		// const [a, b, c] = d;
		program.push([op, ...d]);
	})
	let ip = 0;
	const MEMO = new set();
	MEMO.add(R);
	while (ip < program.length) {
		R[ipR] = ip;
		const [op, a, b, c] = program[ip];
		OPS[op](a, b, c, R);
		// debug(`ip=${ip} R=${R} ${op} ${a} ${b} ${c}`)
		ip = R[ipR] + 1;
		MEMO.add(R);
		if (MEMO.size % 1000000 === 0)
			break
			// debug(MEMO.size, R)
	}

	res = R[0];

	// emulate the opcodes with python and get:
	res = 2525738 
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	// and
	res = 11316540
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");

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
	let data = fs.readFileSync("21_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
