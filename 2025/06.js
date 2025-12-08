
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle, rangeOverlap } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { binSearch, Counter, DD, empty, FastQueue, PriorityQueue, Queue, RBTree, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const OPS = {
	'+': (a, b) => a + b,
	'*': (a, b) => a * b,
}

const ID = {
	'+': 0,
	'*': 1,
}

const columns = data => {
	const ops = data.splice(data.length - 1, 1)[0].split(' ').filter(c => c.length);
	const nData = data.map(r => r.split(' ').filter(c => c.length).map(c => int(c)));
	return [nData, ops]
}

function part1(data) {

	let res = 0;
	data = lines(data);
	let ops;
	[data, ops] = columns(data);
	range(data[0].length)(i => {
		const op = OPS[ops[i]];
		const id = ID[ops[i]];
		let curr = id;
		range(data.length)(j => {
			curr = op(curr, data[j][i])
		})
		res += curr;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const columns2 = data => {
	const ops = data.splice(data.length - 1, 1)[0].split(' ').filter(c => c.length);
	const nData = transpose(data.map(r => r.split(''))).map(r => r.join('').replace(/ /g, '')).map(c => c ? int(c) : null);
	return [nData, ops]
}

function part2(data) {

	let res = 0;
	let ops;
	[data, ops] = columns2(lines(data));
	let di = 0;
	iter(ops, opS => {
		const op = OPS[opS];
		const id = ID[opS];
		let curr = id;
		while (di < data.length && data[di] !== null) {
			curr = op(curr, data[di++]);
		}
		++di;
		res += curr;
	})
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
