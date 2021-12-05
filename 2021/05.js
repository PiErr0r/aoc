
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

const getxy = (x, y) => `${x}-${y}`;

function part1(data) {

	data = parse(data, 'd,d -> d,d');
	const used = {};
	iter(data, row => {
		let [x1, y1, x2, y2] = row;
		if (x1 !== x2 && y1 !== y2) return;

		const dx = sign(x2 - x1);
		const dy = sign(y2 - y1);
		for (let x = x1, y = y1; x !== (x2 + dx) || y !== (y2 + dy); x += dx, y += dy) {
			const k = getxy(x, y);
			used[k] = Number(~~used[k]) + 1;
		}
	});

	let res = 0;
	for (let k in used) {
		if (used[k] > 1) {
			++res;
		}
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = parse(data, 'd,d -> d,d');
	const used = {};
	iter(data, row => {
		let [x1, y1, x2, y2] = row;
		
		const dx = sign(x2 - x1);
		const dy = sign(y2 - y1);
		for (let x = x1, y = y1; x !== (x2 + dx) || y !== (y2 + dy); x += dx, y += dy) {
			const k = getxy(x, y);
			used[k] = Number(~~used[k]) + 1;
		}
	});

	let res = 0;
	for (let k in used) {
		if (used[k] > 1) {
			++res;
		}
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0)
}

main();
