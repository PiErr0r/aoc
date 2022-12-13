
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

const isa = (a) => Array.isArray(a);

const cmp = (l, r) => {
	if (isa(l) && isa(r)) {
		let i = 0;
		while (i < l.length) {
			if (i === r.length) return -1;
			const res = cmp(l[i], r[i]);
			if (res !== 0) return res;
			++i;
		}
		return i === r.length ? 0 : 1;
	} else if (!isa(l) && !isa(r)) {
		return l < r ? 1 : l > r ? -1 : 0;
	} else {
		return !isa(l) ? cmp([l], r) : cmp(l, [r]);
	}
}

function part1(data) {

	data = groups(data);
	let res = 0;
	iter(data, ([r1, r2], i) => {
		const tmp = cmp(JSON.parse(r1), JSON.parse(r2));
		if (tmp === 1) {
			res += i + 1;
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = lines(data.replaceAll('\n\n', '\n') + '\n[[2]]\n[[6]]').map(row => JSON.parse(row));
	sort(data, (a, b) => cmp(b, a));
	let res;
	iter(data, (row, i) => {
		if (row.length === 1 && row[0].length === 1 && row[0][0] === 2) {
			res = i + 1;
		} else if (row.length === 1 && row[0].length === 1 && row[0][0] === 6) {
			res *= i + 1;
			return true;
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("13_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
