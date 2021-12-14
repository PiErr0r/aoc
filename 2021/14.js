
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { DD, empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const getRes = (pairs) => {
	let R = empty(26);
	Object.keys(pairs).forEach((p, j) => {
		if (j === 0) {
			R[ord(p[0]) - ord('A')] += pairs[p];
		}
		R[ord(p[1]) - ord('A')] += pairs[p];
	})

	R = R.filter(a => a);
	sort(R);
	console.log(R[R.length - 1] - R[0]);
}

const getPairs = (poly, pairs) => {
	let i = 1;
	while (i < poly.length) {
		const curr = poly.slice(i - 1, i + 1);
		pairs[curr]++;
		i += 1;
	}
}

function part1(data) {

	data = getGroups(data);
	let poly = data[0];
	const changes = parse(data[1], 'w -> w').reduce((a, c) => {
		a[c[0]] = c[1];
		return a;
	}, {});

	let R = empty(26);

	let pairs = DD(0);
	getPairs(poly, pairs)

	range(40)(_ => {
		if (_ === 10) {
			getRes(pairs);
			console.log("END OF PART1");
		}
		const parr = Object.keys(pairs);
		const nPairs = DD(0);

		parr.forEach(p => {
			const c = changes[p];
			nPairs[p[0] + c] += pairs[p];
			nPairs[c + p[1]] += pairs[p];
		})
		pairs = nPairs;
	});
	getRes(pairs)

	// debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
