
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => arr.sort(fn);
const in_ = (a, arr) => arr.indexOf(a) !== -1;
const inBB = (row, col, data) => 0 <= row && row < data.length && 0 <= col && col < data[0].length;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const is_small = (data, i, j) => {
	let res = true;
	// debug(data[0])
	let x, y;
	for (let d of D4) {
		const [dx, dy] = d;
		y = i + dy;
		x = j + dx;
		if (!inBB(y, x, data)) continue;
		res &= data[i][j] < data[y][x];
	}
	return res;
}

function part1(data) {

	data = lines(data).map(a => a.split('').map(b => int(b)));
	let res = 0;
	const basins = [];
	iter(data, (row, i) => {
		iter(row, (c, j) => {
			if (is_small(data, i, j)) {
				res += c + 1;
				basins.push([i, j]);
			}
		})
	});

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(data, basins);
	return;
}

const dfs = (data, i, j) => {
	const q = new Queue();
	q.push([i, j]);
	let cnt = 0, nx, ny;
	while (q.size()) {
		const [x, y] = q.pop();
		if (data[y][x] >= 9) {
			continue;
		} 
		++cnt;
		for (let d of D4) {
			const [dx, dy] = d;
			ny = y + dy;
			nx = x + dx;
			if (!inBB(ny, nx, data)) continue;
			q.push([nx, ny]);
		}
		data[y][x] = 9;
	}
	return cnt;
}

function part2(data, basins) {

	let res = 1;

	let fill = 10;
	const sizes = empty(3);
	iter(basins, b => {
		let sz = dfs(data, b[1], b[0]);
		const mn = min(...sizes);
		if (sz > mn) {
			const i = sizes.indexOf(mn);
			sizes[i] = sz;
		}
	})
	res = sizes[0] * sizes[1] * sizes[2];

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	process.exit(0);
}

main();
