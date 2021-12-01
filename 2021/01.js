
const fs = require('fs');
const { exec } = require("child_process");
const { ord, chr, debug, disp, int, num, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
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

	let res = 0 ;
	let prev = 1e9;
	iter(data)(i => {
		if (i > prev) {
			++res;
		}
		prev = i
	})
	debug(res)
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	let sums = [];
	let cnts = [];
	iter(data)(i => {
		cnts.push(0);
		sums.push(0);

		range(max(cnts.length - 3, 0), cnts.length)(j => {
			if (cnts[j] < 3) {
				sums[j] += i;
			}
			cnts[j]++;
		});
	});
	
	let prev = 1e9;
	iter(sums)(i => {
		if (i > prev) {
			++res;
		}
		prev = i;
	});

	debug(res)

	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("01_input").toString("utf-8");
	// data = data.split('\n');
	data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
