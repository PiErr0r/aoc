
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const dataMap = (s, data) => {
	// s = [s];
	iter(data, (mapp, i) => {
		let ns = -1;
		iter(mapp, (rng, j) => {
			if (!j) {
				return;
			}
			const [en, st, r] = ints(rng);
			if (s >= st && s < st + r) {
				ns = en + (s - st);
				return true;
			}
		})
		if (ns !== -1)
			s = ns;
	});
	return s;
}

const dataMapRange = (s1, s2, data) => {
	let R = [[s1, s2]];
	iter(data, (mapp, i) => {
		let ns = [];
		iter(mapp, (rng, j) => {
			if (!j) {
				return;
			}
			const [en, st, r] = ints(rng);
			R = R.filter(aa => aa[1] !== 0);
			iter(R, ([S, E], k) => {
				if (E === 0) return;
				if (S >= st && (S + E) <= st + r) {
					ns.push([en + (S - st), E]);
					R[k][1] = 0;
				} else if (S >= st && S < st + r) {
					ns.push([en + (S - st), st + r - S]);
					R[k][0] = st + r;
					R[k][1] = S + E - (st + r);
				} else if (S + E > st && S + E < st + r) {
					ns.push([en, S + E - st])
					R[k][0] = S;
					R[k][1] = st - S;
				} else if (S < st && S + E >= st + r) {
					ns.push([en, r]);
					R[k][0] = S;
					R[k][1] = S + E - st - 1;
					R.push([st + r, S + E - (st + r)])
				}
			})
		})
		R = [...R, ...ns];
	});
	return min(...R.map(a => a[0]));
}

function part1(data) {

	let res = 0;
	let seeds;
	[seeds, ...data] = groups(data);
	seeds = ints(seeds[0])

	res = MOD * 1000;
	iter(seeds, s => {
		let tmp = dataMap(s, data);
		res = min(tmp, res);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	[seeds, ...data] = groups(data);
	seeds = ints(seeds[0])
	res = MOD * 1000;

	range(0, seeds.length, 2)(i => {
		let tmp = dataMapRange(seeds[i], seeds[i+1], data);
		res = min(tmp, res);
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("05_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
