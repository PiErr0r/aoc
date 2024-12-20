
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
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const bfs = (G, [sy, sx]) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		// G.get([y, x]).w = t;
		G[[y, x]].w = t;
		iter(D4, ([dy, dx]) => {
			if (!G[[y+dy, x+dx]]) return;
			if (G[[y+dy, x+dx]].v === '#') return;
			q.push([y+dy, x+dx, t + 1]);
		})
	}
}

const getCheats = (G, [sy, sx], L) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	const res = [];
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (t > L) continue;
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		if (G[[y, x]].v === '.') res.push([y, x, t]);
		iter(D4, ([dy, dx]) => {
			if (!G[[y+dy, x+dx]]) return;
			q.push([y+dy, x+dx, t + 1]);
		})
	}
	return res;
}

const cheat = (G, [sy, sx], mn, thresh, len = 2) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const seen = new set();
	let cnt = 0;
	const collect = new DD();
	while (!q.empty()) {
		const [y, x, t] = q.pop();
		if (seen.has([y, x])) continue;
		seen.add([y, x]);
		const road = getCheats(G, [y, x], len);
		iter(road, ([ry, rx, l]) => {
			if (t + G[[ry, rx]].w + l < mn && mn - (t + G[[ry, rx]].w + l) >= thresh) {
				++cnt;
				collect[mn - (t + G[[ry, rx]].w + l)]++;
			}
		})
		iter(D4, ([dy, dx]) => {
			if (!G[[y+dy, x+dx]]) return;
			if (G[[y+dy, x+dx]].v === '#') {
				return;
			} else {
				q.push([y+dy, x+dx, t + 1]);
			} 
		})
	}
	// debug(collect)
	return cnt;
}

function part1(data) {

	let res = 0;
	data = table(data);
	let sy, sx, ey, ex;
	const G = {};
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
			}
			if (c === 'E') {
				ey = i;
				ex = j;
			}
			if (c === '#') {
				G[[i, j]] = {v: '#', w: -1};
			} else {
				G[[i, j]] = {v: '.', w: 0};
			}
		})
	})
	
	bfs(G, [ey, ex]);
	res = cheat(G, [sy, sx], G[[sy, sx]].w, 100);

	
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	let sy, sx, ey, ex;
	const G = {};
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'S') {
				sy = i;
				sx = j;
			}
			if (c === 'E') {
				ey = i;
				ex = j;
			}
			if (c === '#') {
				G[[i, j]] = {v: '#', w: -1};
			} else {
				G[[i, j]] = {v: '.', w: 0};
			}
		})
	})
	
	bfs(G, [ey, ex]);
	res = cheat(G, [sy, sx], G[[sy, sx]].w, 100, 20);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
