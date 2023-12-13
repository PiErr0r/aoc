
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, manDist, modPow, modPowBig, modInv, mod, prod, prodBig, randint, shoelace, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const mirrors = (rock, pr = -1, pc = -1) => {
	let rr = 0, cc = 0;

	range(rock.length - 1)(i => {
		let isMirror = true;
		range(rock[0].length)(j => {
			let rng = min(i + 1, rock.length - i - 1);
			range(rng)(k => {
				isMirror = rock[i - k][j] === rock[i + k + 1][j];
				return !isMirror;
			})
			return !isMirror;
		});
		if (isMirror) rr = i + 1;
		return rr !== 0 && rr !== pr;
	})

	range(rock[0].length - 1)(i => {
		let isMirror = true;
		range(rock.length)(j => {
			let rng = min(i + 1, rock[0].length - i - 1);
			range(rng)(k => {
				isMirror = rock[j][i - k] === rock[j][i + k + 1];
				return !isMirror;
			})
			return !isMirror;
		});
		if (isMirror) cc = i + 1;
		return cc !== 0 && cc !== pc;
	})
	return [rr === rock.length ? 0 : rr, cc === rock[0].length ? 0 :  cc];
}

function part1(data) {

	let res = 0;
	data = groups(data);
	iter(data, rocks => {
		const [r, c] = mirrors(rocks);
		res += 100 * r + c;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = groups(data).map(g => g.map(r => r.split('')));
	
	iter(data, (rock, ri) => {
		const [rr, cc] = mirrors(rock);
		let found = false;
		range(rock.length)(i => {
			range(rock[0].length)(j => {
				rock[i][j] = rock[i][j] === '.' ? '#' : '.';
				const [r, c] = mirrors(rock, rr, cc)
				if (r !== 0 && r !== rr) {
					res += 100 * r;
					found = true;
				}
				if (c !== 0 && c !== cc) {
					res += c;
					found = true;
				}
				rock[i][j] = rock[i][j] === '.' ? '#' : '.';
				return found;
			})
			return found;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
