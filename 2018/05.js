
var fs = require('fs');
const { ord, chr, debug, disp, int, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
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
	let changes = true;
	while (changes) {
		changes = false;
		let i = 0;
		while (i < data.length - 1) {
			if (abs(ord(data[i]) - ord(data[i+1])) === abs(ord('A') - ord('a'))) {
				data = data.slice(0, i) + data.slice(i + 2);
				changes = true;
				continue;
			}
			++i;
		}
	}

	debug(data.length)

	console.log("END OF PART1");
	return;
}

function part2(_data) {
	let mn = _data.length;

	range(26)(i => {
		data = _data
			.replaceAll(chr(ord('a') + i), '')
			.replaceAll(chr(ord('A') + i), '');
		let changes = true;
		while (changes) {
			changes = false;
			let i = 0;
			while (i < data.length - 1) {
				if (abs(ord(data[i]) - ord(data[i+1])) === abs(ord('A') - ord('a'))) {
					data = data.slice(0, i) + data.slice(i + 2);
					changes = true;
					continue;
				}
				++i;
			}
		}
		if (data.length < mn) {
			mn = data.length;
		}
	})

	debug(mn)

	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");
	// data = data.split('\n');
	// data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
