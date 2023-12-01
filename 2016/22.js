
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res = 0;

	data = lines(data).slice(2);
	const GRID = empty(39, 25);
	iter(data, line => {
		const [x, y, _1, size, _2, used, _3, available, _4, percent] = scanf(line, "/dev/grid/node-x%d-y%d% %dT% %dT% %dT% %d%%")[0];
		GRID[x][y] = { size, used, available, percent }
	})

	iter(GRID, (r, i1) => {
		iter(r, (c, j1) => {
			iter(GRID, (_r, i2) => {
				iter(_r, (_c, j2) => {
					if (i1 === i2 && j1 === j2) return;
					if (c.used === 0) return;
					if (c.used <= _c.available) ++res;
				})
			})
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const swappable = (x, y, dx, dy, G) => {
	return G[x][y].used <= G[x+dx][y+dy].size && G[x+dx][y+dy].used <= G[x][y].size;
}

const bfs = (GRID, sx, sy) => {
	const q = new Queue();
	q.push([sx, sy, []]);
	while (!q.empty()) {
		const [x, y, path] = q.pop();
		if (x === 37 && y === 0) return path;
		if (GRID[x][y].visited) continue;
		GRID[x][y].visited = true;
		iter(D4, ([dx, dy]) => {
			if (!inBB(x+dx, y+dy, GRID)) return;
			if (!swappable(x, y, dx, dy, GRID)) return;
			q.push([x+dx, y+dy, path.concat([[x+dx, y+dy]])]);
		});
	}
}

function part2(data) {

	let res = 0;
	data = lines(data).slice(2);
	const GRID = empty(39, 25);
	iter(data, line => {
		const [x, y, _1, size, _2, used, _3, available, _4, percent] = scanf(line, "/dev/grid/node-x%d-y%d% %dT% %dT% %dT% %d%%")[0];
		GRID[x][y] = { size, used, available, percent, visited: false };
	})
	let start = null;
	iter(GRID, (r, x) => {
		iter(r, (c, y) => {
			if (c.used === 0) start = [x, y];
			return start;
		})
		return start;
	}) 
	const shortestPath = bfs(GRID, ...start);
	res = shortestPath.length + 1 + 5 * 37; // move empty to data + swap + 5 swaps per one move of data
	
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
