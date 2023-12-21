
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

const mapCoords = (y, x, my, mx) => {
	return [mod(y, my), mod(x, mx)];
}

const bfs = (data, steps, [sy, sx]) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	let v = new set();
	let nv = new set();
	v.add([sy, sx])
	let curr = 0, pp = -1;
	let res = 0;

	while (!q.empty()) {
		if (curr !== pp && (steps & 1) === (curr & 1)) {
			res += q.size();
			nv.clear();
		}
		if (q.front()[2] === steps) break;
		const [y, x, ss] = q.pop();
		iter(D4, ([dy, dx]) => {
			const [ny, nx] = mapCoords(y+dy, x+dx, data.length, data[0].length)
			if (data[ny][nx] === '.' && !v.has([ny, nx])) {
				q.push([y+dy, x+dx, ss + 1]);
				v.add([ny, nx]);
				nv.add([y+dy, x+dx]);
			}
		})
		pp = curr;
		curr = q.empty() ? 0 : q.front()[2];
	}

	return res;
}

function part1(data) {

	let res = 0;
	data = table(data);
	let sy, sx;
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === 'S') {
				data[y][x] = '.';
				sy = y;
				sx = x;
				return true;
			}
		})
		return sy;
	});

	let G = [];
	let S = 51;
	range(S)(y => {
		iter(data, (r, yy) => {
			G.push([]);
			range(S)(x => {
				G[y * data.length + yy].push(...r);
			})
		})
	})
	sy += floor(S / 2) * data.length;
	sx += floor(S / 2) * data[0].length;
	res = bfs(G, 64, [sy, sx]);
	
	/*
	// uncomment this for part 2 and copy output to 21.py
	let y0 = bfs(G, 65, [sy, sx]);
	let y1 = bfs(G, 65 + 131, [sy, sx]);
	let y2 = bfs(G, 65 + 131 + 131, [sy, sx]);
	debug(`y0, y1, y2 = ${y0}, ${y1}, ${y2}\nx0, x1, x2 = 65, 65 + 131, 65 + 131 + 131`)
	*/	

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("21_input").toString("utf-8");

	part1(data);
	//part2(data);
	process.exit(0);
}

main();
