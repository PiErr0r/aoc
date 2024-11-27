
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

const getVal = (R, n) => {
	n = n.trim();
	if (isNaN(num(n))) return R[n];
	else return num(n);
}

const OP1 = {
	'snd': (R, x) => (R.play = getVal(R, x)),
	'set': (R, x, y) => (R[x] = R[x] = getVal(R, y)),
	'add': (R, x, y) => (R[x] = R[x] + getVal(R, y)),
	'mul': (R, x, y) => (R[x] = R[x] * getVal(R, y)),
	'mod': (R, x, y) => (R[x] = R[x] % getVal(R, y)),
	'rcv': (R, x) => (getVal(R, x) ? R.play : null),
	'jgz': (R, x, y) => (getVal(R, x) > 0 ? getVal(R, y) : 1) 
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%w %w%.")
	const R = new DD();
	let curr = 0;
	while (true) {
		const op = data[curr][0];
		const tmp = OP1[op](R, ...data[curr].slice(1));
		if (op === 'rcv') {
			res = tmp;
			break;
		} else if (op === 'jgz') {
			curr = mod(curr + tmp, data.length)
		} else {
			++curr;
		}
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const OP = {
	'snd': (R, x, _, p) => (R[nxt(p)].msg.push(getVal(R[p], x))),
	'set': (R, x, y) => (R[x] = R[x] = getVal(R, y)),
	'add': (R, x, y) => (R[x] = R[x] + getVal(R, y)),
	'mul': (R, x, y) => (R[x] = R[x] * getVal(R, y)),
	'mod': (R, x, y) => (R[x] = R[x] % getVal(R, y)),
	'rcv': (R, x) => (R.msg.empty() ? (R.dead = true) : (R[x] = R.msg.pop())),
	'jgz': (R, x, y) => (getVal(R, x) > 0 ? getVal(R, y) : 1) 
}

const nxt = (X) => X === 'A' ? 'B' : 'A';

function part2(data) {

	let res = 0;
	data = scanf(data, "%w %w%.")
	const R = { A: new DD(), B: new DD() };
	R.A.msg = new Queue();
	R.A.dead = false;
	R.A.p = 0;
	R.B.msg = new Queue();
	R.B.p = 1;
	R.B.dead = false;

	let curr = { A: 0, B: 0 };
	let prog = 'A';
	while (true) {
		const op = data[curr[prog]][0];
		const tmp = OP[op]((op === 'snd' ? R : R[prog]), ...data[curr[prog]].slice(1), prog);
		if (op === 'snd' && prog === 'B') ++res;
		if (op === 'jgz') {
			curr[prog] = mod(curr[prog] + tmp, data.length)
		} else {
			if (op === 'rcv' && R[prog].dead) --curr[prog];
			if (op === 'snd') {
				R[nxt(prog)].dead = false;
			}
			++curr[prog];
		}
		if (R[prog].dead) prog = nxt(prog);
		if (R.A.dead && R.B.dead) break;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
