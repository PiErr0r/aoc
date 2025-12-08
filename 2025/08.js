
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

const distance = ([x1, y1, z1], [x2, y2, z2]) => {
	return sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
}

const factory = () => {
	let i = 0;
	return () => i++;
}

const connectCircuits = (D, i, j) => {
	const dj = D[j];
	iter(keys(D), k => {
		if (D[k] === dj) D[k] = D[i];
	})
}

const countLargest = D => {
	const A = new DD(0);
	iter(keys(D), k => {
		A[D[k]]++;
	})
	const V = values(A);
	sort(V, (a, b) => b-a);
	const [a, b, c] = V.slice(0, 3);
	return a * b * c;
}

function part1(data) {

	let res1 = 0;
	let res2 = 0;
	let N = 1000;
	data = scanf(data, "%d,%d,%d");
	const idGen = factory();
	const G = [];
	const D = {}
	iter(data, (v1, i) => {
		D[i] = idGen();
		iter(data.slice(i + 1), (v2, j) => {
			const d = distance(v1, v2);
			G.push([d, i, i + 1 + j]);
		})
	})
	G.sort((a, b) => a[0] - b[0]);

	iter(G, ([d, i, j], ii) => {
		if (ii === N) {
			res1 = countLargest(D);
		}
		if (D[i] === D[j]) return;
		connectCircuits(D, i, j);
		if (keys(D).every(k => D[k] === D[0])) {
			res2 = data[i][0] * data[j][0];	
			return 1;
		}
	})
	
	debug(res1);
	console.log("END OF PART1");
	debug(res2)
	if (res2) exec(`echo ${res2} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
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
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
