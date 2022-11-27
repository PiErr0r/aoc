
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
const { getExecStr } = require("../lib/post");
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

const OPS = {
	AND: (v1, v2) => v1 & v2,
	LSHIFT: (v1, v2) => v1 << v2,
	OR: (v1, v2) => v1 | v2,
	RSHIFT: (v1, v2) => v1 >> v2,
}

const evaluate = (c, key) => {
	let op = c[key];
	switch (op.length) {
		case 1:  {
			let val = int(op[0]);
			if (isNaN(val))
				val = evaluate(c, op[0])
			c[key] = [val];
			return c[key][0];
		}
		case 2: {
			const [_, n] = op;
			let val = int(n);
			if (isNaN(val))
				val = evaluate(c, n);
			c[key] = [(~val)>>>0 & 0xffff];
			return c[key][0];
		}
		case 3: {
			const [v1, o, v2] = op;
			let val1 = int(v1);
			if (isNaN(val1))
				val1 = evaluate(c, v1);
			let val2 = int(v2);
			if (isNaN(val2))
				val2 = evaluate(c, v2);
			c[key] = [OPS[o](val1, val2)];
			return c[key][0];
		}
		default: {
			console.log("BAD!!!", op.length, op);
			return null;
		}
	}
}

function part1(data) {
	const original = data;
	data = parse(data, "W-> w")
	const c = {};
	iter(data, ([ops, set]) => {
		ops = ops.split(' ');
		c[set] = ops;
	});
	// debug("HERE")
	let res = evaluate(c, 'a');
	// debug(c)

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	part2(original, res);
	return;
}

function part2(data, override) {
	data = parse(data, "W-> w");
	const c = {};	
	iter(data, ([ops, set]) => {
		ops = ops.split(' ');
		c[set] = ops;
	});
	c['b'] = [override];
	let res = evaluate(c, 'a');

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
