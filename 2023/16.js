
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, manDist, modPow, modPowBig, modInv, mod, prod, prodBig, randint, shoelace, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const D = {
	'/': (y, x, dy, dx) => dy ? [[y, x - dy], [0, -dy]] : [[y - dx, x], [-dx, 0]],
	'\\': (y, x, dy, dx) => dy ? [[y, x + dy], [0, dy]] : [[y + dx, x], [dx, 0]],
}
const _DD = {
	'0,1': 'v',
	'0,-1': '^',
	'1,0': '>',
	'-1,0': '<',
}

const run = (data, y0, x0, dy0, dx0) => {
	let cp = data.map(r => r.map(c => []));

	const q = new Queue();
	q.push([[y0, x0], [dy0, dx0]]);
	let cnt = 0;
	while (!q.empty() && cnt < 5_000_000) {
		const [p, d] = q.pop();
		let [y, x] = p;
		let [dy, dx] = d;
		if (!inBB(y, x, data)) continue;
		if (in_(_DD[[dy, dx]], cp[y][x])) continue;
		cp[y][x].push(_DD[[dy, dx]]);
		switch (data[y][x]) {
		case '.':
		case '#':
			q.push([[y+dy, x+dx], [dy, dx]]);
			break;
		case '/':
		case '\\':
			[[y, x], [dy, dx]] = D[ data[y][x] ](y, x, dy, dx)
			q.push([[y, x], [dy, dx]])
			break;
		case '|':
			if (dx) {
				q.push([[y+1, x], [1, 0]])
				q.push([[y-1, x], [-1, 0]])
			} else {
				q.push([[y+dy, x+dx], [dy, dx]]);
			}
			break;
		case '-':
			if (dy) {
				q.push([[y, x+1], [0, 1]])
				q.push([[y, x-1], [0, -1]])
			} else {
				q.push([[y+dy, x+dx], [dy, dx]]);
			}
			break;
		}
	}
	let res = 0;
	iter(cp, r => {
		iter(r, c => {
			res += (c.length !== 0)
		})
	})
	return res;
}

function part1(data) {

	let res = 0;
	data = table(data);
	res = run(data, 0, 0, 0, 1);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = table(data)
	range(data.length)(y => {
		res = max(res, run(data, y, 0, 0, 1))
		res = max(res, run(data, y, data[0].length - 1, 0, -1))
	})
	range(data[0].length)(x => {
		res = max(res, run(data, 0, x, 1, 0))
		res = max(res, run(data, data.length - 1, x, -1, 0))
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
