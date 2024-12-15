
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
	'^': [-1, 0],
	'>': [0, 1],
	'v': [1, 0],
	'<': [0, -1]
};

function part1(data) {

	let res = 0;
	data = getGroups(data);
	const [G, dirs] = [table(data[0]), lines(data[1]).join('')];
	let y, x;
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === '@') {
				G[i][j] = '.';
				y = i;
				x = j;
			}
		})
	})

	iter(dirs, (d) => {
		const [dy, dx] = D[d];
		let [ny, nx] = [y + dy, x + dx];
		if (!inBB(ny, nx, G)) return;
		if (G[ny][nx] === '#') return;
		if (G[ny][nx] === 'O') {
			while (G[ny][nx] === 'O') [ny, nx] = [ny+dy, nx+dx];
			if (G[ny][nx] === '#') return;
			G[ny][nx] = 'O';
			G[y+dy][x+dx] = '.';
		}
		[y, x] = [y + dy, x + dx];
	});
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'O')
				res += 100 * i + j;
		})
	})
	disp(G)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const expand = G => {
	const [h, w] = [G.length, G[0].length];
	const nG = empty(h, w * 2);
	range(h)(i => {
		range(w)(j => {
			if (G[i][j] === '@') {
				nG[i][2*j] = '@';
				nG[i][2*j+1] = '.';
			} else if (G[i][j] === '.' || G[i][j] === '#') {
				nG[i][2*j] = G[i][j];
				nG[i][2*j+1] = G[i][j];
			} else if (G[i][j] === 'O') {
				nG[i][2*j] = '[';
				nG[i][2*j+1] = ']';
			} else {
				debug("BAD");
			}
		})
	})
	return nG;
}

const checkAndMove = (G, y, x, dy, dx) => {
	if (dx) {
		let [ny, nx] = [y, x+dx]
		while (in_(G[ny][nx], '[]')) nx += dx;
		if (G[ny][nx] === '#') return false;
		while (nx !== x) {
			G[ny][nx] = G[ny][nx-dx];
			nx -= dx;
		}
		G[y+dy][x+dx] = '.';
		return true;
	}

	const q = new Queue();
	q.push([y+dy, x]);
	if (G[y+dy][x] === '[') {
		q.push([y+dy, x+1]);
	} else {
		q.push([y+dy, x-1]);
	}
	const all = new set();
	while (!q.empty()) {
		const [ny, nx] = q.pop();
		if (all.has([ny, nx])) continue;
		all.add([ny, nx]);

		if (G[ny+dy][nx] === '#') {
			return false;
		} else if (G[ny+dy][nx] === '[') {
			q.push([ny+dy, nx]);
			q.push([ny+dy, nx+1]);
		} else if (G[ny+dy][nx] === ']') {
			q.push([ny+dy, nx]);
			q.push([ny+dy, nx-1]);
		}
	}
	const N = new set();
	iter(all, ([ny, nx]) => {
		N.add([ny+dy, nx, G[ny][nx]]);
		G[ny][nx] = '.';
	});
	iter(N, ([ny, nx, s]) => {
		G[ny][nx] = s;
	});
	return true;
}

function part2(data) {

	let res = 0;
	data = getGroups(data);
	const [G, dirs] = [expand(table(data[0])), lines(data[1]).join('')];

	let y, x;
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === '@') {
				G[i][j] = '.';
				y = i;
				x = j;
			}
		})
	})

	iter(dirs, (d, di) => {
		const [dy, dx] = D[d];
		let [ny, nx] = [y + dy, x + dx];
		if (!inBB(ny, nx, G)) return;
		if (G[ny][nx] === '#') return;
		if (in_(G[ny][nx], '[]')) {
			if (!checkAndMove(G, y, x, dy, dx))
				return;
		}
		[y, x] = [y + dy, x + dx];
	});
	iter(G, (r, i) => {
		iter(r, (c, j) => {
			if (c === '[')
				res += 100 * i + j;
		})
	})
	disp(G)

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
