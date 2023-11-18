
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

const OPS = {
	addr: (a, b, c, R) => (R[c] = R[a] + R[b]),
	addi: (a, b, c, R) => (R[c] = R[a] + b),
	mulr: (a, b, c, R) => (R[c] = R[a] * R[b]),
	muli: (a, b, c, R) => (R[c] = R[a] * b),
	banr: (a, b, c, R) => (R[c] = R[a] & R[b]),
	bani: (a, b, c, R) => (R[c] = R[a] & b),
	borr: (a, b, c, R) => (R[c] = R[a] | R[b]),
	bori: (a, b, c, R) => (R[c] = R[a] | b),
	setr: (a, b, c, R) => (R[c] = R[a]),
	seti: (a, b, c, R) => (R[c] = a),
	gtir: (a, b, c, R) => (R[c] = a > R[b] ? 1 : 0),
	gtri: (a, b, c, R) => (R[c] = R[a] > b ? 1 : 0),
	gtrr: (a, b, c, R) => (R[c] = R[a] > R[b] ? 1 : 0),
	eqir: (a, b, c, R) => (R[c] = a === R[b] ? 1 : 0),
	eqri: (a, b, c, R) => (R[c] = R[a] === b ? 1 : 0),
	eqrr: (a, b, c, R) => (R[c] = R[a] === R[b] ? 1 : 0),
}

const isEq = (R1, R2) => {
	return R1.every((r, i) => r === R2[i]);
}

function part1(data) {

	data = groups(data)
	let res = 0;

	iter(data, (group, gi) => {
		if (gi === data.length - 1) return;
		const [before, op, after] = group.map(l => l.split(' ').map(n => int(n)));
		let cnt = 0;
		iter(OPS, OP => {
			const bc = copy(before);
			const [_, a, b, c] = op;
			OP(a, b, c, bc);
			if (isEq(bc, after)) ++cnt;
		})
		if (cnt >= 3) ++res;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const resolve = (ops) => {
	const done = new set();
	while (!keys(ops).every(k => ops[k].size === 1)) {
		const singleKey = keys(ops).find(k => ops[k].size === 1 && !done.has(k));
		const single = [...ops[singleKey]][0];
		iter(keys(ops), k => {
			if (ops[k].size === 1) return;
			ops[k].delete(single);
		});

		done.add(singleKey);
	}
}

function part2(data) {

	data = groups(data);
	const prog = data[data.length - 1];
	data = data.slice(0, data.length - 1);

	let res = 0;

	let ops = {};
	const all = new set();
	range(keys(OPS).length)(i => {
		ops[i] = new set();
	});
	iter(data, (group, gi) => {
		if (gi === data.length - 1) return;
		const [before, op, after] = group.map(l => l.split(' ').map(n => int(n)));
		const [opId, a, b, c] = op;
		let cnt = 0;
		const couldBe = new set();
		iter(keys(OPS), OP => {
			const bc = copy(before);
			OPS[OP](a, b, c, bc);
			if (isEq(bc, after)) couldBe.add(OP)
		});
		if (ops[opId].size === 0) {
			ops[opId] = new set([...couldBe]);
		} else {
			ops[opId] = and(ops[opId], couldBe);
		}
	})

	resolve(ops);
	const opps = keys(ops).reduce((acc, curr) => {
		acc[curr] = OPS[[...ops[curr]][0]];
		return acc;
	}, {})

	const R = [0, 0, 0, 0];
	iter(prog, pp => {
		const [op, a, b, c] = pp.split(' ').map(n => int(n))
		opps[op](a, b, c, R);
	})
	res = R[0]
	debug(res);

	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("16_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
