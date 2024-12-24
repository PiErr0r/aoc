
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

function Record(a, op, b) {
	this.a = a;
	this.op = op;
	this.b = b;
	this.value = null;
}

const resolve = (G, k, initial) => {
	if (k in initial) return initial[k];
	if (G[k].value !== null) return G[k].value;
	const a = resolve(G, G[k].a, initial);
	const b = resolve(G, G[k].b, initial);
	switch (G[k].op) {
		case 'AND': 
			G[k].value = a & b;
			break;
		case 'OR':
			G[k].value = a | b;
			break;
		case 'XOR':
			G[k].value = a ^ b;
			break;
		default:
			throw new Error("BAD!");
	}
	return G[k].value;
}

function part1(data) {

	let res = 0;
	const [v, m] = getGroups(data);
	const initial = scanf(v, "%w: %d")
		.reduce((acc, curr) => {
			const [node, value] = curr;
			acc[node] = value;
			return acc;
		}, {});
	const G = scanf(m, "%w %w %w -> %w")
		.reduce((acc, curr) => {
			const [a, op, b, res] = curr;
			acc[res] = new Record(a, op, b);
			return acc;
		}, {})

	// 1 swap
	const SWAP = (G, a, b) => {
		let tmp = {...G[a]};
		G[a] = {...G[b]};
		G[b] = {...tmp};
	}
	SWAP(G, 'z05', 'z20');
	// SWAP(G, 'dbd', 'dtn');
	// SWAP(G, 'bbc', 'gcc');
	// SWAP(G, 'kqk', 'tcb')

	const K = keys(G);
	K.sort();
	iter(K, k => {
		resolve(G, k, initial);
	});

	const L = ["dkk", "kqk", "gcc", "dbd", "dtn", "pbd", "rbr", "dhd", "tcb", "bbc"]
	const LL = ["djp", "bdv", "bbm", "fwr", "cpv", "fwn", "grk", "qbc", "cpv", "fwr"];
	iter(K, k => {
		// if (k >= 'z15' && k <= 'z19' || in_(k, L)) {
		if (in_(k, LL)) {
		// if (in_(k, ['z15', 'z16', 'z19'])) {
			debug(k, G[k], (G[k].a in G) ? G[ G[k].a ].value : initial[G[k].a], (G[k].b in G) ? G[ G[k].b ].value : initial[G[k].b]);
		}
	})

	let resx = 0, resy = 0;
	iter(keys(initial), k => {
		const i = int(k.slice(1));
		if (k[0] === 'x') {
			resx += ((2 ** i) * initial[k])
		}
		if (k[0] === 'y') {
			resy += ((2 ** i) * initial[k])
		}
	})

	iter(K, k => {
		if (k[0] !== 'z') return;
		const i = int(k.slice(1));
		// debug(k, i, G[k].value, res)
		res += ((2 ** i) * G[k].value);
	})

	debug(resx, resy, resx + resy, res - resx - resy)
	debug(res);
	debug(bin(resx))
	debug('00' + bin(resy))
	debug(bin(res))
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
