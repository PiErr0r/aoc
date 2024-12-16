
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

const D = {
	'N': [-1, 0],
	'E': [0, 1],
	'S': [1, 0],
	'W': [0, -1]
};
const sD = 'NESW';

const R = i => mod(i + 1, 4);
const L = i => mod(i - 1, 4);

const dijkstra = (G, sy, sx, ey, ex) => {
	const q = new PriorityQueue((a, b) => (a[3] - b[3]));
	q.push([sy, sx, 1, 0, `${sy},${sx}`]) // y x sD_index score path
	const seen = {};
	let mn = MOD;
	const paths = new set();
	while (!q.empty()) {
		const [y, x, d, score, path] = q.pop();
		if (score > mn) continue;
		if (seen[[y, x, d]] && seen[[y, x, d]] < score) continue;

		seen[[y, x, d]] = score;
		if (y === ey && x === ex) {
			if (score < mn) {
				paths.clear();
				paths.add(path);
				mn = score;
			} else if (score === mn) {
				paths.add(path);
			}
			continue;
		}

		const [dy, dx] = D[ sD[d] ];
		if (inBB(y+dy, x+dx, G) && G[y+dy][x+dx] === '.') {
			q.push([y+dy, x+dx, d, score + 1, path + `-${y+dy},${x+dx}`]);
		}
		q.push([y, x, R(d), score + 1000, path]);
		q.push([y, x, L(d), score + 1000, path]);
	}
	return [mn, paths];
}

function part1(data) {

	let res = 0;
	data = table(data);
	let sy, sx, ey, ex;
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
		})
	});
	data[sy][sx] = '.';
	data[ey][ex] = '.'; 
	res = dijkstra(data, sy, sx, ey, ex)[0];

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data);
	let sy, sx, ey, ex;
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
		})
	});
	data[sy][sx] = '.';
	data[ey][ex] = '.'; 
	const paths = dijkstra(data, sy, sx, ey, ex)[1];
	const nodes = new set();
	// debug(paths.size, paths)
	iter(paths, p => {
		iter(p.split('-'), n => {
			nodes.add(n);
		})
	})
	res = nodes.size;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
