
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
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const checkOrder = (P, data, i) => {
	const curr = data[i];
	for (let j = 0; j < i; ++j) {
		if (!P[curr].before.has(data[j]))
			return false;
	}

	for (let j = i + 1; j < data.length; ++j) {
		if (!P[curr].after.has(data[j]))
			return false;
	}

	return true;
}

function part1(data) {

	let res1 = 0, res2 = 0;
	let [pageOrder, pageProduce] = getGroups(data);
	pageOrder = scanf(pageOrder, "%d|%d");
	pageProduce = lines(pageProduce).map(l => ints(l))
	
	const P = new DD(set)
	pageOrder.forEach(([pre, post]) => {
		P[post].add(pre);
	})

	iter(pageProduce, r => {
		let cnt = true;
		let prev = null;
		iter(r, c => {
			if (prev === null) {
				prev = c;
				return;
			}
			cnt &&= P[c].has(prev);
			prev = c;
		})
		if (cnt) 
			res1 += r[floor(r.length / 2)];
		else {
			sortRow(P, r);
			res2 += r[floor(r.length / 2)];
		}
	})

	debug(res1);
	console.log("END OF PART1");
	debug(res2);
	console.log("END OF PART2")
	return;
}

const sortRow = (P, r) => {
	sort(r, (a, b) => P[a].has(b) ? 1 : -1)
}

function part2(data) {

	let res = 0;
	let [pageOrder, pageProduce] = getGroups(data);
	pageOrder = scanf(pageOrder, "%d|%d");
	pageProduce = lines(pageProduce).map(l => ints(l))
	
	const P = {}
	pageOrder.forEach(([pre, post]) => {
		if (pre in P) {
			P[pre].after.add(post);
		} else {
			P[pre] = { after: new set([post]), before: new set() }
		}
		if (post in P) {
			P[post].before.add(pre);
		} else {
			P[post] = { after: new set(), before: new set([pre]) }
		}
	})

	iter(pageProduce, r => {
		let cnt = true;
		range(1, r.length)(i => {
			cnt &&= P[ r[i] ].before.has(r[i - 1]);
		});
		if (!cnt) {
			sortRow(P, r);
			res += r[floor(r.length / 2)];
		}
	})
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
