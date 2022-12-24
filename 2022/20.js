
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {
	data = ints(data);
	const L = data.length;
	const inds = data.map((_, i) => i);
	iter(data, (m, i) => {
		let n = mod(inds[i] + m, L - 1);
		if (n === 0) n = L - 1;
		if (inds[i] === n) return;
		const args = inds[i] < n ? [inds[i], n + 1] : [inds[i], n - 1, -1];
		range(...args)(j => {
			const J = inds.findIndex(a => a === j);
			if (J === i) return;
			if (inds[i] < n)
				inds[J] = mod(inds[J] - 1, L - 1);
			else
				inds[J] = mod(inds[J] + 1, inds[J] + 1 !== L - 1 ? L - 1 : L);
		})
		inds[i] = n;
	});
	
	const i = data.findIndex(a => a === 0);
	const i1 = inds.findIndex(ii => ii === mod(inds[i] + 1000, L))
	const i2 = inds.findIndex(ii => ii === mod(inds[i] + 2000, L))
	const i3 = inds.findIndex(ii => ii === mod(inds[i] + 3000, L))
	let res = data[i1] + data[i2] + data[i3];

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	const MUL = 811589153;
	data = ints(data).map(n => n * MUL);
	const L = data.length;
	const inds = data.map((_, i) => i);
	range(10)(_ => {
		debug(_);
		iter(data, (m, i) => {
			let n = mod(inds[i] + m, L - 1);
			if (n === 0) n = L - 1;
			if (inds[i] === n) return;
			const args = inds[i] < n ? [inds[i], n + 1] : [inds[i], n - 1, -1];
			range(...args)(j => {
				const J = inds.findIndex(a => a === j);
				if (J === i) return;
				if (inds[i] < n)
					inds[J] = mod(inds[J] - 1, L - 1);
				else
					inds[J] = mod(inds[J] + 1, inds[J] + 1 !== L - 1 ? L - 1 : L);
			})
			inds[i] = n;
		});
	});

	const i = data.findIndex(a => a === 0);
	const i1 = inds.findIndex(ii => ii === mod(inds[i] + 1000, L))
	const i2 = inds.findIndex(ii => ii === mod(inds[i] + 2000, L))
	const i3 = inds.findIndex(ii => ii === mod(inds[i] + 3000, L))
	let res = data[i1] + data[i2] + data[i3];	

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
