
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const START = `
                [M]     [W] [M]    
            [L] [Q] [S] [C] [R]    
            [Q] [F] [F] [T] [N] [S]
    [N]     [V] [V] [H] [L] [J] [D]
    [D] [D] [W] [P] [G] [R] [D] [F]
[T] [T] [M] [G] [G] [Q] [N] [W] [L]
[Z] [H] [F] [J] [D] [Z] [S] [H] [Q]
[B] [V] [B] [T] [W] [V] [Z] [Z] [M]
 1   2   3   4   5   6   7   8   9 
`;

// const START = `
//     [D]    
// [N] [C]    
// [Z] [M] [P]
//  1   2   3 
// `

function part1(data) {
	data = parse(data, 'w d w d w d').map(r => [r[1], r[3], r[5]]);
	let tmp = transpose(START.split('\n').map(r => r.split(''))).map(r => r.reverse());
	// debug(tmp[1])
	tmp = tmp.filter(r => r[0] !== ']' && r[0].trim().length > 0)
	tmp = tmp.map(r => r.slice(1)).map(r => r.filter(c => c.trim().length))
	// debug(tmp)
	let res;

	iter(data, row => {
		const [amount, from, to] = row;
		const items = tmp[from - 1].splice(tmp[from - 1].length - amount)/*.reverse()*/;
		tmp[to -1] = [...tmp[to -1], ...items];
		// debug(tmp)
	})
	debug(tmp.map(r => r[r.length - 1]).join(""))

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
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
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
