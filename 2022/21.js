
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

const OPS = { '+': (a,b)=>a+b, '-': (a,b)=>a-b, '*': (a,b)=>a*b, '/': (a,b)=>a/b, '=': (a,b)=>a===b };

const getOp = (op) => {
	const [a, s, b] = op.split(' ');
	return [false, a, OPS[s], b];
}

const solve = (M, path) => {
	// debug(path, M[path])
	if (M[path][0]) {
		return M[path][1];
	} else {
		// debug(path)
		const [_, a, op, b] = M[path];
		const A = solve(M, a);
		const B = solve(M, b);
		// debug(path, A, B, op(A, B))
		if (path === 'root' && op(1,1) === true) {
			debug(A, "===", B);
		}
		return op(A, B);
	}
}

function part1(data) {
	data = lines(data)
		.map(m => m.split(':'))
		.map(([m, y]) => [m, y.trim()]);
	
	const M = data.reduce((acc, curr) => {
		const [m, y] = curr;
		if (isNaN(int(y))) {
			acc[m] = getOp(y);
		} else {
			acc[m] = [true, int(y)];
		}
		return acc;
	}, {});

	let res = solve(M, 'root');

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = lines(data)
		.map(m => m.split(':'))
		.map(([m, y]) => [m, y.trim()]);
	
	const M = data.reduce((acc, curr) => {
		const [m, y] = curr;
		if (isNaN(int(y))) {
			acc[m] = getOp(y);
		} else {
			acc[m] = [true, int(y)];
		}
		return acc;
	}, {});

	// binary search by digit by hand
	M['root'][2] = OPS['='];
	M['humn'] = [true, 3220993874133];
	solve(M, 'root');

	let res = 3220993874133;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("21_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
