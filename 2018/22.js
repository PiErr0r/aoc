
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

function part1(data) {

	let res = 0;

	data = lines(data);
	let d = int(digits(data[0]).join(''))
	let [tx, ty] = data[1].split(',').map(a => int(digits(a).join('')))
	let G = empty(tx + 1, ty + 1)

	range(tx + 1)(x => {
		range(ty + 1)(y => {
			let geo;
			if (x === 0 && y === 0 || x === tx && y === ty) {
				geo = 0
			} else if (x === 0) {
				geo = y * 48271;
			} else if (y === 0) {
				geo = x * 16807;
			} else {
				geo = G[x-1][y] * G[x][y - 1];
			}
			const ero = (d + geo) % 20183;
			G[x][y] = ero;
		})
	})
	
	iter(G, r => {
		iter(r, c => {
			res += (c%3);
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const addRow = (G, d) => {
	const r = G.length;
	G.push([]);
	range(G[0].length)(y => {
		let geo;
		if (y === 0) {
			geo = r * 16807;
		} else {
			geo = G[r - 1][y] * G[r][y - 1];
		}
		const ero = (d + geo) % 20183;
		G[r].push(ero);
	})
}

const addCol = (G, d) => {
	const c = G[0].length;
	range(G.length)(x => {
		let geo;
		if (x === 0) {
			geo = c * 48271;
		} else {
			geo = G[x-1][c] * G[x][c - 1];
		}
		const ero = (d + geo) % 20183;
		G[x].push(ero);
	});
}

const allowed = (G, [x, y], [dx, dy], eq) => eq !== (G[x+dx][y+dy] % 3);

const fn = ([x1, y1], [x2, y2]) => abs(x1 - x2) + abs(y1 - y2);

const A_star = (G, depth, [tx, ty]) => {
	const Q = new PriorityQueue([], (a, b) => a[2] - b[2]);
	let mn = MOD;
	const visited = new set();
	Q.push([0, 0, 0, 1, 0]);
	while (!Q.empty()) {
		let [x, y, sz, eq, d] = Q.pop();
		if (visited.has([x, y, eq])) continue;
		visited.add([x, y, eq])
		if (d > mn) break;
		if (x === tx && y === ty && eq === 1) {
			mn = min(mn, d);
			continue;
		}

		for (let [dx, dy] of D4) {
			if (!inBB(x + dx, y + dy, G)) {
				if (x + dx === G.length) {
					addRow(G, depth);
				} else if (y + dy === G[0].length) {
					addCol(G, depth);
				}
			}
		
			if (inBB(x+dx, y+dy, G) && allowed(G, [x, y], [dx, dy], eq)) {
				Q.push([x+dx, y+dy, d+1+fn([x+dx, y+dy], [tx, ty]), eq, d+1]);
			}
		}
		range(3)(neq => {
			if (neq !== eq && neq !== G[x][y] % 3) {
				Q.push([x, y, d+7+fn([x, y], [tx, ty]), neq, d+7]);
			}
		});
	}
	return mn;
}

function part2(data) {

	let res = 0;

	data = lines(data);
	let d = int(digits(data[0]).join(''))
	let [tx, ty] = data[1].split(',').map(a => int(digits(a).join('')))
	let G = empty(tx + 1, ty + 1)

	range(tx + 1)(x => {
		range(ty + 1)(y => {
			let geo;
			if (x === 0 && y === 0 || x === tx && y === ty) {
				geo = 0
			} else if (x === 0) {
				geo = y * 48271;
			} else if (y === 0) {
				geo = x * 16807;
			} else {
				geo = G[x-1][y] * G[x][y - 1];
			}
			const ero = (d + geo) % 20183;
			G[x][y] = ero;
		})
	})
	
	res = A_star(G, d, [tx, ty]);

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
