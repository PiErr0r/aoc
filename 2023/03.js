
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

const digs = '0123456789';

const findNum = (data, y, x) => {
	let l = x;
	while (x < data[0].length && in_(data[y][x], digs)) ++x;
	let r = x;
	const num = int(data[y].slice(l, r).join(''))
	range(l, r)(i => (data[y][i] = '.', 0))

	if (inBB(y, l-1, data) && data[y][l-1] !== '.' || inBB(y, r, data) && data[y][r] !== '.' ) {
		return num;
	}
	let isNum = false;
	range(l - 1, r + 1)(i => {
		if (inBB(y - 1, i, data) && !in_(data[y-1][i], digs) && data[y-1][i] !== '.') isNum = true;
		if (inBB(y + 1, i, data) && !in_(data[y+1][i], digs) && data[y+1][i] !== '.') isNum = true;
		return isNum;
	})
	if (isNum) return num;
	return 0;
}

function part1(data) {

	let res = 0;
	data = table(data);
	range(data.length)( y => {
		range(data[0].length)( x => {
			if (in_(data[y][x], digs)) {
				res += findNum(data, y, x);
			}
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const getNum = (data, y, x) => {
	while (in_(data[y][x], digs)) --x;
	++x;
	let l = x;
	while (in_(data[y][x], digs)) ++x;
	return int(data[y].slice(l, x).join(''));
}

const findGear = (data, y, x) => {
	let nums = [];
	iter(D8, ([dy, dx]) => {
		if (in_(data[y+dy][x+dx], digs)) {
			nums.push(getNum(data, y+dy, x+dx));
		}
	})
	// assume there is no gear with same numbers
	nums = [...new set(nums)]
	if (nums.length === 2) return prod(nums);
	return 0;
}

function part2(data) {

	let res = 0;
	data = table(data);

	range(data.length)( y => {
		range(data[0].length)( x => {
			if (data[y][x] === '*') {
				res += findGear(data, y, x);
			}
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
