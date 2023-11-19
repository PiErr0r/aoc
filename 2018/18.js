
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


function part1(data, T, part) {

	const MEMO = {};
	let res;
	data = table(data);
	let togo = -1;
	range(T)(t => {
		let G = copy(data);
		range(G.length)(y => {
			range(G[0].length)(x => {
				const R = { '.': 0, '|': 0, '#': 0 };
				iter(D8, ([dx, dy]) => {
					if (inBB(y+dy, x+dx, data)) {
						++R[data[y+dy][x+dx]];
					}
				})
				switch (data[y][x]) {
				case '.': 
					if (R['|'] >= 3) G[y][x] = '|';
					break;
				case '|': 
					if (R['#'] >= 3) G[y][x] = '#';
					break;
				case '#': 
					if (R['#'] === 0 || R['|'] === 0) G[y][x] = '.';
					break;
				default: exit()
				}
			})
		});
		data = copy(G);
		tmp = data.map(r => r.join('')).join('');
		if (togo === -1 && MEMO[tmp]) {
			dt = t - MEMO[tmp];
			togo = (T - t - 1) % dt;
		} else if (togo === -1) {
			MEMO[tmp] = t;
		}
		if (togo === 0) return true;
		if (togo !== -1) --togo;
	});
	// disp(data)

	const R = { '.': 0, '|': 0, '#': 0 };
	iter(data, r => {
		iter(r, c => {
			++R[c];
		})	
	})
	res = R['#'] * R['|']
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART" + part);
	return;
}

function part2(data) {

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("18_input").toString("utf-8");

	part1(data, 10, 1);
	part1(data, 1000000000, 2)
	process.exit(0);
}

main();
