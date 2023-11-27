
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const parseData = data => lines(data).map(r => r.split(' ')).map(r => {
		switch (r[0]) {
		case 'cut':
			return ['c', int(r[1])]
			break;
		case 'deal':
			if (r[1] === 'with') {
				return ['i', int(r[3])]
			} else {
				return ['s', -1];
			}
			break;
		default: return console.log("BAD SWITCH")
		}
	});

// const N = 10;
const N = 10007;

function part1(data) {

	let res = 0;
	data = parseData(data);

	let cards = empty(N).map((_, i) => i);
	iter(data, ([s, i]) => {
		switch (s) {
		case 'c':
			const w = mod(i, cards.length);
			cards = [...cards.slice(w), ...cards.slice(0, w)];
			break;
		case 'i':
			const tmp = empty(N);
			let j = 0;
			range(N)(k => {
				tmp[j] = cards[k];
				j = mod(j + i, N);
			})
			cards = tmp;
			break;
		case 's':
			cards.reverse();
			break;
		}
	})

	res = cards.findIndex(a => a === 2019)
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

// https://codeforces.com/blog/entry/72593
function part2(data) {
	let n = 119315717514047n;
	let shuffle = 101741582076661n;
	data = parseData(data);
	let a = 1n, b = 0n;
	let res = 0;

	iter(data, ([s, i]) => {
		let na, nb;
		switch (s) {
		case 'c':
			na = 1n;
			nb = -BigInt(i);
			break;
		case 'i':
			na = BigInt(i);
			nb = 0n;
			break;
		case 's':
			na = -1n;
			nb = -1n;
		}
		a = mod(mod(a * na, n), n);
		b = mod(mod(b * na + nb, n), n);
	})
	
	let ak = modPowBig(a, shuffle, n)
	let bk = b * (1n - ak); 
	bk = bk * modPowBig(1n - a, n - 2n, n);
	res = (2020n - bk);
	res = mod((2020n - bk) * modPowBig(ak, n - 2n, n), n);
	
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
