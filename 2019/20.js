
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const findStart = (data, portal, curr = [-1, -1], level = false) => {
	let start = null;
	const [cy, cx] = curr
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === portal[0] && y !== cy && x !== cx) {
				if (data[y+1][x] === portal[1] && y+1 !== cy && x !== cx 
				 || data[y][x+1] === portal[1] && y !== cy && x+1 !== cx)
					start = [y, x];
			}
			return start;
		})
		return start;
	})

	const [y, x] = start;
	let res, lvl;
	// x (27, 76) inner, (0, 103) outer
	// y (27, 82) inner, (0, 109) outer
	if (y === 27 || y === 82 || x === 27 || x === 76) lvl = -1;
	if (y === 0 || y === 109 || x === 0 || x === 103) lvl = 1;

	if (inBB(y-1, x, data) && in_(data[y-1][x], '.~'))
		res = [y-1, x];
	else if (inBB(y+2, x, data) && in_(data[y+2][x], '.~'))
		res = [y+2, x];
	else if (inBB(y, x-1, data) && in_(data[y][x-1], '.~'))
		res = [y, x-1];
	else if (inBB(y, x+2, data) && in_(data[y][x+2], '.~'))
		res = [y, x+2]
	else console.assert(false, "Not found");

	return level ? [...res, lvl, ...start] : res;
}

const bfs = (start, data) => {
	const Q = new Queue();
	Q.push([...start, 0]);
	let ret = null;
	while (!Q.empty() && ret === null) {
		const [y, x, d] = Q.pop();
		if (data[y][x] === '~') continue;
		data[y][x] = '~';
		iter(D4, ([dy, dx]) => {
			if (inBB(y+dy, x+dx, data) && !in_(data[y+dy][x+dx], '# ~')) {
				if (data[y+dy][x+dx] === '.') {
					Q.push([y+dy, x+dx, d+1]);
				} else {
					let portal = '';
					if (dy === 1) {
						portal = data[y+1][x] + data[y+2][x];
					} else if (dy === -1) {
						portal = data[y-2][x] + data[y-1][x];
					} else if (dx === 1) {
						portal = data[y][x+1] + data[y][x+2];
					} else if (dx === -1) {
						portal = data[y][x-2] + data[y][x-1];
					} else {
						console.assert(false, `Wrong direction dy=${dy}, dx=${dx}`);
					}
					if (portal === 'ZZ') {
						ret = d;
						return true;
					} else if (portal === 'AA') {
						return;
					}
					const [py, px] = findStart(data, portal, [y+dy, x+dx]);
					Q.push([py, px, d+1]);
				}
			}
		})
	}
	return ret;
}

function part1(data) {

	data = table(data);
	const start = findStart(data, 'AA');
	let res = bfs(start, data);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const dijkstra = (start, data) => {
	const Q = new Queue();
	Q.push([...start, 0, 0, []]);
	let ret = MOD;
	let mxl = 0;
	while (!Q.empty()) {
		const [y, x, d, lvl] = Q.pop();
		if (data[lvl][y][x] === '~' || d > ret) continue;
		data[lvl][y][x] = '~';
		iter(D4, ([dy, dx]) => {
			if (inBB(y+dy, x+dx, data[lvl]) && !in_(data[lvl][y+dy][x+dx], '# ~')) {
				if (data[lvl][y+dy][x+dx] === '.') {
					Q.push([y+dy, x+dx, d+1, lvl]);
				} else {
					let portal = '';
					if (dy === 1) {
						portal = data[lvl][y+1][x] + data[lvl][y+2][x];
					} else if (dy === -1) {
						portal = data[lvl][y-2][x] + data[lvl][y-1][x];
					} else if (dx === 1) {
						portal = data[lvl][y][x+1] + data[lvl][y][x+2];
					} else if (dx === -1) {
						portal = data[lvl][y][x-2] + data[lvl][y][x-1];
					} else {
						console.assert(false, `Wrong direction dy=${dy}, dx=${dx}`);
					}
					
					if (portal === 'ZZ' && lvl === 0) {
						ret = min(ret, d);
						return;
					} else if (portal === 'AA' || portal === 'ZZ') {
						return;
					}

					const [py, px, dlvl, sy, sx] = findStart(data[lvl], portal, [y+dy, x+dx], true);
					if (lvl === 0 && dlvl === -1) return;

					Q.push([py, px, d+1, lvl + dlvl]);
				}
			}
		})
	}
	return ret;
}

function part2(data) {

	const original = table(data);
	const tbl = [];
	range(120)(_ => (tbl.push(copy(original)), 0));
	const start = findStart(original, 'AA');
	let res;
	res = dijkstra(start, tbl);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
