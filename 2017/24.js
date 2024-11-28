
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

const maxBridge = (data, used, curr) => {
	let mx = 0;
	iter(data, ([f, s], i) => {
		if (used[i]) return;
		if (f === curr) {
			used[i] = true;
			mx = max(mx, f + s + maxBridge(data, used, s));
			used[i] = false;
		}
		if (s === curr) {
			used[i] = true;
			mx = max(mx, f + s + maxBridge(data, used, f));
			used[i] = false;
		}
	})
	return mx;
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%d/%d");
	const used = new Array(data.length).fill(false);

	res = maxBridge(data, used, 0);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const maxBridgeLen = (data, used, curr, length, sm, mx) => {
	iter(data, ([f, s], i) => {
		if (used[i]) return;
		if (f === curr) {
			used[i] = true;
			maxBridgeLen(data, used, s, length + 1, sm + f + s, mx);
			used[i] = false;
		}
		if (s === curr) {
			used[i] = true;
			maxBridgeLen(data, used, f, length + 1, sm + f + s, mx);
			used[i] = false;
		}
	})
	mx[length] = max(mx[length], sm);
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%d/%d");
	const used = new Array(data.length).fill(false);
	const mx = new DD();
	maxBridgeLen(data, used, 0, 0, 0, mx);
	const mxk = max(...keys(mx))
	res = mx[mxk];
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
