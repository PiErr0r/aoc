
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

const getWindow = (img, i, j, tick) => {
	let res = '';
	range(i-1,i+2)(y => {
		range(j-1, j+2)(x => {
			const curr = inBB(y, x, img) ? img[y][x] : tick & 1 ? '#' : '.';
			res += curr;
		})
	})
	let two = 1;
	// debug(i, j, res, res.split('').reverse().reduce((a, c) => {
	// 	if (c === '#') {
	// 		a += two;
	// 	}
	// 	two <<= 1;
	// 	return a;
	// }, 0))
	// disp(img.slice(i - 1, i+2).map(r => r.slice(j - 1, j + 2)));
	// two = 1;
	return res.split('').reverse().reduce((a, c) => {
		if (c === '#') {
			a += two;
		}
		two <<= 1;
		return a;
	}, 0);
}

function part1(data, part) {

	data = getGroups(data);
	// const algo = lines(data[0].trim()).join();
	const algo = data[0].trim();
	const tmp = lines(data[1]).map(a => a.split(''));
	let res = 0;
	let img = [];
	const sz = 100;
	range(sz + tmp.length)(i => {
		if (sz/2 <= i && i < sz/2 + tmp.length) {
			img.push(empty(sz/2)
				.map(a => '.')
				.concat(tmp[i - sz/2])
				.concat(empty(sz/2).map(a => '.'))
			);
		} else {
			img.push(empty(sz + tmp.length).map(a => '.'));
		}
	})

	range(part === 1 ? 2 : 50)(_ => {
		const nImg = copy(img);
		range(img.length)(i => {
			range(img[0].length)(j => {
				const B = getWindow(img, i, j, algo[0] === '#' ? _ : 0);
				nImg[i][j] = algo[B];
			})
		})
		img = nImg;
	})

	iter(img, r => {
		iter(r, c => {
			if (c === '#') {
				++res;
			}
		})
	})

	debug(res)
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	if (res) {
		exec(getExecStr(2021, 20, 1, res));
	}
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 20, 2, res));
	// }
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data, 1);
	part1(data, 2);
	// part2(data);
	process.exit(0);
}

main();
