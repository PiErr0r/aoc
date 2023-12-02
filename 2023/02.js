
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

const O = { r: 12, g: 13, b: 14 };

function part1(data) {
	// 163 place
	let res = 0;
	data = lines(data);
	iter(data, line => {
		const [g, moves] = line.split(':');
		const id = int(g.split(' ')[1])
		let couldBe = true;
		iter(moves.split(';'), move => {
			const cp = Object.assign({}, O);
			iter(move.split(',').map(a => a.trim()), m => {
				const [n, col] = m.split(' ');
				cp[col[0]] -= int(n);
			})
			if (cp.r < 0 || cp.g < 0 || cp.b < 0) couldBe = false;
		})
		if (couldBe) res += id;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	// 167 place
	let res = 0;
	data = lines(data);
	iter(data, line => {
		const [g, moves] = line.split(':');
		const id = int(g.split(' ')[1])
		const cp = { r: 0, g: 0, b: 0 };
		iter(moves.split(';'), move => {
			iter(move.split(',').map(a => a.trim()), m => {
				const [n, col] = m.split(' ');
				cp[col[0]] = max(cp[col[0]], int(n));
			})
		})
		res += cp.r * cp.g * cp.b
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
