
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

const getNum = (s, i) => {
	let n = 0;
	while (i < s.length && ord(s[i]) >= ord('0') && ord(s[i]) <= ord('9')) {
		n = 10 * n + (ord(s[i]) - ord('0'));
		++i;
	}
	return [i, n];
}

const getOrientation = (s, i) => [i + 1, s[i]];

const wrapAround = (G, r, c, dir) => {
	const [dy, dx] = D4[dir];
	r = mod(r + dy, G.length);
	c = mod(c + dx, G[r].length);
	while (G[r][c] === ' ') {
		r = mod(r + dy, G.length);
		c = mod(c + dx, G[r].length);
	}
	return [r, c];
}

const move = (G, r, c, dir, n) => {
	const [dy, dx] = D4[dir];
	let i = 0;
	while (i < n) {
		r += dy;
		c += dx;
		if (r >= G.length || r < 0 || c < 0 || c >= G[r].length) {
			let [nr, nc] = wrapAround(G, r, c, dir);
			if (G[nr][nc] === '#')
				return [r - dy, c - dx];
			r = nr;
			c = nc;
			++i;
			continue;
		}
		switch (G[r][c]) {
			case '#': return [r - dy, c - dx];
			case '.': break;
			case ' ': {
				let [nr, nc] = wrapAround(G, r, c, dir);
				if (G[nr][nc] === '#')
					return [r - dy, c - dx];
				r = nr;
				c = nc;
			}
		}
		++i;
	}
	return [r, c];
}

function part1(data) {
	let [G, path] = groups(data)
	path = path[0];
	let mx = 0;
	iter(G, row => {
		mx = max(mx, row.length);
	})
	range(G.length)(i => {
		if (G[i].length < mx) {
			G[i] += new Array(mx - G[i].length).fill(' ').join('');
		}
	});
	let dir = 0; // -1 turn right, 1 turn left
	let r = 0;
	let c = 0;
	while (G[0][c] === ' ') ++c;
	let i = 0, n, or;
	while (i < path.length) {
		[i, n] = getNum(path, i);
		[r, c] = move(G, r, c, dir, n);
		[i, or] = getOrientation(path, i);
		if (or === 'R')
			dir = mod(dir + 1, D4.length);
		else if (or === 'L')
			dir = mod(dir - 1, D4.length);
	}
	let res = 1000 * (r + 1) + 4 * (c + 1) + dir;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
