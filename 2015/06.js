
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
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

/* 
before partitioning
569999 
END OF PART1
17836115 
END OF PART2
[Finished in 9.0s]

after partitioning
569999 
END OF PART1
17836115 
END OF PART2
[Finished in 193ms]
*/

const binSearch = (arr, el) => {
	let lo = 0, hi = arr.length;
	while (lo < hi) {
		let mid = lo + ((hi - lo) >> 1);
		if (arr[mid] < el) {
			lo = mid + 1;
		} else if (arr[mid] > el) {
			hi = mid;
		} else {
			return mid;
		}
	}
}

function part1(data) {
	const X = [], Y = [];
	data = parse(data, 'Wd,d w d,d').map(([cmd, x1, y1, _, x2, y2]) => {
		let c = cmd === 'toggle' ? 2 : cmd.slice('turn '.length) === 'on' ? 1 : 0;
		X.push(x1);
		X.push(x2 + 1);
		Y.push(y1);
		Y.push(y2 + 1);
		return [c, x1, x2 + 1, y1, y2 + 1];
	});
	sort(X);
	sort(Y);
	const GRID1 = empty(X.length, Y.length);
	const GRID2 = empty(X.length, Y.length);
	iter(data, ([cmd, x1, x2, y1, y2]) => {
		let i1 = binSearch(X, x1);
		let i2 = binSearch(X, x2);
		let j1 = binSearch(Y, y1);
		let j2 = binSearch(Y, y2);
		range(i1+1, i2+1)(i => {
			range(j1+1, j2+1)(j => {
				switch (cmd) {
				case 0: 
					GRID1[i][j] = 0;
					GRID2[i][j] = max(0, GRID2[i][j] - 1);
					break;
				case 1: 
					GRID1[i][j] = 1;
					GRID2[i][j]++;
					break;
				case 2: 
					GRID1[i][j] = !GRID1[i][j];
					GRID2[i][j] += 2;
					break;
				}
			})
		})
	});
	let res1 = 0, res2 = 0;
	iter(GRID1, (row, x) => {
		iter(row, (col, y) => {
			if (col) {
				const lx = x ? X[x-1] : 0;
				const rx = X[x];
				const ly = y ? Y[y-1] : 0;
				const ry = Y[y];
				res1 += (rx - lx) * (ry - ly);
			}
			if (GRID2[x][y]) {
				const lx = x ? X[x-1] : 0;
				const rx = X[x];
				const ly = y ? Y[y-1] : 0;
				const ry = Y[y];
				res2 += GRID2[x][y] * (rx - lx) * (ry - ly);	
			}
		})
	})
	debug(res1);
	console.log("END OF PART1");
	debug(res2);
	console.log("END OF PART2");

}

function part1xx(data) {

	data = parse(data, 'Wd,d w d,d');
	const GRID = empty(1000, 1000);
	let res = 0;
	iter(data, ([cmd, x1, y1, _, x2, y2]) => {
		range(x1, x2+1)(i => {
			range(y1, y2+1)(j => {
				if (cmd === 'toggle') {
					GRID[i][j] = !GRID[i][j];
				} else {
					[_, on] = cmd.split(' ');
					GRID[i][j] = on === 'on';
				}
			})
		})
	});

	iter(GRID, row => {
		iter(row, col => {
			if (col)
				++res;
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = parse(data, 'Wd,d w d,d');
	const GRID = empty(1000, 1000);
	let res = 0;
	iter(data, ([cmd, x1, y1, _, x2, y2]) => {
		range(x1, x2+1)(i => {
			range(y1, y2+1)(j => {
				if (cmd === 'toggle') {
					GRID[i][j] += 2;
				} else {
					[_, on] = cmd.split(' ');
					GRID[i][j] += on === 'on' ? 1 : -1;
					GRID[i][j] = max(0, GRID[i][j]);
				}
			})
		})
	});

	iter(GRID, row => {
		iter(row, col => {
			res += col;
		})
	})

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
