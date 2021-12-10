
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

	data = lines(data);
	let score = {
    ')': [0, 3],
    ']': [1, 57],
    '}': [2, 1197],
    '>': [3, 25137],
    '(': [0, -1],
    '[': [1, -1],
    '{': [2, -1],
    '<': [3, -1],
	}

	const findStart = (r, i) => {
		let close = Object.keys(score);
		const ind = close.indexOf(r[i]);
		close = close[ind + 4];
		const cnt = empty(4);
		while (i >= 0) {
			const [j, s] = score[ r[i] ];
			if (s === -1) {
				--cnt[j];
				if (r[i] === close && cnt[j] === 0) {
					return i;
				}
			} else {
				++cnt[j];
			}
			--i;
		}
		return 0;
	}

	let res = 0;
	const corr = [];
	iter(data, (row, k) => {
		let cnt = empty(4)
		iter(row, (j, l) => {
			const [ i, s ] = score[j];
			if (s === -1) {
				cnt[i]++
			} else {
				--cnt[i];
					const start = findStart(row, l, j);
					const nem = empty(4);
					iter(row.slice(start, l + 1), col => {
						const [nj, ns] = score[col];
						if (ns === -1) {
							++nem[nj];
						} else {
							--nem[nj];
						}
					});
					if (!nem.every(a => a === 0)) {
						res += s;
						corr.push(k);
						return 1;
					}
			}
		})
	})
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(data, corr)
	return;
}

function part2(data, corr) {

	data = data.filter((_, i) => corr.indexOf(i) === -1);
	debug(data.length)
	let score = {
    ')': [0, 1],
    ']': [1, 2],
    '}': [2, 3],
    '>': [3, 4],
    '(': [0, -1],
    '[': [1, -1],
    '{': [2, -1],
    '<': [3, -1],
	}

	const st = new Stack();
	let tmp = 0;
	const results = [];
	iter(data, row => {
		iter(row, l => {
			const [i, s] = score[l];
			if (s === -1) {
				st.push(l);
			} else {
				st.pop();
			}
		});
		tmp = 0;
		let S = '';
		while (!st.empty()) {
			const curr = st.pop();
			let close = Object.keys(score);
			const ind = close.indexOf(curr);
			close = close[ind - 4];
			S += close;
			const [_, s] = score[close];
			tmp = tmp * 5 + s;
		}
		results.push(tmp);
	})
	sort(results);
	let res = results[floor(results.length / 2)]

	// let res;

	debug(res, results.length / 2);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("10_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
