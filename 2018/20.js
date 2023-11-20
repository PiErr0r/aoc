
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

const M = { N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1] };

const dfs = (s, head, pos, walls) => {
	// this doesn't work on inputs like `^N(E|W)N$` but it works on task input
	const S = new Stack();

	iter(s, c => {
		if (c === '(') {
			S.push(head);
		} else if (c === '|') {
			head = S.top();
		} else if (c === ')') {
			S.pop();
		} else {
			const [dy, dx] = M[c];
			const [y, x] = head;
			let nhead = [y+2*dy, x+2*dx];
			// G[y+dy][x+dx] = '.'
			pos.add(nhead)
			walls.add([y+dy, x+dx])
			head = nhead;
		}
	})
}

const bfsLong = (G, start, gt) => {
	const Q = new Queue();
	Q.push([...start, 0]);
	let mx = 0;
	let cnt = 0;
	while (!Q.empty()) {
		const [y, x, d] = Q.pop();
		mx = max(mx, d);
		if (G[y][x] === 'X') continue;
		G[y][x] = 'X';
		if (d >= gt) ++cnt;
		for (let [dy, dx] of D4) {
			if (!in_(G[y+dy][x+dx], '#X')) {
				G[y+dy][x+dx] = 'X';
				Q.push([y+2*dy, x+2*dx, d + 1]);
			}
		}
	}
	return [mx, cnt];
}

function part1(data) {

	let res;
	data = singles(data);

	let threads = [[0, 0]];
	const pos = new set();
	const walls = new set();
	let i = 1;

	pos.add([0,0])
	dfs(data.slice(1, data.length - 1), [0, 0], pos, walls)

	let mnx = MOD, mxx = -MOD, mny = MOD, mxy = -MOD;
	for (let [y, x] of pos) {
		mnx = min(mnx, x)
		mny = min(mny, y)
		mxx = max(mxx, x)
		mxy = max(mxy, y)
	}

	const G = empty(mxy - mny + 3,mxx - mnx + 3);
	for (let [y, x] of pos) {
		y -= mny - 1;
		x -= mnx - 1;
		G[y][x] = '.';
	}

	for (let [y, x] of walls) {
		y -= mny - 1;
		x -= mnx - 1;
		if (inBB(y + 1, x, G) && G[y+1][x] === '.' || inBB(y - 1, x, G) && G[y-1][x] === '.')
			G[y][x] = '-';
		else
			G[y][x] = '|';
	}

	range(G.length)(r => {
		range(G[0].length)(c => {
			G[r][c] = G[r][c] === 0 ? '#' : G[r][c];
		})
	});

	disp(G);

	[res, cnt] = bfsLong(G, [-mny + 1,-mnx + 1], 1000);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");

	// res = bfsCnt(G, [-mny + 1,-mnx + 1], 0);

	debug(cnt);
	exec(`echo ${cnt} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");

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
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
