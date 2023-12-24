
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

const bfs = (data) => {
	const q = new Queue();
	q.push([0, 1, 0, new set()]);
	const gy = data.length - 1;
	const gx = data[0].length - 2;
	let mx = -1;
	const visited = new set();
	while (!q.empty()) {
		const [y, x, ss, v] = q.pop();
		v.add([y, x]);
		if (y === gy && x === gx) {
			debug(mx, ss, q.size())
			mx = max(mx, ss);
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (data[y+dy][x+dx] === '#') return;
			if (v.has([y+dy, x+dx])) return;
			if (data[y+dy][x+dx] === '<' && dx === 1) return;
			if (data[y+dy][x+dx] === '>' && dx === -1) return;
			if (data[y+dy][x+dx] === '^' && dy === 1) return;
			if (data[y+dy][x+dx] === 'v' && dy === -1) return;
			q.push([y+dy, x+dx, ss+1, new set([...v])]);
		})
	}
	return mx;
}

function part1(data) {

	let res = 0;
	data = table(data);
	res = bfs(data);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const dfs = (data) => {
	const q = new Stack();
	q.push([0, 1, 0, new set()]);
	const gy = data.length - 1;
	const gx = data[0].length - 2;
	let mx = -1;
	// const v = new set();
	while (!q.empty()) {
		const [y, x, ss, v] = q.pop();
		v.add([y, x]);
		if (y === gy && x === gx) {
			debug(mx, ss, q.size())
			mx = max(mx, ss);
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (data[y+dy][x+dx] === '#') return;
			if (v.has([y+dy, x+dx])) return;
			// if (data[y+dy][x+dx] === '<' && dx === 1) return;
			// if (data[y+dy][x+dx] === '>' && dx === -1) return;
			// if (data[y+dy][x+dx] === '^' && dy === 1) return;
			// if (data[y+dy][x+dx] === 'v' && dy === -1) return;
			q.push([y+dy, x+dx, ss+1, new set([...v])]);
		})
		// v.delete([y, x]);
	}
	return mx;
}

const getChildren = (data, [sy, sx], [ey, ex]) => {
	const q = new Queue();
	q.push([sy, sx, 0]);
	const children = [];
	const visited = new set();
	while (!q.empty()) {
		const [y, x, ss] = q.pop();
		visited.add([y, x]);
		if (y === ey && x === ex) {
			children.push([y, x, ss]);
			continue;
		}
		let cnt = 0, r = [];
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (visited.has([y+dy, x+dx])) return;
			if (data[y+dy][x+dx] === '#') return;
			++cnt;
			r.push([dy, dx]);
		})
		if (cnt === 1) {
			const [dy, dx] = r[0];
			q.push([y+dy, x+dx, ss + 1]);
		} else {
			if (y !== sy || x !== sx)
				children.push([y, x, ss]);
			else {
				iter(r, ([dy, dx]) => {
					q.push([y+dy, x+dx, ss+1]);
				})
			}
		}
	}
	return children;
}

const condense = (data, [sy, sx], [ey, ex]) => {
	const G = {};
	const q = new Queue();
	q.push([sy, sx]);
	const visited = new set();
	while (!q.empty()) {
		const [y, x] = q.pop();
		if (visited.has([y, x])) continue;
		visited.add([y, x]);
		G[[y, x]] = getChildren(data, [y, x], [ey, ex]);
		iter(G[[y, x]], ([ny, nx, ss]) => {
			q.push([ny, nx])
		})
	}
	return G;
}

const graphDfs2 = (G, [sy, sx], [ey, ex]) => {
	const s = new Stack();
	s.push([sy, sx, 0, new set()]);
	let mx = -1;
	while (!s.empty()) {
		const [y, x, ss, v] = s.pop();
		v.add([y, x]);
		if (y === ey && x === ex) {
			debug(mx, ss, s.size())
			mx = max(mx, ss);
		}
		// debug(G[[y, x]], G)
		iter(G[[y, x]], ([ny, nx, ll]) => {
			if (v.has([ny, nx])) return;
			s.push([ny, nx, ss + ll, new set([...v])])
		})
	}
	return mx;
}

const seen = new set();
const graphDfs = (G, [sy, sx], [ey, ex]) => {
	if (sy === ey && sx === ex) {
		return 0;
	}

	seen.add([sy, sx]);
	let mx = -1;
	iter(G[[sy, sx]], ([ny, nx, ll]) => {
		if (!seen.has([ny, nx])) {
			const res = ll + graphDfs(G, [ny, nx], [ey, ex])
			mx = max(mx, res);
		}
	})
	seen.delete([sy, sx]);
	return mx
}

function part2(data) {

	let res = 0;
	data = table(data);
	const S = [0, 1];
	const E = [data.length - 1, data[0].length - 2];
	const G = condense(data, S, E);
	debug(G)
	// wrong answer
	// res = graphDfs(G, S, E);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("23_input").toString("utf-8");

	// part1(data);
	part2(data);
	process.exit(0);
}

main();
