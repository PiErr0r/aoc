
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const O = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

const score = {
  ')': [3, 1],
  ']': [57, 2],
  '}': [1197, 3],
  '>': [25137, 4],
}

function part1(data) {

	data = lines(data);
	const S = new Stack();
	let res = 0;
	const corr = new Set();
	iter(data, (row, i) => {
		iter(row, c => {
			if (O[c]) {
				S.push(O[c]);
			} else if (c !== S.pop()) {
				corr.add(i);
				res += score[c][0];
				return true;
			}
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(data, corr)
	// part2xx(data, corr)
	return;
}

function part2(data, corr) {

	data = data.filter((_, i) => !corr.has(i));
	let res = 0n, results = [];
	const S = new Stack();
	iter(data, row => {
		iter(row, c => {
			if (O[c]) {
				S.push(O[c]);
			} else {
				console.assert(S.pop() === c);
			}
		})
		res = 0n;
		while (!S.empty()) {
			let c = S.pop();
			res = 5n * res + BigInt(score[c][1]);
		}
		results.push(res);
	})
	let c;
	results.sort((a, b) => ((c = BigInt(a) - BigInt(b)) > 0n ? 1 : c < 0n ? -1 : 0 ))
	res = results[floor(results.length / 2)]
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	// let data = fs.readFileSync("10_input").toString("utf-8");
	let data = fs.readFileSync("10_bigboy").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
