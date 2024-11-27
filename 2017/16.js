
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

const getP = () => {
	const P = {}
	iter(ALPHA_L, (al, i) => {
		if (al === 'q') return true;
		P[al] = i;
	})
	return P;
}

const MOVE = {
	's': (P, n) => {
		n = num(n);
		iter(keys(P), k => {
			P[k] = (P[k] + n) % 16;
		})
	},
	'x': (P, ab) => {
		// debug(ab)
		const [an, bn] = ab.split('/').map(n => num(n));
		let a, b;
		iter(keys(P), k => {
			if (P[k] === an) a = k;
			if (P[k] === bn) b = k;
		})
		let tmp = P[a];
		P[a] = P[b];
		P[b] = tmp;
	},
	'p': (P, ab) => {
		const [a, b] = ab.split('/');
		let tmp = P[a];
		P[a] = P[b];
		P[b] = tmp;
	}
}

function part1(data) {

	let res = new Array(16);
	data = data.split(',');
	const P = getP();
	iter(data, mv => {
		MOVE[mv[0]](P, mv.slice(1));
	})

	iter(keys(P), k => {
		res[P[k]] = k;
	})
	res = res.join('');
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = new Array(16);
	data = data.split(',');
	const P = getP();
	const cache = {};
	range(1000000000)(_ => {
		iter(data, mv => {
			MOVE[mv[0]](P, mv.slice(1));
		})
		iter(keys(P), k => {
			res[P[k]] = k;
		})
		if (res.join('') in cache) {
			const div = 1000000000 % _ - 1;
			iter(keys(cache), k => {
				if (cache[k] === div) {
					res = k;
					return true;
				}
			})
			return true;
		} else {
			cache[res.join('')] = _;
		}
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
