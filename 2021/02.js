
const fs = require('fs');
const { exec } = require("child_process");
const { ord, chr, debug, disp, int, num, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
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

	let res;
	data = parse(data, 'w d');

	let x = 0, depth = 0;

	iter(data)(i => {
		let [move, d] = i;
		if (move === 'forward') {
			x += d;
		} else if (move === 'up') {
			depth -= d;
		} else if (move === 'down') {
			depth += d; 
		}
	})
	res = x * depth;
	debug(res);

	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {


	let res;
	data = parse(data, 'w d');

	let x = 0, depth = 0, aim = 0;

	iter(data)(i => {
		let [move, d] = i;

		if (move === 'forward') {
			x += d;
			depth += aim * d;
		} else if (move === 'up') {
			aim -= d;
		} else if (move === 'down') {
			aim += d;
		}
	})
	res = depth * x;
	debug(res)

	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");

	part1(data);
	part2(data);

}

main();
