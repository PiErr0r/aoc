
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

// const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D = {'>': 0, 'v': 1, '<': 2, '^': 3};
const T = [-1, 0, 1];

const crash = (walkers, i, rm = false) => {
	let crashed = false;
	const W = walkers[i];
	iter(walkers, ((w, j) => {
		if (i === j || !walkers[j]) return;
		if (W.p[0] === w.p[0] && W.p[1] === w.p[1]) crashed = true;
		if (rm && crashed) {
			walkers[i] = null;
			walkers[j] = null;
		}
		return crashed;
	}));
	return crashed;
}

const move = (G, w) => {
	let { dir, t, p: [y, x] } = w;
	const [dy, dx] = D4[dir];
	x += dx;
	y += dy;
	const p = [y, x];
	const curr = G[y][x];
	if (curr === '|' || curr === '-') {
		return { p, dir, t };
	}

	if (curr === '+') {
		return {
			p, dir: mod(dir + T[t], 4), t: (t + 1) % 3
		}
	} else if (curr === '/') {
		if (dir === 1 || dir === 3) ++dir;
		else --dir;
	} else if (curr === '\\') {
		if (dir === 1 || dir === 3) --dir;
		else ++dir;
	} else {
		assert(false);
	}

	return { p, dir: mod(dir, 4), t };
}

function part1(data) {

	data = table(data);
	const walkers = [];
	range(data.length)(r => {
		range(data[0].length)(c => {
			if (data[r][c] === ' ') return;
			if ("<>v^".indexOf(data[r][c]) !== -1) {
				walkers.push({
					dir: D[ data[r][c] ],
					p: [r, c],
					t: 0,
				});
				data[r][c] = data[r][c] === '<' || data[r][c] === '>' ? '-' : '|';
			}
		})
	})

	let res;
	while (!res) {
		range(walkers.length)(w => {
			walkers[w]
			walkers[w] = move(data, walkers[w]);
			if (crash(walkers, w)) {
				res = walkers[w].p;
				return true;
			}
		});
		sort(walkers, (w1, w2) => (w1.p[0] - w2.p[0]) || (w1.p[1] - w2.p[1]));
	}

	[y, x] = res;

	debug(`${x},${y}`);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = table(data);
	let walkers = [];
	range(data.length)(r => {
		range(data[0].length)(c => {
			if (data[r][c] === ' ') return;
			if ("<>v^".indexOf(data[r][c]) !== -1) {
				walkers.push({
					dir: D[ data[r][c] ],
					p: [r, c],
					t: 0,
				});
				data[r][c] = data[r][c] === '<' || data[r][c] === '>' ? '-' : '|';
			}
		})
	})

	let res;
	let len = walkers.length;
	while (len !== 1) {
		range(walkers.length)(w => {
			if (!walkers[w]) return;
			walkers[w] = move(data, walkers[w]);
			if (crash(walkers, w, true)) {
				len -= 2;
			}
		});
		walkers = walkers.filter(W => W)
		sort(walkers, (w1, w2) => (w1.p[0] - w2.p[0]) || (w1.p[1] - w2.p[1]));
	}

	[y, x] = walkers[0].p;

	debug(`${x},${y}`);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("13_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
