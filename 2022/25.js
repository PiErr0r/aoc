
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

const val = (n, gv = false) => {
	switch (n) {
		case "=": return -2 + gv * 2;
		case "-": return -1 + gv * 2;
		default: return int(n) + gv * 2;
	}
}

const uv = (n) => {
	switch (n) {
		case -2: return "=";
		case -1: return "-";
		case 0: return "0";
		case 1: return "1";
		case 2: return "2";
	}	
}

const unval = (n) => {
	switch (n) {
		case 0: return "=";
		case 1: return "-";
		case 2: return "0";
		case 3: return "1";
		case 4: return "2";
	}
}

const parseVal = (s, gv = false) => {
	let i = s.length - 1;
	let res = 0;
	let pow = 0;
	let base = 5;
	while (i >= 0) {
		res += (base ** pow) * val(s[i], gv);
		--i;
		++pow;
	}
	return res;
}

const unparseVal = (n) => {
	let s = "";
	while (n) {
		s = unval(n % 5) + s;
		n = floor(n / 5);
	}
	return s;
}

function part1(data) {
	data = lines(data);
	let res = 0;
	let nums = [];
	iter(data, ln => {
		let tmp = parseVal(ln);
		res += tmp;
		nums.push(ln.split('').reverse());
	});
	let S = [];
	iter(nums, n => {
		iter(n, (v, i) => {
			if (i === S.length)
				S.push(val(v));
			else
				S[i] += val(v);
		});
	});
	let N = [], C = 0;
	iter(S, n => {
		n += C;
		C = 0
		while (n > 2) {
			n -= 5;
			++C;
		}
		while (n < -2) {
			n += 5;
			--C;
		}
		N.push(uv(n));
	});

	res = N.reverse().join("");
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
