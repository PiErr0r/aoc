
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

const [R, U, L, D] = D4;
const DIR = { R, U, L, D };

const mandist = (A, B) => {
	return abs(A[0] - B[0]) + abs(A[1] - B[1]);
}

const calcHT = (H, T, dx, dy) => {
	const HP = [...H];
	H[0] += dy, H[1] += dx;
	const MD = mandist(H, T);
	if (MD === 2) {
		if (H[0] === T[0]) {
			T[1] += dx;
		} else if (H[1] === T[1]) {
			T[0] += dy;
		}
	} else if (MD > 2) {
		T = [...HP];
	}
	return [H, T]
}

const calcTail = (T) => {
	let i = 1;
	while (i < T.length) {
		const TD = mandist(T[i], T[i-1]);
		let dx = T[i-1][1] - T[i][1];
		let dy = T[i-1][0] - T[i][0];
		let sdx = sign(dx), sdy = sign(dy);
		if (TD === 2) {
			if (T[i-1][0] === T[i][0]) {
				T[i][1] += sdx * (abs(dx)-1);
			} else if (T[i-1][1] === T[i][1]) {
				T[i][0] += sdy * (abs(dy)-1);
			}
		} else if (TD > 2) {
			T[i][0] += sdy * min(abs(dy), 1);
			T[i][1] += sdx * min(abs(dx), 1);
		}	
		++i;
	}
}

function part1(data) {
	data = parse(data, 'w d');
	let H = [0, 0], T = [0, 0];
	const visited = new set();
	visited.add(T);

	iter(data, ([dir, val]) => {
		const [dy, dx] = DIR[dir];
		let cnt = 0;
		// debug(dir, val)
		while (cnt < val) {
			[H, T] = calcHT(H, T, dx, dy)
			visited.add(T)
			++cnt;
		}
	})

	let res = visited.size;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = parse(data, 'w d');
	let H = [0, 0], T = empty(9).map(_ => [0, 0]);
	const visited = new set();
	visited.add([0,0]);

	iter(data, ([dir, val]) => {
		const [dy, dx] = DIR[dir];
		let cnt = 0;
		let tmp;
		while (cnt < val) {
			[H, tmp] = calcHT(H, T[0], dx, dy)
			T[0] = tmp;
			calcTail(T);
			visited.add(T[8])
			++cnt;
		}
	})
	res = visited.size;
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
