
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

function part1(data) {

	let res = '';
	data = table(data);
	let dy = 1, dx = 0;
	let x, y = 0;
	iter(data[0], (sx, i) => {
		if (sx === '|') {
			x = i;
			return true;
		}
	});
	while (true) {
		[y, x] = [y + dy, x + dx];
		if (data[y][x] === '+') {
			iter(D4, ([ndy, ndx]) => {
				if (ndy === -dy && ndx === -dx) return;
				if (inBB(y+ndy, x+ndx, data) && data[y+ndy][x+ndx] !== ' ') {
					dy = ndy;
					dx = ndx;
					return true;
				}
			})
		} else if (data[y][x] === '|' || data[y][x] === '-') {
			// continue
		} else if (data[y][x] === ' ') {
			break;
		} else {
			res += data[y][x];
		}
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	let dy = 1, dx = 0;
	let x, y = 0;
	iter(data[0], (sx, i) => {
		if (sx === '|') {
			x = i;
			return true;
		}
	});
	while (true) {
		[y, x] = [y + dy, x + dx];
		if (data[y][x] === '+') {
			iter(D4, ([ndy, ndx]) => {
				if (ndy === -dy && ndx === -dx) return;
				if (inBB(y+ndy, x+ndx, data) && data[y+ndy][x+ndx] !== ' ') {
					dy = ndy;
					dx = ndx;
					return true;
				}
			})
		} else if (data[y][x] === '|' || data[y][x] === '-') {
			// continue
		} else if (data[y][x] === ' ') {
			++res;
			break;
		} else {
		}
		++res;
	}


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("19_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
