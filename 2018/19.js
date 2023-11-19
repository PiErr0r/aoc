
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

	const R = [0, 0, 0, 0, 0, 0];
	const program = [];

	iter(data, line => {
		let [op, ...d] = line.split(' ');
		d = d.map(a => int(a));
		// const [a, b, c] = d;
		program.push([op, ...d]);
	})
	let ip = 0;
	while (ip < program.length) {
		R[ipR] = ip;
		const [op, a, b, c] = program[ip];
		OPS[op](a, b, c, R);
		// debug(`ip=${ip} R=${R} ${op} ${a} ${b} ${c}`)
		ip = R[ipR] + 1;
	}

	res = R[0];

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function hack(data) {
	// the program calculates the sum of divisors of a number in the setup 
	let res;
	data = lines(data);
	const ipR = int(data[0][data[0].length - 1]);
	data = data.slice(1);

	const R = [1, 73, 0, 0, 10551347, 144539];
	const program = [];

	iter(data, line => {
		let [op, ...d] = line.split(' ');
		d = d.map(a => int(a));
		// const [a, b, c] = d;
		program.push([op, ...d]);
	})
	let ip = 3;
	let fst = true, snd = true, trd = true;
	while (ip < program.length) {
		R[ipR] = ip;
		const [op, a, b, c] = program[ip];
		OPS[op](a, b, c, R);
		// debug(`ip=${ip} R=${R} ${op} ${a} ${b} ${c}`)
		ip = R[ipR] + 1;
		if (fst && ip === 3) {
			R[1] = 144539;
			R[5] = 73;
			fst = false;
		} else if (snd && ip === 3) {
			R[1] = 10551347;
			R[5] = 1;
			snd = false;
		} else if (trd && ip === 3) {
			R[1] = 10551347;
			R[5] = 10551347;
			trd = false;
		}
	}

	res = R[0];

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("19_input").toString("utf-8");
	part1(data);
	hack(data)
	// part1(data, 1);
	// part2(data);
	process.exit(0);
}

main();
