
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

const visit = (G, seen, id) => {
	if (seen.has(id)) return;
	seen.add(id);
	iter(G[id], child => {
		visit(G, seen, child);
	});
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%d <-> %.");
	const G = {};
	iter(data, ([id, connects]) => {
		connects = connects.split(', ').map(n => int(n));
		if (!G[id]) G[id] = new set();
		iter(connects, child => {
			G[id].add(child);
			if (!G[child]) G[child] = new set();
			G[child].add(id);
		});
	});

	const seen = new set()
	visit(G, seen, 0);
	res = seen.size;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = scanf(data, "%d <-> %.");
	const G = {};
	let all = new set();
	iter(data, ([id, connects]) => {
		all.add(id);
		connects = connects.split(', ').map(n => int(n));
		if (!G[id]) G[id] = new set();
		iter(connects, child => {
			G[id].add(child);
			if (!G[child]) G[child] = new set();
			G[child].add(id);
		});
	});

	while(all.size) {
		let val;
		iter(all, v => {
			val = v;
			return true;
		});
		const seen = new set();
		visit(G, seen, val);
		all = sub(all, seen);
		++res;
	}


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("12_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
