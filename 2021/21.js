
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {

	data = lines(data);
	const p1 = int(data[0].split(' ')[4]);
	const p2 = int(data[1].split(' ')[4]);
	let res;
	const score = [0, 0];
	const pos = [p1, p2];
	let die = 1;
	let p = 0;
	let cnt = 0;
	while (score.every(s => s < 1000)) {
		let r = 0;
		range(3)(i => {
			r += (die + i - 1) % 100 + 1;
		});
		pos[p] = (pos[p] - 1 + r) % 10 + 1;
		score[p] += pos[p];
		die = (die - 1 + 3) % 100 + 1;
		cnt += 3;
		p = (p + 1) % 2;
	}
	
	res = min(...score) * cnt;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 21, 1, res));
	// }
	console.log("END OF PART1");
	return;
}

// TODO
// write lru_cache for functions like these
const MEMO = {};
const solve = (p1, p2, s1 = 0, s2 = 0) => {
	const wins = [0n, 0n];
	trange(3)((...rolls) => {
		np1 = (p1 + sum(rolls) + 3 - 1) % 10 + 1;
		if (s1 + np1 >= 21) {
			wins[0] += 1n;
		} else {
			let dp1, dp2;
			if (MEMO[[p2, np1, s2, s1+np1]]) {
				[dp2, dp1] = MEMO[[p2, np1, s2, s1+np1]];
			} else {
				[dp2, dp1] = solve(p2, np1, s2, s1+np1);
			}
			wins[0] += dp1;
			wins[1] += dp2;
		}
	});
	MEMO[[p1, p2, s1, s2]] = wins;
	return wins;
}

function part2(data) {

	data = lines(data);
	const p1 = int(data[0].split(' ')[4]);
	const p2 = int(data[1].split(' ')[4]);
	const tmp = solve(p1, p2);
	let res = tmp[0] > tmp[1] ? tmp[0] : tmp[1];

	debug(res);

	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 21, 2, res));
	// }
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("21_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
