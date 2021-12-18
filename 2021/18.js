
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

const isa = (a) => Array.isArray(a);

const findExplode = (n) => {
	const L = isa(n[0]) ? [0, ...findExplode(n[0])] : [];
	const R = isa(n[1]) ? [1, ...findExplode(n[1])] : [];
	return L.length >= 4 ? L : R.length >= 4 ? R : L.length >= R.length ? L : R;
}

const addLR = (data, i, n, lr) => {
	if (!isa(data[i][lr])) {
		data[i][lr] += n;
	} else {
		addLR(data[i], lr, n, lr);
	}
}

const explode = (data, ex) => {
	if (ex.length) {
		let [l, r] = explode(data[ex[0]], ex.slice(1));
		if (ex.length === 1) 
			data[ ex[0] ] = 0;
	
		if (ex[0] === 1 && l) {
			if (isa(data[0])) {
				addLR(data, 0, l, 1);
			} else {
				data[0] += l;
			}
			return [0, r];
		} else if (ex[0] === 0 && r) {
			if (isa(data[1])) {
				addLR(data, 1, r, 0);
			} else {
				data[1] += r;
			}
			return [l, 0];
		}
		return [l, r];
	}
	return [...data];
}

const findSplit = (n) => {
	if (!isa(n[0]) && n[0] >= 10) {
		return [true, [0]];
	}
	if (!isa(n[1]) && n[1] >= 10) {
		const [foundL, L] = findSplit(n[0]);
		return foundL ? [foundL, [0, ...L]] : [true, [1]]	
	}
	if (!isa(n[0]) && !isa(n[1]))
		return [false, []]
	const [foundL, L] = findSplit(n[0]);
	const [foundR, R] = findSplit(n[1]);
	return foundL ? [true, [0, ...L]] : foundR ? [true, [1, ...R]] : [false, []];
}

const split = (data, sp) => {
	if (sp.length > 1) {
		split(data[ sp[0] ], sp.slice(1));
		return;
	}

	const n = data[ sp[0] ];
	const L = floor(n / 2);
	const R = ceil(n / 2);
	data[ sp[0] ] = [L, R];
}

const magnitude = (n) => {
	const L = isa(n[0]) ? magnitude(n[0]) : n[0];
	const R = isa(n[1]) ? magnitude(n[1]) : n[1];
	return 3 * L + 2 * R;
}

const addNums = (a, b) => {
	let curr = [a, b];
	let didExplode = false, didSplit = false, couldExplode = false;
	do {
		couldExplode = false;
		do {
			didExplode = false;
			const toExplode = findExplode(curr);
			if (toExplode.length >= 4) {
				explode(curr, toExplode);
				didExplode = true;
			}
		} while (didExplode);
		const [found, toSplit] = findSplit(curr);
		if (found) {
			split(curr, toSplit);
			couldExplode = true
		}
	} while (couldExplode);
	return curr;
}

function part1(data) {

	data = lines(data).map(l => eval(l))
	let res;

	let curr = data[0], i = 0;
	iter(data.slice(1), op => {
		curr = addNums(curr, op);
	})

	res = magnitude(curr);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const cpy = (s) => JSON.parse(JSON.stringify(s));

function part2(data) {
	data = lines(data).map(l => eval(l));
	let res = 0;
	diter(data,(a, b, i, j) => {
		if (i === j) return;
		a = cpy(a); b = cpy(b);
		const tmp = magnitude(addNums(a, b));
		res = max(res, tmp);
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("18_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
