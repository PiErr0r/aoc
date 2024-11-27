
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const knotHash = data => {
	const dense = (L) => {
		const res = [];
		let curr = 0;
		range(L.length)(i => {
			if (i && i % 16 === 0) {
				res.push(curr);
				curr = 0;
			}
			curr ^= L[i];
		})
		res.push(curr);
		return res;
	}
	const reverse = (L, curr, n) => {
		const nArr = [];
		range(n)(i => {
			nArr.push(L[(curr + i) % L.length]);
		})
		nArr.reverse();
		range(n)(i => {
			L[(curr + i) % L.length] = nArr[i];
		})
	}
	const paddedHex = n => {
		n = hex(n);
		return n.length === 2 ? n : ('0' + n);
	}

	let res = 0;
	data = data.split('').map(c => ord(c)).concat([17, 31, 73, 47, 23])
	const LIST = new Array(256).fill(0).map((_, i) => i);
	let curr = 0;
	let skip = 0;

	range(64)(_ => {
		iter(data, n => {
			reverse(LIST, curr, n);
			curr = (curr + n + skip) % LIST.length;
			++skip; 
		})
	})
	const nList = dense(LIST);

	res = nList.map(n => paddedHex(n)).join('');
	return res;
}

function part1(data) {

	let res = 0;
	range(128)(i => {
		const hash = knotHash(`${data}-${i}`);
		iter(hash, hx => {
			const n = bin(num(hx, 16));
			iter(n, bit => {
				res += bit === '1';
			})
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const fill = (G, i, j) => {
	const q = new Queue();
	q.push([i, j]);
	while (!q.empty()) {
		const [y, x] = q.pop();
		if (G[y][x] !== '1') continue;
		G[y][x] = '2';
		iter(D4, ([dy, dx]) => {
			if (inBB(y+dy, x+dx, G)) {
				q.push([y+dy, x+dx]);
			}
		})
	}
}

const calcGroups = G => {
	let res = 0;
	drange(G.length)((i, j) => {
		if (G[i][j] === '1') {
			// debug(i, j, res)
			// if (res%100===0) disp(G)
			fill(G, i, j);
			++res;
		}
	})
	return res;
}

function part2(data) {

	let res = 0;
	const G = [];
	range(128)(i => {
		let hash = knotHash(`${data}-${i}`);
		let s = '';
		iter(hash, hx => {
			let n = bin(num(hx, 16));
			while (n.length < 4) {
				n = '0' + n;
			}
			s += n;
		})
		G.push(s.split(''));
	})

	res = calcGroups(G);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
