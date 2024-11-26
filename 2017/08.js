
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

const CMP = {
	'>': (a, b) => a > b,
	'<': (a, b) => a < b,
	'>=': (a, b) => a >= b,
	'<=': (a, b) => a <= b,
	'==': (a, b) => a == b,
	'!=': (a, b) => a != b,
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%w %w %d if %w %$ %d"/*yxr inc 119 if nev != 6*/)
	const D = new DD();
	iter(data, ([reg, dir, n, r, cond, m]) => {
		if (CMP[cond](D[r], m)) {
			switch (dir) {
			case 'inc':
				D[reg] += n;
				break;
			case 'dec':
				D[reg] -= n;
				break
			default:
				console.assert(false);
			}
		}
	});
	res = -MOD;
	iter(keys(D), k => {
		res = max(res, D[k]);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = -MOD;
	data = scanf(data, "%w %w %d if %w %$ %d"/*yxr inc 119 if nev != 6*/)
	const D = new DD();
	iter(data, ([reg, dir, n, r, cond, m]) => {
		if (CMP[cond](D[r], m)) {
			switch (dir) {
			case 'inc':
				D[reg] += n;
				break;
			case 'dec':
				D[reg] -= n;
				break
			default:
				console.assert(false);
			}
		}
		res = max(res, D[reg]);
	});
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
