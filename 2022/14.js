
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


// 0 is air, 1 is rock, 2 is sand
function part1(data) {
	data = lines(data).map(row => row.split(' -> ').map(pair => parseLine(pair, 'd,d')));
	const S = [100, 0];
	const G = empty(200, 200);
	iter(data, (row) => {
		let [px, py] = [...row[0]];
		iter(row, ([x, y], i) => {
			if (!i) return;
			const dx = x - px > 0 ? 1 : x - px < 0 ? -1 : 0;
			const dy = y - py > 0 ? 1 : y - py < 0 ? -1 : 0;
			while (px !== x + dx || py !== y + dy) {
				G[py][px - 400] = 1;
				px += dx; py += dy;
			}
			px = x; py = y;
		})
	});

	let res = 0;
	OUTER:
	while (true) {
		let [x, y] = [...S];
		let notPlaced = true;
		let OOB = false;
		
		while (notPlaced) {
			let dy = 1;
			let stopped = true;
			iter([0, -1, 1], dx => {
				if (!inBB(y+dy, x+dx, G)) {
					OOB = true;
					return true;
				}
				if (G[y+dy][x+dx] === 0) {
					x += dx; y += dy;
					stopped = false;
					return true;
				}
				return !stopped;
			})
			if (OOB) break OUTER;
			notPlaced = !stopped;
		}
		G[y][x] = 2;
		++res;
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = lines(data).map(row => row.split(' -> ').map(pair => parseLine(pair, 'd,d')));
	const S = [500, 0];
	const G = empty(200, 1000);
	let mxy = 0;
	iter(data, (row) => {
		let [px, py] = [...row[0]];
		iter(row, ([x, y], i) => {
			mxy = max(mxy, y, py)
			if (!i) return;
			const dx = x - px > 0 ? 1 : x - px < 0 ? -1 : 0;
			const dy = y - py > 0 ? 1 : y - py < 0 ? -1 : 0;
			while (px !== x + dx || py !== y + dy) {
				G[py][px] = 1;
				px += dx; py += dy;
			}
			px = x; py = y;
		})
	});
	range(1000)(x => {
		G[mxy + 2][x] = 1;
	})

	let res = 0;
	while (true) {
		let [x, y] = [...S];
		let notPlaced = true;
		let OOB = false;
		
		while (notPlaced) {
			let dy = 1;
			let stopped = true;
			iter([0, -1, 1], dx => {
				if (!inBB(y+dy, x+dx, G)) {
					return true;
				}
				if (G[y+dy][x+dx] === 0) {
					x += dx; y += dy;
					stopped = false;
					return true;
				}
				return !stopped;
			})
			notPlaced = !stopped;
		}
		G[y][x] = 2;
		++res;
		if (x === S[0] && y === S[1]) {
			break;
		}
	}
	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
