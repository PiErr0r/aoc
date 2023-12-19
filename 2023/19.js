
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
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

ALPHA_L = "abcdefghijklmnopqrstuvwxyz"

function part1(data) {

	let res = 0;
	let [w, parts] = data.split('\n\n');
	w = lines(w).map(l => l.split('{')).map(l => [l[0], ...l[1].replace('}', '').split(',')])
	parts = scanf(parts, "{x=%d,m=%d,a=%d,s=%d}")
	w = w.reduce((acc, curr) => {
		const [ww, ...rules] = curr;
		acc[ww] = rules;
		return acc; 
	}, {});

	iter(parts, ([x, m, a, s]) => {
		const FIELDS = { x,m,a,s };
		let curr = 'in';
		let done = false;
		while (!done) {
			let ri = 0;
			const rules = w[curr];
			while (ri < rules.length) {
				if (in_(rules[ri][0], 'xmas') && !in_(rules[ri][1], ALPHA_L)) {
					// m>1849:R
					const [rr, goal] = rules[ri].split(':');
					const gt = in_('>', rr);
					let [field, n] = gt ? rr.split('>') : rr.split('<');
					n = int(n);
					if (gt && FIELDS[ field ] > n || !gt && FIELDS[ field ] < n) {
						curr = goal;
						if (curr === 'A') {
							res += x + m + a + s;
							done = true;
						} else if (curr === 'R') {
							done = true;
						}
						break;
					}
				} else if (in_(rules[ri][0], 'AR')) {
					if (rules[ri][0] === 'A') {
						res += x + m + a + s;
					}
					done = true;
				} else {
					curr = rules[ri];
					break;
				}
				++ri;
			}
		}
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const calc = (parts) => {
	let res = 1;
	iter('xmas', a => {
		const [l, h] = parts[a];
		res *= (h + 1 - l);
	})
	return res;
}

const dfs = (w, parts, curr) => {
	let res = 0;
	const rules = w[curr];
	let ri = 0;
	while (ri < rules.length) {
		if (in_(rules[ri][0], 'xmas') && !in_(rules[ri][1], ALPHA_L)) {
			// m>1849:R
			const [rr, goal] = rules[ri].split(':');
			const gt = in_('>', rr);
			let [field, n] = gt ? rr.split('>') : rr.split('<');
			n = int(n);
			const [l, h] = parts[field];
			let nparts = null, other;
			if (gt && n > l) {
				nparts = [l, min(n, h)];
				other = [min(n, h) + 1, max(n, h)];
			} else if (!gt && n < h) {
				nparts = [max(l, n), h];
				other = [min(n, l), max(n, l) - 1];
			}

			if (nparts !== null) {
				if (goal === 'A') {
					parts[field] = other;
					res += calc(parts);
				} else if (goal === 'R') {
					// pass
				} else {
					parts[field] = other;
					res += dfs(w, JSON.parse(JSON.stringify(parts)), goal);
				}
				parts[field] = nparts;
			}
		} else if (in_(rules[ri][0], 'AR')) {
			if (rules[ri][0] === 'A') {
				res += calc(parts);
			}
			break;
		} else {
			res += dfs(w, JSON.parse(JSON.stringify(parts)), rules[ri]);
		}
		++ri;
	}
	return res;
}

function part2(data) {

	let res = 0;
	let [w, parts] = data.split('\n\n');
	w = lines(w).map(l => l.split('{')).map(l => [l[0], ...l[1].replace('}', '').split(',')])
	parts = scanf(parts, "{x=%d,m=%d,a=%d,s=%d}")
	w = w.reduce((acc, curr) => {
		const [ww, ...rules] = curr;
		acc[ww] = rules;
		return acc; 
	}, {});

	parts = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] };
	res = dfs(w, parts, 'in');

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("19_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
