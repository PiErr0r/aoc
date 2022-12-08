
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const seen = (data, i, j, dx, dy) => {
	let curr = data[i][j];
	let y = i, x = j;
	x += dx, y+= dy;
	while (inBB(y, x, data)) {
		if (data[y][x] >= curr) return [false, abs(y-i), abs(x-j)];
		x += dx, y+= dy;
	}
	return [true, abs(y-dy-i), abs(x-dx-j)];
}

function part1(data) {

	data = table(data).map(r => r.map(c => int(c)));
	let res = 0, scene = 0;
	range(data.length)(i => {
		range(data[0].length)(j => {
			if (i === 0 || i === data.length - 1 || j === 0 || j === data[0].length - 1) {
				++res;
				return;
			}
			let mul = 1;
			iter(D4, ([dx, dy]) => {
				const [isSeen, DY, DX] = seen(data, i, j, dx, dy);
				if (isSeen) {
					++res;
				}
				mul *= max(DY, DX);
			})
			scene = max(scene, mul);
		})
	})

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	debug(scene);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

const scene = (data, i, j, dx, dy) => {
	let curr = data[i][j];
	let y = i, x = j;
	let cnt = 0;
	let prevMax = 0;
	x += dx, y+= dy;
	while (inBB(y, x, data)) {
		if (data[y][x] >= curr) return cnt += 1;
		++cnt;
		x += dx, y+= dy;
	}
	return cnt;
}

function part2(data) {
	data = table(data).map(r => r.map(c => int(c)));
	let res = 0;
	range(data.length)(i => {
		range(data[0].length)(j => {
			let mul = 1;
			iter(D4, ([dx, dy]) => {
				mul *= scene(data, i, j, dx, dy);
			});
			res = max(res, mul);
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
