
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

function part1(data) {
 	// 7:12 (20)
	data = lines(data).map(r => ints((r.split('').join(','))));
	let res = 0;

	range(100)(i => {
		const q = [];
		let ii = 0;
		for (let i = 0; i < data.length; ++i) {
			for (let j = 0; j < data[0].length; ++j) {
				++data[i][j];
				if (data[i][j] > 9) {
					q.push([i, j]);
				}
			}
		}

		while (ii < q.length) {
			const [y, x] = q[ii];
			++ii;
			++res;
			data[y][x] = 0;
			iter(D8, d => {
				const [dx, dy] = d;
				let nx = x + dx;
				let ny = y + dy;
				if (inBB(ny, nx, data)) {
					if (data[ny][nx] > 9 || data[ny][nx] === 0) {
						return;
					}
					++data[ny][nx];
					if (data[ny][nx] > 9) {
						q.push([ny, nx]);
					}
				}
			})
		}
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	// 07:26 (14 min [34 min total])
	data = lines(data).map(r => ints((r.split('').join(','))));
	let res = 0;
	const q = new Queue();
	let cnt = 0;
	let flashes = 0;
	while (true) {
		const q = [];
		let ii = 0;

		flashes = 0;
		for (let i = 0; i < data.length; ++i) {
			for (let j = 0; j < data[0].length; ++j) {
				++data[i][j];
				if (data[i][j] > 9) {
					++flashes;
					q.push([i, j]);
				}
			}
		}

		while (ii < q.length) {
			const [y, x] = q[ii];
			++ii;
			++res;
			data[y][x] = 0;
			iter(D8, d => {
				const [dx, dy] = d;
				let nx = x + dx;
				let ny = y + dy;
				if (inBB(ny, nx, data)) {
					if (data[ny][nx] > 9 || data[ny][nx] === 0) {
						return;
					}
					++data[ny][nx];
					if (data[ny][nx] > 9) {
						++flashes;
						q.push([ny, nx]);
					}
				}
			})
		}
		
		if (flashes === (data.length * data[0].length)) {
			res = cnt + 1;
			break;
		}
		++cnt;
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	// let data = fs.readFileSync("11_input").toString("utf-8");
	let data = fs.readFileSync("11_bigboy").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
