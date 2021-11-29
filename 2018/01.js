
var fs = require('fs');
const { ord, chr, debug, disp, int, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
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

	let res = 0;
	let s = new set([res]);

	iter(data)(i => {
		res += eval(i);
	})

	debug(res)

	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	let s = new set([res]);
	let done = false;
	while (!done) {
		iter(data)(i => {
			res += eval(i);
			if (s.has(res)) {
				debug(res)
				done = true;
				return true
			} else {
				s.add(res);
			}
		})
	}

	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("01_input").toString("utf-8");
	data = data.split('\n');
	// data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
