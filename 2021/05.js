
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
	let mxx = 0, mxy = 0;
	iter(data, (row) => {
		let [x1, y1, x2, y2] = row;
		mxx = max(mxx, x1, x2);
		mxy = max(mxy, y1, y2);
	})

	let res1 = 0, res2 = 0, is1;
	const used1 = empty(mxy + 1).map(_ => new Uint8Array(mxx + 1).fill(0));
	const used2 = empty(mxy + 1).map(_ => new Uint8Array(mxx + 1).fill(0));
	iter(data, (row, cnt) => {
		let [x1, y1, x2, y2] = row;
		// if (x1 !== x2 && y1 !== y2) return;
		is1 = !(x1 !== x2 && y1 !== y2);
		const dx = sign(x2 - x1);
		const dy = sign(y2 - y1);
		for (let x = x1, y = y1; x !== (x2 + dx) || y !== (y2 + dy); x += dx, y += dy) {
			if (++used2[y][x] === 2) {
				++res2;
			}
			if (is1 && ++used1[y][x] === 2) {
				++res1;
				// ++res2;
			}
			// res2 += (++used[y][x] === 2);
			// res1 += !is1 && used[y][x] === 2;
		}
	});

	debug(res1);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// console.log("END OF PART1");
	debug(res2);
	// console.log("END OF PART2");
	return;
}

function part2(data) {

	data = parse(data, 'd,d -> d,d');
	let mxx = 0, mxy = 0
	iter(data, (row) => {
		let [x1, y1, x2, y2] = row;
		mxx = max(mxx, x1, x2);
		mxy = max(mxy, y1, y2);
	})

	const used = empty(mxy + 1).map(_ => new Uint8Array(mxx + 1).fill(0));
	let res = 0;
	iter(data, (row, cnt) => {
		let [x1, y1, x2, y2] = row;
		
		const dx = sign(x2 - x1);
		const dy = sign(y2 - y1);
		for (let x = x1, y = y1; x !== (x2 + dx) || y !== (y2 + dy); x += dx, y += dy) {
			res += (++used[y][x] === 2);
		}
	});

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	// part2(data);
	// process.exit(0)

	debug("BIGBOY");

	for (let i = 1; i <= 2; ++i) {
		console.time("BB"+i)
		let dataBB = fs.readFileSync("05_bigboy_" + i).toString("utf-8");

		part1(dataBB);
		// part2(dataBB);
		console.timeEnd("BB"+i)
	}


	process.exit(0)
}

main();
