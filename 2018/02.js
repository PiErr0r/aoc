
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

	let cnt2 = 0, cnt3 = 0;

	iter(data,i => {
		let arr = new Array(26).fill(0);
		iter(i,j => {
			arr[ord(j) - ord('a')]++;
		});
		let has2 = false, has3 = false;
		iter(arr,j => {

			if (j === 2 && !has2) {
				cnt2++;
				has2 = true;
			}
			if (j === 3 && !has3) {
				cnt3++;
				has3 = true;
			}
		});
	})
	debug(cnt2 * cnt3)
	console.log("END OF PART1");
	return;
}

const diff = (a, b) => {
	let cnt = 0;
	range(a.length)(i => {
		if (a[i] !== b[i]) {
			cnt++;
		}
	})
	return cnt;
}

function part2(data) {

	diter(data,(i, j) => {
		if (i !== j && diff(i,j) === 1) {
			const s1 = new set(i), s2 = new set(j);
			debug([...and(s1,s2)].join(''));
			return true;
		}
	})

	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");
	data = data.split('\n');
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
