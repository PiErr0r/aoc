
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

const mx = (data) => {
	const res = {};
	range(data.length)(i => {
		range(data[0].length)(j => {
			if (data[i][j] === 'S') {
				data[i][j] = 'a';
				res.S = [i, j];
			} else if (data[i][j] === 'E') {
				data[i][j] = 'z';
				res.E = [i, j];
			}
		})
	})
	return res;
}

function part1(data) {

	data = table(data);
	const { S, E } = mx(data);

	const q = new Queue();
	q.push([...S, 0]);
	let res;
	while (q.size()) {
		const [y, x, depth] = q.pop();
		if (y === E[0] && x === E[1]) {
			res = depth;
			break;
		}
		iter(D4, ([dy, dx]) => {
			if (inBB(y + dy, x + dx, data) && data[y+dy][x+dx] !== '#') {
				const currOrd = ord(data[y][x]);
				const nOrd = ord(data[y+dy][x+dx]);
				if (nOrd <= currOrd + 1) {
					q.push([y+dy, x+dx, depth + 1]);
				}
			}
		})
		data[y][x] = '#';
	}


	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = table(data);
	const { S, E } = mx(data);

	const q = new Queue();
	q.push([...E, 0]);
	let res;
	while (q.size()) {
		const [y, x, depth] = q.pop();
		if (data[y][x] === '#') {
			continue;
		}
		if (data[y][x] === 'a') {
			res = depth;
			break;
		}
		iter(D4, ([dy, dx]) => {
			if (inBB(y + dy, x + dx, data) && data[y+dy][x+dx] !== '#') {
				const currOrd = ord(data[y][x]);
				const nOrd = ord(data[y+dy][x+dx]);
				if (nOrd === currOrd - 1 || nOrd >= currOrd) {
					q.push([y+dy, x+dx, depth + 1]);
				}
			}
		});
		data[y][x] = '#';
	}

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("12_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
