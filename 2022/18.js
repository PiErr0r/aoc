
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
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
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

let MX;
const checkCoords = (z, y, x) => 0 <= z && z < MX && 0 <= y && y < MX && 0 <= x && x < MX;

function part1(data) {
	MX = 22;
	data = parse(data, "d,d,d");
	const G = empty(MX,MX,MX);
	iter(data, ([x, y, z]) => {
		G[z][y][x] = 1;
	})
	let res = 0;
	trange(MX)((z, y, x) => {
		if (!G[z][y][x]) return;
		let cnt = 0;
		if (checkCoords(z + 1, y, x) && G[z+1][y][x]) ++cnt
		if (checkCoords(z - 1, y, x) && G[z-1][y][x]) ++cnt
		if (checkCoords(z, y + 1, x) && G[z][y+1][x]) ++cnt
		if (checkCoords(z, y - 1, x) && G[z][y-1][x]) ++cnt
		if (checkCoords(z, y, x + 1) && G[z][y][x+1]) ++cnt
		if (checkCoords(z, y, x - 1) && G[z][y][x-1]) ++cnt
		res += 6 - cnt;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const touchesOne = (G, z, y, x) => {
		if (checkCoords(z + 1, y, x) && G[z+1][y][x] === 1) return true;
		if (checkCoords(z - 1, y, x) && G[z-1][y][x] === 1) return true;
		if (checkCoords(z, y + 1, x) && G[z][y+1][x] === 1) return true;
		if (checkCoords(z, y - 1, x) && G[z][y-1][x] === 1) return true;
		if (checkCoords(z, y, x + 1) && G[z][y][x+1] === 1) return true;
		if (checkCoords(z, y, x - 1) && G[z][y][x-1] === 1) return true;
		return false;
}

const isDiagonal = (G, a, b, DEBUG) => {
	const [az, ay, ax] = a;
	const [bz, by, bx] = b;
	const dx = ax - bx, dy = ay - by, dz = az - bz;
	if (abs(dx) ^ abs(dy) ^ abs(dz)) {
		if (!dx || !dy || !dz) return false;
	} else {
		if (!dx && !dy && !dz) return false;
	}
	if (DEBUG) {
		debug('##',[...a], [...b], [dz, dy, dx])
	}
	return G[bz+dz][by][bx] && G[bz][by+dy][bx] && G[bz][by][bx+dx]
	    || G[az-dz][ay][ax] && G[az][ay-dy][ax] && G[az][ay][ax-dx];
}

const bfs = (G, coords) => {
	const q = new Queue();
	q.push(coords);
	while (q.size()) {
		const [z, y, x] = q.pop();
		if (G[z][y][x]) continue;
		G[z][y][x] = 2;
		trange(-1, 2)((dz, dy, dx) => {
			if (!dz && !dy && !dx) return;
			let Z = z + dz, Y = y + dy, X = x + dx;
			if (checkCoords(Z,Y,X) && G[Z][Y][X] === 0 && touchesOne(G, Z, Y, X) && !isDiagonal(G,[z,y,x],[Z,Y,X])) q.push([Z, Y, X]);
		});
	}
}

const flood = (G, coords) => {
	const q = new Queue();
	q.push(coords);
	while (q.size()) {
		const [z, y, x] = q.pop();
		if (G[z][y][x] !== 1) continue;
		G[z][y][x] = 3;
		trange(-1, 2)((dz, dy, dx) => {
			if (!dz && !dy && !dx || (dx && dy && dz)) return;
			let Z = z + dz, Y = y + dy, X = x + dx;
			if (checkCoords(Z, Y, X) && G[Z][Y][X] === 1) q.push([Z, Y, X]);
		})
	}
}

function part2(data) {
	MX = 24;
	data = parse(data, "d,d,d");
	const G = empty(MX,MX,MX);
	iter(data, ([x, y, z]) => {
		++x;++y;++z;
		G[z][y][x] = 1;
	})
	let res = 0;
	let first;
	trange(MX)((z, y, x) => {
		if (G[z][y][x] === 1) {
			bfs(G, [z-1, y, x]); 
			flood(G, [z, y, x])
		}
	});


	trange(MX)((z, y, x) => {
		if (G[z][y][x] !== 2) return;
		let cnt = 0;
		if (checkCoords(z + 1, y, x) && G[z+1][y][x] === 3) ++cnt;
		if (checkCoords(z - 1, y, x) && G[z-1][y][x] === 3) ++cnt;
		if (checkCoords(z, y + 1, x) && G[z][y+1][x] === 3) ++cnt;
		if (checkCoords(z, y - 1, x) && G[z][y-1][x] === 3) ++cnt;
		if (checkCoords(z, y, x + 1) && G[z][y][x+1] === 3) ++cnt;
		if (checkCoords(z, y, x - 1) && G[z][y][x-1] === 3) ++cnt;
		res += cnt;
	});

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("18_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
