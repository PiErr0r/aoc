
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

const findCycles = (G, n) => {
	const res = [];

	iter(keys(G), k => {
		const q = new Stack();
		q.push([k, 0, []])
		const seen = new set();
		while (!q.empty()) {
			const [node, len, path] = q.pop();
			if (len > 3) continue
			if (node === k && len === n) {
				res.push([...path]);
				continue;
			}
			iter(G[node], child => {
				q.push([child, len + 1, path.concat(node)]);
			})
		}
	})
	const R = new set();
	res.forEach(c => R.add(c.sort()));
	return [...R];
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%w-%w");
	const G = {};
	iter(data, ([a, b]) => {
		if (a in G) G[a].push(b);
		else G[a] = [b];
		if (b in G) G[b].push(a);
		else G[b] = [a];
	});

	const C = findCycles(G, 3);
	iter(C, ([ca, cb, cc]) => {
		res += (ca[0] === 't' || cb[0] === 't' || cc[0] === 't');
	})

	debug(res);
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
	let data = fs.readFileSync("23_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
