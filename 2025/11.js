
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle, rangeOverlap } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { binSearch, Counter, DD, empty, FastQueue, PriorityQueue, Queue, RBTree, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const dfs = (G, curr, goal) => {
	if (curr === goal) {
		return 1;
	}
	if (!(curr in G)) return 0;
	if (G[curr].cnt) return G[curr].cnt
	iter(G[curr].tos, child => {
		G[curr].cnt += dfs(G, child, goal);
	})
	return G[curr].cnt;
}

function part1(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, row => {
		const [from, ...tos] = row.replace(':', '').split(' ');
		G[from] = { cnt: 0, tos };
	});
	dfs(G, 'you', 'out');
	res = G['you'].cnt

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const dfs2 = (G, curr, goal) => {
	if (curr === goal) {
		if (prnt) debug("here")
		return 1;
	}
	if (!(curr in G)) {
		G[curr].cnt = -1;
		return 0;
	}
	if (G[curr].cnt) return max(0, G[curr].cnt);
	let cnt = 0;
	iter(G[curr].tos, child => {
		const res = dfs(G, child, goal);
		if (res === -1) ++cnt;
		else G[curr].cnt += res;
	})
	if (G[curr].tos.length === cnt) {
		G[curr].cnt = -1;
		return 0;
	}
	return max(0, G[curr].cnt);
}

const reversed = (G) => {
	const res = {}
	iter(keys(G), k => {
		iter(G[k].tos, node => {
			if (!(node in res)) {
				res[node] = { tos: [], cnt: 0 };
			}
			res[node].tos.push(k);
		})
	})
	return res;
}

function part2(data) {

	let res = 0;
	data = lines(data);
	const G = {};
	iter(data, row => {
		const [from, ...tos] = row.replace(':', '').split(' ');
		G[from] = { tos, cnt: 0 };
	});
	const copyObj = o => JSON.parse(JSON.stringify(o));
	let G_ = copyObj(G);
	const dac2out = dfs2(G_, 'dac', 'out', new set());
	G_ = copyObj(G);
	const fft2out = dfs2(G_, 'fft', 'out', new set());
	G_ = copyObj(G);
	const dac2fft = dfs2(G_, 'dac', 'fft', new set());
	G_ = copyObj(G);
	const fft2dac = dfs2(G_, 'fft', 'dac', new set());
	G_ = copyObj(G);
	const svr2dac = dfs2(G_, 'svr', 'dac', new set());
	G_ = reversed(copyObj(G));
	const svr2fft = dfs(G_, 'fft', 'svr');
	res = svr2fft * fft2dac * dac2out + svr2dac * dac2fft * fft2out;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
