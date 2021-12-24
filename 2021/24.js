
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

function part1(data, part) {
	data = groupsWith(data, 'inp');
	const S = new Stack();
	const inp = empty(14);
	iter(data, (d, i) => {
		d = lines(d).map(a => a.split(' '));
		const cond = int(d[5][2]);
		const val = int(d[d.length - 3][2])
		if (cond > 0) {
			S.push([i, val]);
		} else {
			const [ii, eq] = S.pop();
			const dd = abs(cond) - eq;
			const f = 9 + min(dd, 0);
			const s = 9 * 2 - f - abs(dd);
			const mxd = min(s, f) - 1;
			inp[i] = part === 1 ? s : s - mxd;
			inp[ii] = part === 1 ? f : f - mxd;
		}
	});
	let res = inp.join('');

	debug(res);
	console.log("END OF PART1");
	return;
}

function part2(data, part) {
	// solved bu hand

	// in3 + 6 = in4 + 14 => in3 = in4 + 8		: 1 9
	// in5 + 9 = in6 + 7  => in5 = in6 - 2		: 9 7
	// in9 + 1 = in10 + 7 => in9 = in10 + 6		: 3 9
	// in8 + 3 = in11 + 8 => in8 = in11 + 5		: 4 9
	// in7 + 14 = in12 + 7 => in7 = in12 - 7	: 9 2
	// in2 + 5 = in13 + 5 => in2 = in13			: 9 9
	// in1 + 15 = in14 + 10 => in1 = in14 - 1	: 9 4

	// in3 + 6 = in4 + 14 => in3 = in4 + 8		: 1 9
	// in5 + 9 = in6 + 7  => in5 = in6 - 2		: 3 1
	// in9 + 1 = in10 + 7 => in9 = in10 + 6		: 1 7
	// in8 + 3 = in11 + 8 => in8 = in11 + 5		: 1 6
	// in7 + 14 = in12 + 7 => in7 = in12 - 7	: 8 1
	// in2 + 5 = in13 + 5 => in2 = in13			: 1 1
	// in1 + 15 = in14 + 10 => in1 = in14 - 5	: 6 1

	const i = part === 1 
		? [4, 9, 9, 1, 7, 9, 2, 9, 9, 3, 4, 9, 9, 9]
		: [1, 1, 9, 1, 1, 3, 1, 6, 7, 1, 1, 8, 1, 6];
	let z;
	z = (i[1 - 1] + 15);
	z = z * 26 + (i[2 - 1] + 5);
	z = z * 26 + (i[3 - 1] + 6);
	z = !(z % 26 - 14 === i[4 - 1]) ? (floor(z / 26) * 26 + (i[4 - 1] + 7)) : floor(z / 26);
	z = z * 26 + (i[5 - 1] + 9);
	z = !(z % 26 - 7 === i[6 - 1]) ? (floor(z / 26) * 26 + (i[6 - 1] + 6)) : floor(z / 26);
	z = z * 26 + (i[7 - 1] + 14);
	z = z * 26 + (i[8 - 1] + 3);
	z = z * 26 + (i[9 - 1] + 1);
	z = !(z % 26 - 7 === i[10 - 1]) ? (floor(z / 26) * 26 + (i[10 - 1] + 3)) : floor(z / 26);
	z = !(z % 26 - 8 === i[11 - 1]) ? (floor(z / 26) * 26 + (i[11 - 1] + 4)) : floor(z / 26);
	z = !(z % 26 - 7 === i[12 - 1]) ? (floor(z / 26) * 26 + (i[12 - 1] + 6)) : floor(z / 26);
	z = !(z % 26 - 5 === i[13 - 1]) ? (floor(z / 26) * 26 + (i[13 - 1] + 7)) : floor(z / 26);
	z = !(z % 26 - 10 === i[14 - 1]) ? (floor(z / 26) * 26 + (i[14 - 1] + 1)) : floor(z / 26);

	let res = i.join('');
	console.assert(z === 0)
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

	part1(data, 1);
	part1(data, 2);
	part2(data, 1);
	part2(data, 2);
	process.exit(0);
}

main();
