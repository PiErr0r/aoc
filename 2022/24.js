
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

const getDir = (s) => {
	switch (s) {
		case '>': return [0, 1];
		case '<': return [0, -1];
		case '^': return [-1, 0];
		case 'v': return [1, 0];
		default: console.log("ERROR"); return null;
	}
}

const ps = (y, x) => `${y}#${x}`;
const ups = (s) => s.split('#').map(n => int(n));

const simulate = (data) => {
	const nData = copy(data);
	const D = {};
	iter(nData, (row, i) => {
		iter(row, (col, j) => {
			if (nData[i][j] === '#') {
				data[i][j] = '#';
			} else if (nData[i][j] === '.') {
				data[i][j] = '.';
				// pass
			} else {
				data[i][j] = '.';
				(Array.isArray(nData[i][j]) ? nData[i][j] : [ nData[i][j] ]).forEach(s => {
					const [dy, dx] = getDir(s);
					let ni = i + dy, nj = j + dx;
					if (data[ni][nj] === '#') {
						ni = mod(i + 3 * dy, nData.length);
						nj = mod(j + 3 * dx, nData[0].length);
					}
					const k = ps(ni, nj);
					if (k in D) D[k].push(s);
					else D[k] = [s];
				});

			}
		})
	});
	iter(keys(D), k => {
		const [y, x] = ups(k);
		data[y][x] = D[k].length > 1 ? [...D[k]] : D[k][0];
	});
}

const solve = (data, S, E, part) => {
	let [y, x] = S;
	let [ey, ex] = E;
	let came = false;
	const q = new Queue();
	q.push([y, x, 0]);
	let curr = 0;
	const V = new set();
	while (q.size()) {
		[y, x, mn] = q.pop();
		if (y === ey && x === ex) {
			if (part === 1) {
				return mn - 1;
			}
			if (!came) {
				came = true;
				[ey, ex] = S;
			} else if (ey === S[0] && ex === S[1]) {
				[ey, ex] = E;
			} else {
				return mn - 1;
			}
			while (!q.empty()) q.pop();
			q.push([y, x, mn + 1]);
			continue;
		}
		if (V.has([y, x, mn])) continue;
		V.add([y, x, mn])
		if (mn !== curr) {
			curr = mn;
			simulate(data);
		}
		
		iter(D4, ([dy, dx]) => {
			if (y + dy >= 0 && y + dy < data.length && x + dx >= 0 && x + dx <= data[0].length) {
				if (data[y+dy][x+dx] === '.')
					q.push([y+dy, x+dx, mn + 1]);
			}
		});
		if (data[y][x] === '.') {
			q.push([y, x, mn + 1]);
		}
	};
	return -1;
}

function part1(data) {
	data = table(data);
	const S = [0, 1];
	const E = [data.length - 1, data[0].length - 2];
	let res = solve(data, S, E, 1);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = table(data);
	const S = [0, 1];
	const E = [data.length - 1, data[0].length - 2];
	let res = solve(data, S, E);

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
