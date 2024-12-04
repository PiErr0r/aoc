
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res = 0;
	data = table(data);
	const XMAS = 'XMAS';
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === 'X') {
				iter(D8, ([dy, dx]) => {
					let xmas = true;
					range(3)(_ => {
						if (!inBB(y+(_+1)*dy, x+(_+1)*dx, data)) {
							xmas = false;
							return;
						}
						if (data[y+(_+1)*dy][x+(_+1)*dx] !== XMAS[_ + 1]) xmas = false;
					})
					res += xmas;
				})
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const MAS = 'MAS';
	data = table(data);
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === 'M') {
				iter(D8, ([dy, dx]) => {
					let mas = true;
					if (dy === 0 || dx === 0) return;
					range(2)(_ => {
						if (!inBB(y+(_+1)*dy, x+(_+1)*dx, data)) {
							mas = false;
							return;
						}
						if (data[y+(_+1)*dy][x+(_+1)*dx] !== MAS[_ + 1]) mas = false;
					})
					if (mas) {
						if (data[y+2*dy][x] === 'M' && data[y][x+2*dx] === 'S' || data[y+2*dy][x] === 'S' && data[y][x+2*dx] === 'M') ++res;
					}
				})
			}
		})
	})
	res /= 2

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("04_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
