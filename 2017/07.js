
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

function part1(data) {

	let res = 0;
	data = scanf(data, "%w (%d)%.")
	const G = {};
	iter(data, ([name, w, holds]) => {
		if (holds.length) {
			holds = holds.slice(4).split(', ');
		}
		if (name in G) {
			G[name].w = w;
			G[name].children = [...holds];
		} else {
			G[name] = {
				w,
				parent: null,
				children: [...holds]
			}
		}
		if (!holds) return;
		holds.forEach(h => {
			if (h in G) {
				G[h].parent = name;
			} else {
				G[h] = { parent: name, children: null };
			}
		})
	})
	iter(keys(G), k => {
		if (!G[k].parent) {
			res = k;
			return true;
		}
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(G, res);
	return;
}

const calcW = (G, name) => {
	if (!G[name].children) return 0;
	let sm = G[name].w;
	iter(G[name].children, child => {
		sm += calcW(G, child);
	});
	G[name].total = sm;
	return sm;
}

const calcFix = (G, name) => {

}

const findFaulty = (G, name) => {
	if (!G[name].children) return -1;
	let sm = {};
	iter(G[name].children, child => {
		if (G[child].total in sm) {
			sm[ G[child].total ][0]++;
		} else {
			sm[ G[child].total ] = [1, child];
		}
	});
	if (keys(sm).length !== 1) {
		const [a, b] = keys(sm);
		const k = sm[a][0] === 1 ? a : b;
		const kk = k === a ? b : a;
		const toFix = findFaulty(G, sm[k][1]);
		if (toFix !== -1) return toFix;
		const diff = int(kk) - int(k);
		return G[ sm[k][1] ].w + diff;
	} else {
		return -1;
	}
}

function part2(G, bottom) {

	let res = 0;

	calcW(G, bottom);
	res = findFaulty(G, bottom);
	
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	part1(data);
	process.exit(0);
}

main();
