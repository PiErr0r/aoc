
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

const tiltUp = (data) => {
	range(data[0].length)(c => {
		let i = 0;
		let goto = -1;
		while (i < data.length) {
			if (goto === -1 && data[i][c] === '.') {
				goto = i;
			} else if (data[i][c] === '#') {
				goto = -1;
			} else if (goto !== -1 && data[i][c] === 'O') {
				data[i][c] = '.';
				data[goto][c] = 'O';
				++goto;
			}
			++i;
		}
	})
}

const tiltDown = (data) => {
	range(data[0].length)(c => {
		let i = data.length - 1;
		let goto = -1;
		while (i >= 0) {
			if (goto === -1 && data[i][c] === '.') {
				goto = i;
			} else if (data[i][c] === '#') {
				goto = -1;
			} else if (goto !== -1 && data[i][c] === 'O') {
				data[i][c] = '.';
				data[goto][c] = 'O';
				--goto;
			}
			--i;
		}
	})
}

const tiltLeft = (data) => {
	range(data.length)(r => {
		let i = 0;
		let goto = -1;
		while (i < data[0].length) {
			if (goto === -1 && data[r][i] === '.') {
				goto = i;
			} else if (data[r][i] === '#') {
				goto = -1;
			} else if (goto !== -1 && data[r][i] === 'O') {
				data[r][i] = '.';
				data[r][goto] = 'O';
				++goto;
			}
			++i;
		}
	})
}

const tiltRight = (data) => {
	range(data.length)(r => {
		// debug(r)
		let i = data[0].length - 1;
		let goto = -1;
		while (i >= 0) {
			if (goto === -1 && data[r][i] === '.') {
				goto = i;
			} else if (data[r][i] === '#') {
				goto = -1;
			} else if (goto !== -1 && data[r][i] === 'O') {
				data[r][i] = '.';
				data[r][goto] = 'O';
				--goto;
			}
			--i;
		}
	})
}



const score = (data) => {
	let res = 0;
	iter(data, (r, i) => {
		iter(r, c => {
			if (c === 'O') {
				res += data.length - i;
			}
		})
	})
	return res;
}

function part1(data) {

	let res = 0;
	data = table(data);
	tiltUp(data);

	res = score(data);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const hash = (data) => data.map(r => r.join('')).join('');

const unhash = (data, R) => {
	const res = [];
	let tmp = '';
	iter(data, (c, i) => {
		if (i && i % R === 0) {
			res.push(tmp.split(''))
			tmp = '';
		}
		tmp += c;
	})
	res.push(tmp.split(''))
	return res;
}

function part2(data) {

	let res = 0;
	const visited = {};
	data = table(data);
	const R = data.length;
	const D = 1_000_000_000;
	range(D)(i => {
		const H = hash(data)
		if (H in visited) {
			const diff = i - visited[H];
			const r = (D - i) % diff + visited[H];
			res = score(unhash(keys(visited).find(k => visited[k] === r), R));
			return true;
		}

		visited[H] = i;
		tiltUp(data)
		tiltLeft(data)
		tiltDown(data)
		tiltRight(data)
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("14_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
