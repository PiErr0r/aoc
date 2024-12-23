
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
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
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const NUM = {
	7: [0, 0], 8: [0, 1], 9: [0, 2],
	4: [1, 0], 5: [1, 1], 6: [1, 2],
	1: [2, 0], 2: [2, 1], 3: [2, 2],
	_: [3, 0], 0: [3, 1], A: [3, 2],
}

const DIR = {
	'_': [0, 0], '^': [0, 1], 'A': [0, 2],
	'<': [1, 0], 'v': [1, 1], '>': [1, 2],	
}

const MAP = {
	'-1,0': '^',
	'1,0': 'v',
	'0,1': '>',
	'0,-1': '<',
	'0,0': '',
}

const REVMAP = {
	'^': [-1, 0],
	'v': [ 1, 0],
	'>': [ 0, 1],
	'<': [ 0,-1],
}

const num2dir = code => {
	let res = [];
	let [y, x] = NUM['A'];
	iter(code, c => {
		const [gy, gx] = NUM[c];
		const [dy, dx] = [gy - y, gx - x];
		const diry = MAP[[sign(dy), 0]];
		const dirx = MAP[[0, sign(dx)]];
		if (diry === dirx && diry === '') {
			res += 'A';
			return;
		}
		let tmp = '';
		range(abs(dy))(i => {
			tmp += diry;
		})
		range(abs(dx))(i => {
			tmp += dirx;
		})
		tmp = tmp.split('').sort();
		res.push(unique_permutations(tmp).map(r => (Array.isArray(r) ? r.join('') : r) + 'A'));
		y += dy;
		x += dx;
	})
	return res;
}

const dir2dir = (code, P = true) => {
	let res = [];
	let [y, x] = DIR['A'];
	iter(code, c => {
		const [gy, gx] = DIR[c];
		const [dy, dx] = [gy - y, gx - x];
		const diry = MAP[[sign(dy), 0]];
		const dirx = MAP[[0, sign(dx)]];
		let tmp = ''
		range(abs(dy))(i => {
			tmp += diry;
		})
		range(abs(dx))(i => {
			tmp += dirx;
		})
		if (P) {
			tmp = tmp.split('').sort();
			res.push(unique_permutations(tmp).map(r => (Array.isArray(r) ? r.join('') : r) + 'A'));
		} else
			res.push(tmp + 'A')
		y += dy;
		x += dx;
	})
	return P ? res : res.join('');
}

const joinDirs = poss => {
	res = [''];
	iter(poss, p => {
		if (p.length === 0) {
			range(res.length)(i => {
				res[i] += 'A';
			})
			return;
		}
		const L = res.length;
		if (p.length > 1) {
			range(p.length - 1)(k => {
				range(L)(i => {
					res.push(res[i] + p[k + 1])
				})	
			})
		}
		range(L)(i => {
			res[i] += p[0];
		})
	})
	return res;
}

const canBe = (tryed, D) => {
	let can = true;
	const _ = '_';
	let [y, x] = D['A']
	iter(tryed, c => {
		if (c === 'A') return;
		const [dy, dx] = REVMAP[c];
		[y, x] = [y + dy, x + dx];
		if (D[_][0] === y && D[_][1] === x)
			can = false;
		return !can;
	})
	return can;
}

function part1(data) {

	let res = 0;
	data = lines(data)

	iter(data, code => {
		const dir1 = num2dir(code);
		const poss1 = joinDirs(dir1);
		let mn = MOD;
		iter(poss1, p => {
			if (!canBe(p, NUM)) return
			const dir2 = dir2dir(dir2dir(p, false), false);
			mn = min(mn, dir2.length)
		})
		res += mn * int(code.slice(0, 3))
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const solve = (a, b) => {
	// debug(a, b)
	const [ay, ax] = DIR[a];
	const [by, bx] = DIR[b];
	const [dy, dx] = [by - ay, bx - ax];
	const diry = MAP[[sign(dy), 0]];
	const dirx = MAP[[0, sign(dx)]];
	let res = ''
	range(abs(dy))(i => {
		res += diry;
	})
	range(abs(dx))(i => {
		res += dirx;
	})
	return res;
}

let MEMO = {};
const spread = (a, b, depth) => {
	if (depth === 0) return 1n;
	if (MEMO[[a, b, depth]]) return MEMO[[a, b, depth]];

	const path = solve(a, b);
	let res = BigInt(MOD) * 10000n;
	const uniq = unique_permutations(path);
	uniq.forEach(p => {
		const s = [].concat(p).concat('A').join('');
		if (!canBe(s, DIR)) {
			console.log("---");
			return
		}
		const tmp = solvePath(s, depth - 1);
		res = tmp < res ? tmp : res;
	})
	// debug({path, a, b, depth})
	// const res = solvePath(path, depth - 1);
	// let res = 0;
	// range(1, path.length)(i => {
	// 	const tmp = spread(path[i - 1], path[i], depth - 1);
	// 	res += tmp + 1;
	// })
	MEMO[[a, b, depth]] = res;
	return res;
}

const solvePath = (code, n) => {
	if (code.length === 0) return 1n;
	// if (n === 0) return code.length;
	let prev = 'A';
	let res = 0n;
	iter(code, c => {
		res += spread(prev, c, n);
		// debug('!',code, prev, c, res)
		prev = c;
	})
	return res;
}

function part2(data) {
	// 252473394928452
	// 153978647339378
	// 501464
	let res = 0n;
	data = lines(data);
	data = ['169A'];
	// debug(solve('<', 'A'))
	// return;
	iter(data, code => {
		const cdir = num2dir(code);
		const cposs = joinDirs(cdir);
		let mn = BigInt(MOD) * 1000000n;
		iter(cposs, p => {
			if (!canBe(p, NUM)) return;
			let dd = solvePath(p, 3);
			// debug(dd, mn)
			mn = mn < dd ? mn : dd;
		})
		debug(code, mn, int(code.slice(0, 3)))
		// debug(dir2dir(dir2dir(cposs[0], false), false).length)
		res += mn * BigInt(int(code.slice(0, 3)));
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
