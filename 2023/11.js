
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, manDist, modPow, modPowBig, modInv, mod, prod, prodBig, randint, shoelace, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const getEmpty = (data) => {
	const rows = [], cols = [];
	iter(data, (r, i) => {
		if (r.every(c => c === '.')) rows.push(i);
	})
	const tmp = transpose(data);
	iter(tmp, (r, i) => {
		if (r.every(c => c === '.')) cols.push(i);
	});
	return [rows, cols];
}

const expand = (data) => {
	const [rows, cols] = getEmpty(data);
	rows.reverse();
	iter(rows, r => {
		data.splice(r, 0, empty(data[0].length).fill('.'));
	})
	cols.reverse();
	iter(cols, c => {
		iter(data, r => {
			r.splice(c, 0, '.');
		})
	})
}

function part1(data) {

	let res = 0;
	data = table(data);
	expand(data);

	const coords = [];
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === '#')
				coords.push([y, x]);
		});
	});
	range(coords.length)(i => {
		range(i + 1, coords.length)(j => {
			res += manDist(coords[i], coords[j]);
		})
	})
	
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	const coords = [];
	const E = 1000000;
	data = table(data);
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === '#')
				coords.push([y, x]);
		});
	});
	
	const [rows, cols] = getEmpty(data);
	range(coords.length)(i => {
		range(i + 1, coords.length)(j => {
			let rc = 0, cc = 0;
			const mny = min(coords[i][0], coords[j][0])
			const mxy = max(coords[i][0], coords[j][0])
			const mnx = min(coords[i][1], coords[j][1])
			const mxx = max(coords[i][1], coords[j][1])
			iter(rows, r => {
				if (r > mny && r < mxy) ++rc;
			})
			iter(cols, c => {
				if (c > mnx && c < mxx) ++cc;
			})
			res += manDist(coords[i], coords[j]) + (E - 1) * (rc + cc);
		})
	})


	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("11_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
