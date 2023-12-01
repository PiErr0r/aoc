
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const F = [
	["PrG", "PrM"],
	["CoG", "CuG", "RuG", "PlG"],
	["CoM", "CuM", "RuM", "PlM"],
	[]
];

const F2 = [
	["PrG", "PrM", "ElG", "ElM", "DiG", "DiM"],
	["CoG", "CuG", "RuG", "PlG"],
	["CoM", "CuM", "RuM", "PlM"],
	[]
];

const stringify = (F) => {
	return F.map(r => r.join('-')).join('#');
}

const unparse = (s) => {
	return s.split('#').map(r => r.split('-').filter(a => a.length));
}

const isViable = (F) => {
	let isGood = true;
	iter(F, f => {
		const G = {}, M = {};
		iter(f, item => {
			if (item[2] === 'G') G[item.slice(0, 2)] = true;
			else M[item.slice(0, 2)] = true;
		});
		const Gk = keys(G);
		iter(keys(M), chip => {
			if (!G[chip] && Gk.length > 0) isGood = false;
		})
		return !isGood;
	})
	return isGood;
}

const isDone = (f, F) => {
	if (f !== 3) return false;
	if (F[3].length !== 10) return false;
	return true;
}

const bfs = (F) => {
	// return;
	iter(F, r => {
		r.sort();
	})
	const q = new Queue();
	q.push([0, stringify(F), 0]);
	const visited = new set();
	let cnt = 0;
	let mn = MOD * 1000;
	while (!q.empty()) {
		let [flr, curr, steps] = q.pop();
		if (isDone(flr, unparse(curr))) mn = min(mn, steps); 
		if (visited.has(`${flr}-${curr}`)) continue;
		visited.add(`${flr}-${curr}`);
		curr = unparse(curr);
		iter([-1, 1], dir => {
			if (flr + dir < 0 || flr + dir > 3) return;
			const combs = [...combinations(curr[flr], 2), ...combinations(curr[flr], 1)];
			if (dir === -1 && curr.slice(0, flr).every(f => f.length === 0)) return;
			iter(combs, comb => {
				const tmp = copy(curr);
				tmp[flr] = tmp[flr].filter(item => comb.indexOf(item) === -1);
				tmp[flr].sort();
				tmp[flr + dir].push(...comb);
				tmp[flr + dir].sort();
				if (isViable(tmp)) q.push([flr + dir, stringify(tmp), steps + 1]);
			})
		})
	}
	return mn;
}

function part1(data) {

	data = copy(F);
	let res = bfs(data);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	// use part 1 to get the answer, then run 11_new.py to get the numbers for perfect first and second part configs
	// use your and their difference in solution for part1 (in this case 6) and add it to the part2 answer
	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("11_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
