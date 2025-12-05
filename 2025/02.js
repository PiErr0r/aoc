
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

const next10 = (n) => 10 ** (floor(log10(n)) + 1);

const invalidID = (a, b) => {
	console.assert(next10(a) === next10(b));
	if (floor(log10(a)) % 2 === 0) return 0;
	const n = 10 ** (floor(log10(a) / 2) + 1);
	const la = floor(a / n);
	const lb = floor(b / n);
	const ra = a % n;
	const rb = b % n;
	let res = 0;
	range(la, lb + 1)(i => {
		if (i * n + i < a) return;
		if (i * n + i > b) return;
		res += i * n + i;
	})
	return res;
}

const construct = (n, repeat) => {
	const sn = n + "";
	return int(empty(repeat).map(a => sn).join(""))
}

const invalidIDext = (a, b) => {
	const used = new set();
	let res = 0;
	const n = floor(log10(a)) + 1;
	range(1, floor(n / 2) + 1)(i => {
		if (n % i !== 0) return;
		const mn = int((a + '').slice(0, i))
		const mx = int((b + '').slice(0, i))
		range(mn, mx + 1)(j => {
			const m = construct(j, int(n / i));
			if (used.has(m) || m < a || m > b) return;
			res += m;
			used.add(m);
		})
	})
	return res;
}

function part1(data) {

	let res = 0;
	data = data.split(',').join('\n');
	data = scanf(data, '%d-%d')
	iter(data, ([a, b]) => {
		let fst = a;
		let snd = next10(a);
		const last = next10(b);
		while (snd <= last) {
			res += invalidID(fst, min(b, snd - 1))
			fst = snd;
			snd = next10(snd + 1)
		}
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = data.split(',').join('\n');
	data = scanf(data, '%d-%d')
	iter(data, ([a, b]) => {
		let fst = a;
		let snd = next10(a);
		const last = next10(b);
		while (snd <= last) {
			res += invalidIDext(fst, min(b, snd - 1))
			// debug(res)
			fst = snd;
			snd = next10(snd + 1)
		}
	})
	debug(res); //4174379265
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("02_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
