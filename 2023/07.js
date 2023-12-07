
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

const C = 'AKQJT98765432';
const CJ = 'AKQT98765432J';

const FIVE = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(5, values(c));
};
const FOUR = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(4, values(c))
};
const FULL = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(3, values(c)) && in_(2, values(c))
};
const THREE = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(3, values(c))
};
const TWOP = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(2, values(c)) && count(values(c), 2) === 2
};
const ONEP = (a, J = false) => {
	let c = {};
	iter(a, (l) => ((c[l] = c[l] ? c[l] + 1 : 1),0));
	return in_(2, values(c)) && count(values(c), 2) === 1
};
const HC = (a, CC) => {
	let res = 0;
	iter(a, c => {
		res = res * (CC.length) + (CC.length - CC.indexOf(c)); 
	})	
	return res;
};
const order = [FIVE, FOUR, FULL, THREE, TWOP, ONEP];

function part1(data) {

	let res = 0;

	data = scanf(data, '%w %d')
	iter(data, r => {
		let s = null;
		iter(order, (fn, i) => s = fn(r[0]) && (i + 1));
		r.push((order.length - s + 1) * (s && MOD) + HC(r[0], C));
	})
	data.sort((a, b) => a[2] - b[2])
	iter(data, (r, i) => {
		res += (i + 1) * r[1];
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const getPossible = (c) => {
	if (count(c, 'J') === 5) return ['AAAAA'];
	if (count(c, 'J') === 4) return [empty(5).fill(c.replace(/J/, ''))];
	if (count(c, 'J') === 3) {
		c = c.replace(/J/, '');
		return c[0] === c[1] ? ['AAAAA'] : ['AAAAK']
	}
	c = c.split('');
	let res = [''];
	iter(c, cc => {
		if (cc === 'J') {
			range(res.length)(i => {
				let curr = res[i];
				range(CJ.length - 1)(j => {
					if (j === 0) res[i] += CJ[j];
					else res.push(curr + CJ[j]);
				})
			})
		} else {
			// debug("HERE")
			range(res.length)(i => {
				res[i] += cc;
			})
		}
	})
	return res;
}

function part2(data) {
	let res = 0;
	data = scanf(data, '%w %d')
	iter(data, r => {
		let s = null;
		const possible = getPossible(r[0]);
		let mx = 0;
		iter(possible, c => {
			iter(order, (fn, i) => s = fn(c) && (i + 1));
			mx = max(mx, (order.length - s + 1) * (s && MOD) + HC(r[0], CJ))
		})
		r.push(mx);
	})
	data.sort((a, b) => a[2] - b[2])
	iter(data, (r, i) => {
		res += (i + 1) * r[1];
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
