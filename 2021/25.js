
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

function part1(data) {

	data = lines(data).map(l => l.split(''));

	let hasMoved = true;
	let cnt = 0;
	while(hasMoved) {
		hasMoved = false;
		const nData = copy(data);
		iter(data, (r, i) => {
			iter(r, (c, j) => {
				if (c === '>' && (inBB(i, j + 1, data) ? data[i][j + 1] : data[i][0]) === '.') {
					hasMoved = true;
					nData[i][j] = '.';
					if(inBB(i, j + 1, data)) {
						nData[i][j + 1] = '>';
					} else {
						nData[i][0] = '>';
					}
				}
			})
		})

		data = copy(nData)
		iter(data, (r, i) => {
			iter(r, (c, j) => {
				if (c === 'v' && (inBB(i + 1, j, data) ? data[i + 1][j] : data[0][j]) === '.') {
					hasMoved = true;
					nData[i][j] = '.';
					if(inBB(i + 1, j, data)) {
						nData[i + 1][j] = 'v';
					} else {
						nData[0][j] = 'v';
					}
				}
			})
		})
		data = copy(nData)
		++cnt;
	}

	let res = cnt;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
