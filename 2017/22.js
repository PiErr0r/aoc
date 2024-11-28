
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

const right = (dy, dx) => [dx, -dy];
const left = (dy, dx) => [-dx, dy];

function part1(data) {

	let res = 0;
	const G = {};
	data = table(data);
	drange(data.length)((i,j) => {
		G[[i, j]] = data[i][j];
	})
	let x = int(data.length / 2);
	let y = int(data.length / 2);
	let dy = -1, dx = 0;
	range(10_000)(_ => {
		if (!G[[y,x]]) G[[y,x]] = '.';
		if (G[[y,x]] === '#') {
			[dy, dx] = right(dy, dx);
			G[[y,x]] = '.';
		} else {
			[dy, dx] = left(dy, dx);
			G[[y,x]] = '#';
			++res;
		}
		[y, x] = [y + dy, x + dx];
	});

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const change = {
	'#': { // infected
		nxt: '$',
		dir: right
	},
	'$': { // flagged
		nxt: '.',
		dir: (dy, dx) => [-dy, -dx]
	},
	'.': { // clean
		nxt: '!',
		dir: left
	},
	'!': { // weakened
		nxt: '#',
		dir: (dy, dx) => [dy, dx]
	}
}

function part2(data) {

	let res = 0;
	const G = {};
	data = table(data);
	drange(data.length)((i,j) => {
		G[[i, j]] = data[i][j];
	})
	let x = int(data.length / 2);
	let y = int(data.length / 2);
	let dy = -1, dx = 0;
	range(10_000_000)(_ => {
		if (!G[[y,x]]) G[[y,x]] = '.';
		[dy, dx] = change[ G[[y,x]] ].dir(dy, dx);
		G[[y, x]] = change[ G[[y,x]] ].nxt;
		if (G[[y, x]] === '#') ++res;
		[y, x] = [y + dy, x + dx];
	});

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
