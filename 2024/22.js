
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

const prune = n => mod(n, 16777216);
const mix = (a, b) => a ^ b;

const calc1 = n => prune(mix(n, n * 64));
const calc2 = n => prune(mix(n, floor(n / 32)));
const calc3 = n => prune(mix(n, n * 2048));
const calc = n => calc3(calc2(calc1(n)));

function part1(data) {

	let res = 0;
	data = ints(data);
	iter(data, n => {
		range(2000)(_ => {
			n = calc(n)
		})
		res += n;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = ints(data);
	const nD = new DD();
	iter(data, (n, i) => {
		const seen = new set();
		const W = [0];
		let prev = n%10;
		range(2000)(_ => {
			n = calc(n);
			W.push(n%10 - prev%10);
			prev = n;
			if (W.length === 5) {
				W.shift();
				if (!seen.has(W)) {
					seen.add(W);
					nD[W] += n % 10;
				}
			}
		})
	})

	iter(keys(nD), k => {
		res = max(res, nD[k])
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
