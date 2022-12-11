
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib/itertools");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const OPS = { '*': (a, b) => a * b, '+': (a, b) => a + b };

function part1(data) {

	data = groups(data);
	const M = empty(data.length).map(_ => ({ items: [], num: 0, op: null, test: null, T: null, F: null }));
	const todo = [];
	iter(data, (monkey, i) => {
		let [m, its, op, test, T, F] = monkey;
		m = int(m.replace('Monkey', '').replace(':', '').trim());
		its = ints(its.split(':')[1].trim())
		M[i].items = [...its];
		op = op.split('=')[1].trim();
		let [l, s, r] = op.split(' ');
		M[i].op = [l === 'old' ? l : int(l), s, r === 'old' ? r : int(r)];
		test = int(test.trim().split(' ')[3]);
		M[i].test = test;
		T = int(T.trim().split(' ')[5]);
		F = int(F.trim().split(' ')[5]);
		M[i].T = T; M[i].F = F;
	})
	const primes = prod(M.map(m => m.test));
	range(20)(round => {
		iter(M, monkey => {
			const [l, s, r] = monkey.op;
			monkey.num += monkey.items.length;
			iter(monkey.items, item => {
				item = OPS[s](l === 'old' ? item : l, r === 'old' ? item : r);
				item = int(item / 3);
				if (item % monkey.test === 0) {
					M[monkey.T].items.push(item);
				} else {
					M[monkey.F].items.push(item);
				}
			});
			monkey.items = [];

		})
	})
	const mxs = M.map(m => m.num)
	sort(mxs, (a, b) => b - a)
	let res = mxs[0] * mxs[1];

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = groups(data);
	const M = empty(data.length).map(_ => ({ items: [], num: 0, op: null, test: null, T: null, F: null }));
	const todo = [];
	iter(data, (monkey, i) => {
		let [m, its, op, test, T, F] = monkey;
		m = int(m.replace('Monkey', '').replace(':', '').trim());
		its = ints(its.split(':')[1].trim())
		M[i].items = [...its];
		op = op.split('=')[1].trim();
		let [l, s, r] = op.split(' ');
		M[i].op = [l === 'old' ? l : int(l), s, r === 'old' ? r : int(r)];
		test = int(test.trim().split(' ')[3]);
		M[i].test = test;
		T = int(T.trim().split(' ')[5]);
		F = int(F.trim().split(' ')[5]);
		M[i].T = T; M[i].F = F;
	})
	const primes = prod(M.map(m => m.test));
	range(10000)(round => {
		iter(M, monkey => {
			const [l, s, r] = monkey.op;
			monkey.num += monkey.items.length;
			iter(monkey.items, item => {
				item = OPS[s](l === 'old' ? item : l, r === 'old' ? item : r);
				item = item % primes;
				if (item % monkey.test === 0) {
					M[monkey.T].items.push(item);
				} else {
					M[monkey.F].items.push(item);
				}
			});
			monkey.items = [];

		})
	})
	const mxs = M.map(m => m.num)
	sort(mxs, (a, b) => b - a)
	let res = mxs[0] * mxs[1];

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("11_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
