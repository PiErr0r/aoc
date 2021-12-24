
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
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

const isVar = (n) => 'wxyz'.indexOf(n) !== -1;

const ALU = {
    inp: (a, n) => VARS[a] = n,
    add: (a, b) => VARS[a] = VARS[a] + (isVar(b) ? VARS[b] : int(b)),
    mul: (a, b) => VARS[a] = VARS[a] * (isVar(b) ? VARS[b] : int(b)),
    div: (a, b) => {
    	if (!isVar(b) && int(b) === 0 || isVar(b) && VARS[b] === 0) return 0;
    	return VARS[a] = Math.trunc(VARS[a] / (isVar(b) ? VARS[b] : int(b)));
    },
    mod: (a, b) => {
    	if (!isVar(b) && int(b) <= 0 || isVar(b) && VARS[b] <= 0) 
    		return 0;
    	else if (!isVar(a) && int(a) < 0 || isVar(a) && VARS[a] < 0) 
    		return 0
    	return VARS[a] = mod(VARS[a], isVar(b) ? VARS[b] : int(b))
    },
    eql: (a, b) => VARS[a] = Number(VARS[a] === (isVar(b) ? VARS[b] : int(b)))
}
const VARS = { w: 0, x: 0, y: 0, z: 0 };

const subtr = (s, n) => {
	if (!n) return s;
	const tmp = n;
	let i = 0;
	while (n) {
		++i;
		n /= 10;
	}
	return s.slice(0, s.length - i) + (int(s.slice(s.length - i)) - tmp);
}

const resetVars = () => {
	['w', 'x', 'y', 'z'].forEach(k => VARS[k] = 0);
}

function part1(data) {

	data = lines(data);
	// let n = '99992412090984'
	// let n = '99992120248899'
	// let n = '9'.repeat(13) + '3';
	// let n = '9992' + '9'.repeat(10)
	// let n = '12332112332112';
	// let n = '13579246899999';
	let N = '1' + '0'.repeat(5) + '9'.repeat(8);
	// debug(subtr(N, 40000))
	// return
	let res = 1;
	let cnt = 0;
	while (res) {
		let ni = 0;
		let n = subtr(N, cnt);
		resetVars();

		iter(data, (ins, i) => {
			const [op, ...ab] = ins.split(' ');
				// debug(...ab, n[ni])
			if (op === 'inp') {
				ALU[op](...ab, int(n[ni]));
				++ni;
			} else {
				ALU[op](...ab);
			}
			// if (i < 15)
			// debug(op, ...ab, VARS)
		})
		if (cnt % 11111 === 0) {
			debug("iter:", cnt, "n:", n, "res:", res, VARS)
		}
		res = VARS.z;
		++cnt;
	}


	debug('end', res, VARS);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	if (res) {
		exec(getExecStr(2021, 24, 1, res));
	}
	console.log("END OF PART1");
	return;
}

function part2(data, part) {

	// in3 + 6 = in4 + 14 => in3 = in4 + 8 		: 1 9
	// in5 + 9 = in6 + 7  => in5 = in6 - 2 		: 9 7
	// in9 + 1 = in10 + 7 => in9 = in10 + 6 	: 3 9
	// in8 + 3 = in11 + 8 => in8 = in11 + 5 	: 4 9
	// in7 + 14 = in12 + 7 => in7 = in12 - 7 	: 9 2
	// in2 + 5 = in13 + 5 => in2 = in13 			: 9 9
	// in1 + 15 = in14 + 10 => in1 = in14 - 5 : 9 4

	// in3 + 6 = in4 + 14 => in3 = in4 + 8 		: 1 9
	// in5 + 9 = in6 + 7  => in5 = in6 - 2 		: 3 1
	// in9 + 1 = in10 + 7 => in9 = in10 + 6 	: 1 7
	// in8 + 3 = in11 + 8 => in8 = in11 + 5 	: 1 6
	// in7 + 14 = in12 + 7 => in7 = in12 - 7 	: 8 1
	// in2 + 5 = in13 + 5 => in2 = in13 			: 1 1
	// in1 + 15 = in14 + 10 => in1 = in14 - 5 : 6 1

	const inp = part === 1 
		? [0, 4, 9, 9, 1, 7, 9, 2, 9, 9, 3, 4, 9, 9, 9]
		: [0, 1, 1, 9, 1, 1, 3, 1, 6, 7, 1, 1, 8, 1, 6];

	let pz1 = (inp[1] + 15);
	let pz2 = pz1 * 26 + (inp[2] + 5);
	let pz3 = pz2 * 26 + (inp[3] + 6);
	let pz4 = !(pz3 % 26 - 14 === inp[4]) ? (floor(pz3 / 26) * 26 + (inp[4] + 7)) : floor(pz3 / 26);
	let pz5 = pz4 * 26 + (inp[5] + 9);
	let pz6 = !(pz5 % 26 - 7 === inp[6]) ? (floor(pz5 / 26) * 26 + (inp[6] + 6)) : floor(pz5 / 26);
	let pz7 = pz6 * 26 + (inp[7] + 14);
	let pz8 = pz7 * 26 + (inp[8] + 3);
	let pz9 = pz8 * 26 + (inp[9] + 1);
	let pz10 = !(pz9 % 26 - 7 === inp[10]) ? (floor(pz9 / 26) * 26 + (inp[10] + 3)) : floor(pz9 / 26);
	let pz11 = !(pz10 % 26 - 8 === inp[11]) ? (floor(pz10 / 26) * 26 + (inp[11] + 4)) : floor(pz10 / 26);
	let pz12 = !(pz11 % 26 - 7 === inp[12]) ? (floor(pz11 / 26) * 26 + (inp[12] + 6)) : floor(pz11 / 26);
	let pz13 = !(pz12 % 26 - 5 === inp[13]) ? (floor(pz12 / 26) * 26 + (inp[13] + 7)) : floor(pz12 / 26);
	let pz14 = !(pz13 % 26 - 10 === inp[14]) ? (floor(pz13 / 26) * 26 + (inp[14] + 1)) : floor(pz13 / 26);

	let res = inp.slice(1).join('');
	console.assert(pz14 === 0)
	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 24, 2, res));
	// }
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	// part1(data);
	part2(data, 1);
	part2(data, 2);
	process.exit(0);
}

main();
