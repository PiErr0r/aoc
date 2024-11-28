
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

const getKey = (G) => {
	return G.map(r => r.join("")).join("/")
}
const fromKey = (s) => {
	return s.split("/").map(r => r.split(""));
}

const unit = (G) => G;
const rotate = (G) => {
	const nG = new Array(G.length).fill(0).map(r => new Array(G.length).fill("."));
	for (let i = 0; i < G.length; ++i) {
		for (let j = 0; j < G.length; ++j) {
			nG[j][G.length - i - 1] = G[i][j];
		}
	}
	return nG;
};
const flip = (G) => {
	for (let i = 0; i < G.length; ++i) {
		G[i].reverse();
	}
	return G;
};

const sides = [unit, rotate, rotate, rotate, (G) => flip(rotate(G)), rotate, rotate, rotate];

const split = (P, MAP, n) => {
	const step = P.length / n;
	const sz = step * (n + 1);
	const res = new Array(sz).fill(0).map(r => new Array(sz).fill("."));
	drange(P.length / n)((i, j) => {
		let G = P.slice(n * i, n * (i + 1)).map(r => r.slice(n * j, n * (j + 1)));
		iter(sides, f => {
			G = f(G);
			if (getKey(G) in MAP) return true;
		})
		const nG = fromKey(MAP[ getKey(G) ]);
		drange(nG.length)((di, dj) => {
			res[(n+1) * i + di][(n+1) * j + dj] = nG[di][dj];
		})
	})
	return res;
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%$ => %$")
	const MAP = {};
	iter(data, ([from, to]) => {
		MAP[from] = to;
	})
	let P = [".#.", "..#", "###"].map(s => s.split(""))
	range(5)(_ => {
		if (P.length % 2 === 0) {
			P = split(P, MAP, 2);
		} else {
			P = split(P, MAP, 3);
		}
	})
	iter(P, r => {
		iter(r, c => {
			res += c === '#';
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%$ => %$")
	const MAP = {};
	iter(data, ([from, to]) => {
		MAP[from] = to;
	})
	let P = [".#.", "..#", "###"].map(s => s.split(""))
	range(18)(_ => {
		if (P.length % 2 === 0) {
			P = split(P, MAP, 2);
		} else {
			P = split(P, MAP, 3);
		}
	})
	iter(P, r => {
		iter(r, c => {
			res += c === '#';
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("21_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
