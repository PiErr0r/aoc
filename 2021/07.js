
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => {
	arr.sort(fn);
}
const in_ = (a, arr) => arr.indexOf(a) !== -1;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

function part1(data) {

	// median
	const m = data[int(data.length) / 2];

	let res = 0;
	iter(data, i => {
		res += abs(i - m);
	});

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function binSearch(arr, mn, mx, fn = (a, b) => a - b) {
	let l = mn, r = mx;
	while (l <= r) {
		m = Math.floor(l + (r - l) / 2);
		res = fn(m, arr);
		const rl = fn(m - 1, arr), rr = fn(m + 1, arr);
		if (res < rr && res < rl) return m;
		res = sign(rr - rl);
		if (res === 0) {
			return [m, 0];
		} else if (res === -1) {
			l = m + 1;
		} else {
			r = m - 1;
		}
	}
	return m;
}

function bsFn(p, data) {
	return data.reduce((a, c) => {
		const t = abs(c - p);
		a += t * (t + 1) / 2;
		return a;
	}, 0);
}

function part2(data) {

	const mn = data[0];
	const mx = data[data.length - 1];

	let sum = (d) => d.reduce((a, c) => a + c, 0);

	// mean solution
	let mean = floor((sum(data) + 1) / data.length);
	debug(mean);
	// binary search w/ gradient descent solution
	// const m = binSearch(data, mn, mx, bsFn);
	// if (m !== mean)
	// 	debug(m, mean)
	// console.assert(m === mean);
	
	let res = bsFn(mean, data);
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");
	data = ints(data);
	sort(data);
	part1(data);
	part2(data);
	process.exit(0);
}

main();
