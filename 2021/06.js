
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

function part1(data) {


	data = ints(data);
	range(80)(i => {
		let cnt = 0;
		range(data.length)( j => {
			if (!data[j]) {
				++cnt;
				data[j] = 6;
			} else {
				--data[j];
			}
		});
		range(cnt)(j => {
			data.push(8);
		})
	})

	let res = data.length;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = ints(data);
	const F = new Array(9).fill(0);
	iter(data, i => {
		++F[i];
	});

	let res = data.length;
	range(256)(i => {
		if (i === 80) {
			debug(res);
		}
		const Z = F[0];
		range(8)(j => {
			F[j] = F[j+1];
		});
		F[8] = Z;
		F[6] += Z;
		res += Z;
	});

	debug(res);
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	// part1(data);
	part2(data);
	process.exit(0);
}

main();
