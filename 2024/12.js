
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const getRegion = (data, i, j) => {
	const c = data[i][j];
	const q = new Queue();
	q.push([i, j]);
	const seen = new set();
	while (!q.empty()) {
		const [y, x] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (data[y+dy][x+dx] !== c) return;
			if (seen.has([y+dy, x+dx])) return;
			q.push([y+dy, x+dx]);
		})
	}
	return seen;
}

function part1(data) {

	let res = 0;
	data = table(data);
	range(data.length)(i => {
		range(data[i].length)(j => {
			if (data[i][j] === '#') return;
			const c = data[i][j];
			const coords = getRegion(data, i, j);
			let A = 0, P = 0;
			const nData = copy(data);
			iter(coords, ([y, x]) => {
				nData[y][x] = '#';
				A++;
				iter(D4, ([dy, dx]) => {
					if (!inBB(y+dy, x+dx, data) || data[y+dy][x+dx] !== c) P++;
				})
			})
			res += A * P;
			data = nData;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const right = (dy, dx) => [dx, -dy];

const DDOT = [[0, 0], [-1, -1], [-1, 0], [0, -1]];

const getSides = (coords) => {
	let mny = MOD, mnx = MOD;
	let mxy = 0, mxx = 0;
	iter(coords, ([y, x]) => {
		mny = min(mny, y);
		mnx = min(mnx, x);
		mxy = max(mxy, y);
		mxx = max(mxx, x);
	});

	let S = 0;
	range(mny, mxy + 2)(y => {
		range(mnx, mxx + 2)(x => {
			let cnt = 0;
			const SS = new DD();
			iter(DDOT, ([dy, dx], i) => {
				if (coords.has([y+dy, x+dx])) {
					++cnt;
					SS[i]++;
				}
			}) 
			if (cnt === 1 || cnt === 3) ++S;
			else if (cnt === 2) {
				if (SS[0] && SS[1] || SS[2] && SS[3]) S += 2;
			}
		})
	})
	return S;
}

function part2(data) {

	let res = 0;
	data = table(data);
	range(data.length)(i => {
		range(data[i].length)(j => {
			if (data[i][j] === '#') return;
			const c = data[i][j];
			const coords = getRegion(data, i, j);
			let A = 0, P = 0;
			const nData = copy(data);
			iter(coords, ([y, x]) => {
				nData[y][x] = '#';
				A++;
			})
			P = getSides(coords);
			res += A * P;
			data = nData;
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("12_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
