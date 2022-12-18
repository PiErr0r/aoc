
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

const PATTERNS = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split('\n\n').map(r => r.split('\n'));

const check = (G, h, l, p, move) => {
	if (move === '>') {
		let ph = 0;
		while (ph < p.length && G.length - ph - 1 < G.length) {
			if (G.length - h - 1 - (p.length - ph - 1) < 0) {
				++ph; continue;
			}
			let i;
			for (i = p[0].length - 1; i >= 0; --i) {
				if (p[ph][i] === '#') break;
			}
			if (G[G.length - h - 1 - (p.length - ph - 1)][l + i + 1] === 1) return false;
			++ph;
		}
	} else {
		let ph = 0;
		while (ph < p.length) {
			if (G.length - h - 1 - (p.length - ph - 1) < 0) {
				++ph; continue;
			}
			let i;
			for (i = 0; i < p[0].length; ++i) {
				if (p[ph][i] === '#') break;
			}
			if (G[G.length - h - 1 - (p.length - ph - 1)][l + i - 1] === 1) return false;
			++ph;
		}
	}
	return true;
}

const simulate = (G, h, d, curr, data) => {
	const p = PATTERNS[curr];
	const W = 7;
	let l = 2;
	let ph;
OUTER:
	while (h >= 0) {
		switch (data[d++]) {
			case '<': if (l !== 0 && check(G, h, l, p, '<')) --l; break;
			case '>': if (l + p[0].length !== W && check(G, h, l, p, '>')) ++l; break;
			default: debug("Something is buggy");
		}
		d = d % data.length;
		let filled = empty(p[0].length);
		ph = p.length;
		while (ph > 0) {
			--ph;
			if (filled.every(a => a)) break;
			let i = 0;
			while (i < filled.length) {
				if (filled[i]) {
					++i; continue;
				}
				if (p[ph][i] === '#') {
					filled[i] = 1;
				}
				if (filled[i] && (G.length - h >= G.length || G[ G.length - h - (p.length - ph - 1) ][l + i] === 1)) {
					iter(p, (row, r) => {
						iter(row, (col, c) => {
							if (col !== '#') return;
							G[ G.length - h - 1 - (p.length - r - 1) ][l + c] = 1;
						});
					});
					break OUTER;
				}
				++i;
			}
		}
		--h;
	}
	return [h + p.length, d];
}

const findCycle = (A) => {
	let slow = 0, fast = 0;
	do {
		slow = (slow + 1) % A.length;
		fast = (fast + 2) % A.length;
		if (A[slow][0] === A[fast][0] && A[slow][1] === A[fast][1] && A[slow][2] === A[fast][2]) {
			return [slow, fast];
		}
	} while (A[slow][0] !== A[fast][0] || A[slow][1] !== A[fast][1] || A[slow][2] !== A[fast][2]);
	return [slow, fast]
}

function part1(data) {

	data = singles(data);
	const ROUNDS = 10000; // 2022;
	let currH = 3, currD = 0, curr = 0;
	const G = empty(4, 7);
	let GG;
	let res;
	let p = 0, P = [];
	range(ROUNDS)(_ => {
		if (_ === 2022) {
			GG = copy(G);
		}
		let [tmp, tmpD] = simulate(G, currH, currD, curr, data);
		currD = tmpD;
		currH = max(tmp, currH - 4) + 4;
		
		while (G.length < currH) G.unshift(empty(7));

		let i = 0;
		while (G[i++].every(a => !a));
		currH = G.length - i + 4;

		// needed for part2
		P.push([G.length - i - p, currD, curr]);
		p = G.length - i;
		curr = (curr + 1) % PATTERNS.length;
		
		if (currD < 5) {
			// debug("GO WITH DATA AGAIN");
		}
	});

	iter(GG, (row, r) => {
		iter(row, col => {
			if (col === 1) {
				res = GG.length - r;
				return true;
			}
		})
		return res;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");

	const [slow, fast] = findCycle(P);
	const pattern = P.slice(slow, fast);
	const b = pattern.length;
	const S = sum(pattern.map(a => a[0]));
	const c = 1000000000000;
	const d = sum(P.slice(0, c % b + 1).map(a => a[0]));
	res = d + S * floor(c / b);
	debug(res, b, S, d)
	return;
}

function part2(data) {

	/**
	 * Part 2 solved by hand
	 * 1. find the pattern of round differences
	 * 2. its length is the length of the pattern
	 * 3. a = 240 // number of rounds before pattern starts to appear
	 * 4. b = 1740 // length of pattern
	 * 5. c = 1000000000000
	 * 6. S = 2681 // sum of round differences in a pattern
	 * 7. d = 1799 // result of first c % b = 1180 rounds
	 * 8. res = floor(c / b) * S + d
	 * */

	let res = 1540804597682;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("17_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
