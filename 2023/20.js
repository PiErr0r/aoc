
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

function part1(data, part = 1) {

	let res = 0;
	data = lines(data);
	const cfg = {};
	iter(data, l => {
		let [modul, out] = l.split('->').map(a => a.trim());
		out = out.split(', ');
		const mode = modul[0];
		modul = mode === 'b' ? modul : modul.slice(1);
		cfg[modul] = { mode, out, mem: null, v: {}, cycle: -1 };
	});
	iter(keys(cfg), k => {
		if (cfg[k].mode !== '&') {
			cfg[k].state = false;
			return;
		}
		const input = {};
		iter(keys(cfg), kk => {
			if (cfg[kk].out.indexOf(k) !== -1) {
				input[kk] = false;
			}
		});
		cfg[k].mem = input;
		cfg[k].state = true;
	})
	let l = 0, h = 0;
	let cnt = 0;
	let done = false
	const RES = { sg: null, lm: null, dh: null, db: null };
	let resCnt = 0;
	while (!done) {
		const q = new Queue();
		q.push('broadcaster');
		++l;
		while (!done && !q.empty()) {
			const s = q.pop();
			const curr = cfg[s].state;
			iter(cfg[s].out, k => {
				if (curr) ++h;
				else ++l;
				if (s in RES && RES[s] === null && curr) {
					RES[s] = cnt + 1;
					++resCnt;
				}
				if (part === 2 && resCnt === 4) {
					res = prod(keys(RES).map(k => RES[k]));
					done = true;
					return done;
				}
				if (!(k in cfg)) return;
				if (cfg[k].mode === '%') {
					if (curr) return;
					cfg[k].state = !cfg[k].state;
				} else {
					cfg[k].mem[s] = curr;
					cfg[k].state = !keys(cfg[k].mem).every(ii => cfg[k].mem[ii]);
				}
				q.push(k);
			})
		}
		if (part === 1 && cnt === 999) {
			res = h * l;
			done = true;
		}
		++cnt;
	}

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data);
	part1(data, 2);
	process.exit(0);
}

main();
