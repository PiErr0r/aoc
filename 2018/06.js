
var fs = require('fs');
const { ord, chr, debug, disp, int, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => {
	arr.sort(fn);
}
const in_ = (a, arr) => arr.indexOf(a) !== -1;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const parse = (data) => {
	return data.map(r => r.split(',').map(a => int(a.trim())));
}

const manDist = (c1, c2) => {
	const [x1, y1] = c1, [x2, y2] = c2;
	return abs(x1 - x2) + abs(y1 - y2);
}

function part1(data) {
	data = parse(data);

	const G = new Array(400).fill(0).map(n => new Array(400).fill(0));

	drange(400)((i, j) => {
		let mn = 1e9;
		let mni = -1;
		data.map((coords, k) => {
			const d = manDist(coords, [i,j]);
			if (d <= mn) {
				mn = d;
				mni = k;
			}
		});
		G[i][j] = mni;
	});

	const used = new set(new Array(data.length).fill(0).map((_, i) => i));
	range(400)(i => {
		used.delete(G[0][i]);
		used.delete(G[400 - 1][i]);
		used.delete(G[i][0]);
		used.delete(G[i][400 - 1]);
	});

	const area = new Array(data.length).fill(0);
	// disp(G)
	drange(400)((i, j) => {
		if (used.has(G[i][j])) {
			area[ G[i][j] ]++;
		}
	});

	debug(max(...area))

	console.log("END OF PART1");
	return;
}

const dfs = (data, MX, start) => {
	const q = new Queue();
	const s = new set();
	q.push(start);

	while (!q.empty()) {
		const [x, y] = q.pop();
		if (s.has([x, y])) {
			continue;
		}
		let sm = 0;
		iter(data)(d => {
			sm += manDist(d, [x, y]);
		});
		if (sm >= MX) {
			continue;
		}
		s.add([x, y]);
		for (d of D4) {
			const [dx, dy] = d;
			q.push([x+dx,y+dy]);
		}
	}
	return s;
}

function part2(data) {
	data = parse(data);
	const MX = 10_000;

	const start = data.reduce((acc, curr) => {
		acc[0] += curr[0];
		acc[1] += curr[1];
		return acc;
	}, [0, 0]);
	start[0] = Math.floor(start[0] / data.length);
	start[1] = Math.floor(start[1] / data.length);

	const G = dfs(data, MX, start);
	debug(G.size)
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");
	data = data.split('\n');
	// data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
