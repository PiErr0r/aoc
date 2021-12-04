
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

	data = ints(data);

	const spoken = {};
	const limit = 2020;
	let i = 0, curr = null, prev = null;
	while (i < limit) {
		if (i < data.length) {
			curr = data[i];
			if (prev !== null) {
				spoken[ prev[0] ] = prev[1] + 1;
			}
			prev = [curr, i];
			++i;
			continue;
		}

		curr = i - (spoken[prev[0]] ? spoken[prev[0]] : i);
		spoken[prev[0]] = prev[1] + 1;
		prev = [curr, i];
		++i;
	}

	let res = curr;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = ints(data);

	// const spoken = new Map();
	const limit = 30000000;
	const spoken = empty(limit);
	let i = 0, curr = null, prev = null;
	while (i < limit) {
		if (i % 1000000 == 0)
			debug(i)
		if (i < data.length) {
			curr = data[i];
			if (prev !== null) {
				spoken[ prev[0] ] = prev[1] + 1;
			}
			prev = [curr, i];
			++i;
			continue;
		}

		curr = i - (spoken[prev[0]] ? spoken[prev[0]] : i);
		spoken[prev[0]] = prev[1] + 1;
		prev = [curr, i];
		++i;
	}

	let res = curr;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	part2(data);

}

main();
