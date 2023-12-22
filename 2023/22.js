
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

const intersect = ([x1, y1], [x2, y2]) => {
	return x1 < y2 && x2 < y1;
}

const countFalls = (ii, data) => {
	let res = 0;
	iter(data, ([x0, y0, z0, x1, y1, z1], i) => {
		if (z0 === 1 || i === ii) return;
		let top = -1;
		const j = i;
		while (i > 0) {
			--i;
			if (i === ii) continue;
			const [nx0, ny0, nz0, nx1, ny1, nz1] = data[i];
			if (z0 < nz1) continue;
			if (top !== -1 && top <= nz0) continue;
			if (intersect([x0, x1], [nx0, nx1]) && intersect([y0, y1], [ny0, ny1])) {
				top = max(top, nz1);
			}
		}
		if (top === -1) top = 1;
		if (top !== z0) ++res;
		data[j] = [x0, y0, top, x1, y1, top + z1 - z0];
	});
	return res;
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%d,%d,%d~%d,%d,%d")
	data = data.map(([x0, y0, z0, x1, y1, z1]) => [x0, y0, z0, x1+1, y1+1, z1+1])
	sort(data, (a, b) => a[2] - b[2]);
	const parents = empty(data.length).map(_ => []);
	const children = empty(data.length).map(_ => []);
	iter(data, ([x0, y0, z0, x1, y1, z1], i) => {
		if (z0 === 1) return;
		let top = -1;
		const j = i;
		while (i > 0) {
			--i;
			const [nx0, ny0, nz0, nx1, ny1, nz1] = data[i];
			if (z0 < nz1) continue;
			if (intersect([x0, x1], [nx0, nx1]) && intersect([y0, y1], [ny0, ny1])) {
				top = max(top, nz1);
			}
		}
		i = j;
		while (i > 0) {
			--i;
			const [nx0, ny0, nz0, nx1, ny1, nz1] = data[i];
			if (nz1 === top && intersect([x0, x1], [nx0, nx1]) && intersect([y0, y1], [ny0, ny1])) {
				parents[i].push(j);
				children[j].push(i);
			}
		}
		if (top === -1) top = 1;
		data[j] = [x0, y0, top, x1, y1, top + z1 - z0];
	});

	const disintegrated = empty(data.length);
	range(data.length)(i => {
		if (parents[i].length === 0) ++res;
		else {
			let canDisintegrate = true;
			iter(parents[i], p => {
				if (children[p].length === 1) canDisintegrate = false;
				return !canDisintegrate;
			})
			res += canDisintegrate;
			if (!canDisintegrate) {
				disintegrated[i] = 1;
			}
		}
	})
	let res2 = 0;
	iter(disintegrated, (can, i) => {
		if (can) res2 += countFalls(i, copy(data));
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(res2);
	return;
}

function part2(res) {

	// let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
