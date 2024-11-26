
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

const rearrange = (data) => {
	let mxi = 0;
	iter(data, (n, i) => {
		if (n > data[mxi]) mxi = i;
	});
	const mx = data[mxi];
	data[mxi] = 0;
	let i = (mxi + 1) % data.length;
	let res = mx % data.length;
	while (i !== mxi) {
		data[i] += floor(mx / data.length);
		if (res) {
			++data[i];
			--res;
		}
		i = (i + 1) % data.length;
	}
	data[mxi] = floor(mx / data.length);
}

function part1(data) {

	let res = 0;
	data = ints(data);
	const seen = new set();
	seen.add(data);

	while (true) {
		rearrange(data);
		++res;
		if (seen.has(data)) break;
		seen.add(data)
	}


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = ints(data);
	const seen = new set();
	seen.add(data);

	while (true) {
		rearrange(data);
		++res;
		if (seen[data]) {
			res = res - seen[data];
			break;
		}
		seen[data] = res;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("06_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
