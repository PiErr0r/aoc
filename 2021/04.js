
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

const winner = (b) => {
	let cols = empty(sz), rows = empty(sz);
	b.forEach((row, i) => {
		row.forEach((col, j) => {
			if (col) {
				++cols[j];
				++rows[i];
			}
		})
	});
	return cols.some(a => a === sz) || rows.some(a => a === sz);
}

const sumUnused = (nums, wins) => {
	let res = 0;
	wins.forEach((row, i) => {
		row.forEach((col, j) => {
			if (!col) {
				// debug(nums[i][j])
				res += nums[i][j];	
			}
		})
	});
	return res;
}

let sz;

function part1(data) {

	data = getGroups(data);
	let nums = ints(data.splice(0, 1)[0]);

	data = data.map(d => lines(d).map(a => ints(a)));
	sz = data[0][0].length;
	const boards = data.map(a => a.map(b => new Array(sz).fill(0)));
	let res = 0;

	iter(nums, (i => {
		iter(data, ((board, j) => {
			iter(board, (row, k) => {
				const ind = row.indexOf(i);
				if (ind === -1) {
					return;
				}
				boards[j][k][ind] = 1;
				if (winner(boards[j]) && !res) {
					res = i * sumUnused(board, boards[j]);
					return res;
				}
			})
			return res;
		}))
		return res;
	}))

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = getGroups(data);
	let nums = ints(data.splice(0, 1)[0]);

	data = data.map(d => lines(d).map(a => ints(a)));
	sz = data[0][0].length;
	const boards = data.map(a => a.map(b => new Array(sz).fill(0)));
	const boardsGame = new Set(empty(data.length).map((_, i) => i));
	let res = 0;

	iter(nums, (i => {
		iter(data, ((board, j) => {
			if (!boardsGame.has(j)) return;
			iter(board, (row, k) => {
				const ind = row.indexOf(i);
				if (ind === -1) {
					return;
				}
				boards[j][k][ind] = 1;

				if (winner(boards[j]) && !res) {
					boardsGame.delete(j);
				}
				
				if (boardsGame.size === 0) {
					res = i * sumUnused(board, boards[j]);
					return res;
				}
			})
			return res;
		}))
		return res;
	}))

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("04_input").toString("utf-8");

	part1(data);
	part2(data);

	debug("BIGBOY");

	let dataBB = fs.readFileSync("04_bigboy").toString("utf-8");
	part1(dataBB);
	part2(dataBB);
	process.exit(0);
}

main();
