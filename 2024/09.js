
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
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
	const dataSize = sum(singles(data).map(n => int(n)));
	const DATA = new Array(dataSize).fill(0);
	let iData = 0;
	let id = 0;
	range(data.length)(i => {
		const curr = int(data[i]);
		range(curr)(j => {
			DATA[ iData + j ] = (i % 2 !== 0) ? -1 : id;
		});
		iData += curr;
		if (i % 2 === 0)
			++id;
	})
	let l = 0, r = DATA.length - 1;
	while (l < r) {
		while (l < r && DATA[l] !== -1) ++l;
		while (l < r && DATA[r] === -1) --r;
		while (l < r && DATA[l] === -1 && DATA[r] !== -1) {
			DATA[l] = DATA[r];
			DATA[r] = -1;
			++l;
			--r;
		}
	}
	let i = 0;
	while (i < DATA.length) {
		if (DATA[i] !== -1)
			res += i * DATA[i];
		++i;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const dataSize = sum(singles(data).map(n => int(n)));
	const DATA = new Array(dataSize).fill(0);
	let iData = 0;
	let id = 0;
	range(data.length)(i => {
		const curr = int(data[i]);
		if (i & 1) {

		} else {
		}
		range(curr)(j => {
			DATA[ iData + j ] = (i % 2 !== 0) ? -1 : id;
		});
		iData += curr;
		if (i % 2 === 0)
			++id;
	})

	let r = DATA.length - 1;
	--id;
	while (r > 0) {
		while (DATA[r] !== id) --r;
		let prevR = r;
		while (DATA[r] === id) --r;
		let full = prevR - r;
		let restartL = true;
		let l = 0;
		while (l <= r) {
			while (l <= r && DATA[l] !== -1) ++l;
			const prevL = l;
			while (l <= r && DATA[l] === -1) ++l;
			if (prevR - r <= l - prevL) {
				let i = 0;
				while (i < prevR - r) {
					DATA[prevL + i] = DATA[prevR - i];
					DATA[prevR - i] = -1;
					++i;
				}
				break;
			}
		}
		--id;
	}
	let i = 0;
	while (i < DATA.length) {
		if (DATA[i] !== -1)
			res += i * DATA[i];
		++i;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
