
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

const findEntrance = (G) => {
	let pos = null;
	iter(G, (r, y) => {
		iter(r, (c, x) => {
			if (c === '@') {
				pos = [y, x];
				return true;
			}
		})
		return pos;
	})
	return pos;
}
const countKeys = (G) => {
	let res = 0;
	iter(G, r => {
		iter(r, c => {
			if (ALPHA_L.indexOf(c) !== -1) ++res;
		})
	})
	return res;
}

const bfs = (G, _y, _x, nKeys) => {
	const q = new PriorityQueue((a, b) => (keys(a[4]).length - keys(b[4]).length) || (b[3] - a[3]));
	let mn = MOD;
	q.push([_y, _x, new set(), 0, {}]);
	const states = {};
	while (!q.empty()) {
		let [y, x, seen, l, k] = q.pop();
		if (states[[y, x, keys(k).sort().join('')]] <= l) continue;
		states[[y, x, keys(k).sort().join('')]] = l;
		if (seen.has([y, x])) continue;
		if (l > mn) continue;
		seen.add([y, x]);
		if (ALPHA_L.indexOf(G[y][x]) !== -1 && !(G[y][x] in k)) {
			debug("KEY: ", mn, G[y][x], l, q.heapSize(), keys(k).length, nKeys)
			k[ G[y][x] ] = true;
			seen = new set();
			if (keys(k).length === nKeys) {
				mn = min(mn, l);
			}
		}
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, G)) return;
			if (G[y+dy][x+dx] === '#' || ALPHA_U.indexOf(G[y+dy][x+dx]) !== -1 && !k[G[y+dy][x+dx].toLowerCase()]) return;
			const nSeen = new set([...seen, [y, x]]);
			q.push([y+dy, x+dx, nSeen, l+1, {...k}]);
		})
	}
	return mn;
}

function part1(data) {

	let res = 0;
	data = table(data);
	const [y, x] = findEntrance(data);
	data[y][x] = '.';
	const nKeys = countKeys(data);
	res = bfs(data, y, x, nKeys); // run it until 5102

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const bfs4 = (G, starts, nKeys) => {
	const q = new PriorityQueue((a, b) => (keys(a[3]).length - keys(b[3]).length) || (b[2] - a[2]));
	q.push([...starts.map(r => ([...r, new set()])), 0, {}]);
	const states = {};
	let mn = MOD;
	while (!q.empty()) {
		let [r1, r2, r3, r4, l, k] = q.pop();
		// debug(r1, r2, r3, r4)
		if (states[[...r1.slice(0, 2), ...r2.slice(0, 2), ...r3.slice(0, 2), ...r4.slice(0, 2), keys(k).sort().join('')]] <= l) continue;
		states[[...r1.slice(0,2), ...r2.slice(0,2), ...r3.slice(0,2), ...r4.slice(0,2), keys(k).sort().join('')]] = l;
		// debug(states[[...r1.slice(0,2), ...r2.slice(0,2), ...r3.slice(0,2), ...r4.slice(0,2), keys(k).sort().join('')]])
		// debug('$',r1, r2, r3, r4, r1[2].has(r1.slice(0, 2)), r1[2], r1.slice(0,2))
		// if (r1[2].has(r1.slice(0, 2)) && r2[2].has(r2.slice(0, 2)) && r3[2].has(r3.slice(0, 2)) && r4[2].has(r4.slice(0, 2))) continue;
		if (l > mn) continue;
		r1[2].add(r1.slice(0, 2)); r2[2].add(r2.slice(0, 2)); r3[2].add(r3.slice(0, 2)); r4[2].add(r4.slice(0, 2));
		// debug('!',r1, r2, r3, r4)
		if (ALPHA_L.indexOf(G[r1[0]][r1[1]]) !== -1 && !(G[r1[0]][r1[1]] in k)) {
			debug("KEY1: ", mn, G[r1[0]][r1[1]], l, q.heapSize(), keys(k).length, nKeys)
			k[ G[r1[0]][r1[1]] ] = true;
			r1[2] = new set();
			if (keys(k).length === nKeys) {
				mn = min(mn, l);
			}
		}
		if (ALPHA_L.indexOf(G[r2[0]][r2[1]]) !== -1 && !(G[r2[0]][r2[1]] in k)) {
			debug("KEY2: ", mn, G[r2[0]][r2[1]], l, q.heapSize(), keys(k).length, nKeys)
			k[ G[r2[0]][r2[1]] ] = true;
			r2[2] = new set();
			if (keys(k).length === nKeys) {
				mn = min(mn, l);
			}
		}
		if (ALPHA_L.indexOf(G[r3[0]][r3[1]]) !== -1 && !(G[r3[0]][r3[1]] in k)) {
			debug("KEY3: ", mn, G[r3[0]][r3[1]], l, q.heapSize(), keys(k).length, nKeys, keys(states).length)
			k[ G[r3[0]][r3[1]] ] = true;
			r3[2] = new set();
			if (keys(k).length === nKeys) {
				mn = min(mn, l);
			}
		}
		if (ALPHA_L.indexOf(G[r4[0]][r4[1]]) !== -1 && !(G[r4[0]][r4[1]] in k)) {
			debug("KEY4: ", mn, G[r4[0]][r4[1]], l, q.heapSize(), keys(k).length, nKeys)
			k[ G[r4[0]][r4[1]] ] = true;
			r4[2] = new set();
			if (keys(k).length === nKeys) {
				mn = min(mn, l);
			}
		}
		iter(D4, ([dy, dx]) => {
			// debug("HERE", inBB(r1[0]+dy, r1[1]+dx, G))
			if (inBB(r1[0]+dy, r1[1]+dx, G)) {
				if (!r1[2].has([r1[0]+dy, r1[1]+dx]) && G[r1[0]+dy][r1[1]+dx] !== '#' && !(ALPHA_U.indexOf(G[r1[0]+dy][r1[1]+dx]) !== -1 && !k[G[r1[0]+dy][r1[1]+dx].toLowerCase()])) {
					const nSeen = new set([...r1[2], r1.slice(0, 2)]);
					// debug("%%%", "r1", nSeen)
					q.push([[r1[0]+dy, r1[1]+dx, nSeen], r2, r3, r4, l+1, {...k}]);
					// debug(q)
				}
			}
			if (inBB(r2[0]+dy, r2[1]+dx, G)) {
				if (!r2[2].has([r2[0]+dy, r2[1]+dx]) && G[r2[0]+dy][r2[1]+dx] !== '#' && !(ALPHA_U.indexOf(G[r2[0]+dy][r2[1]+dx]) !== -1 && !k[G[r2[0]+dy][r2[1]+dx].toLowerCase()])) {
					const nSeen = new set([...r2[2], r2.slice(0, 2)]);
					// debug("%%%", "r2", nSeen, [nSeen], [r1, [r2[0]+dy, r2[1]+dx, nSeen], r3, r4, l+1, {...k}])
					q.push([r1, [r2[0]+dy, r2[1]+dx, nSeen], r3, r4, l+1, {...k}]);
				}
			}
			if (inBB(r3[0]+dy, r3[1]+dx, G)) {
				if (!r3[2].has([r3[0]+dy, r3[1]+dx]) && G[r3[0]+dy][r3[1]+dx] !== '#' && !(ALPHA_U.indexOf(G[r3[0]+dy][r3[1]+dx]) !== -1 && !k[G[r3[0]+dy][r3[1]+dx].toLowerCase()])) {
					const nSeen = new set([...r3[2], r3.slice(0, 2)]);
					// debug("%%%", "r3", nSeen)
					q.push([r1, r2, [r3[0]+dy, r3[1]+dx, nSeen], r4, l+1, {...k}]);
				}
			}
			if (inBB(r4[0]+dy, r4[1]+dx, G)) {
				if (!r4[2].has([r4[0]+dy, r4[1]+dx]) && G[r4[0]+dy][r4[1]+dx] !== '#' && !(ALPHA_U.indexOf(G[r4[0]+dy][r4[1]+dx]) !== -1 && !k[G[r4[0]+dy][r4[1]+dx].toLowerCase()])) {
					const nSeen = new set([...r4[2], r4.slice(0, 2)]);
					// debug("%%%", "r4", nSeen)
					q.push([r1, r2, r3, [r4[0]+dy, r4[1]+dx, nSeen], l+1, {...k}]);
				}
			}
		})
	}
	return mn;
}

function part2(data) {

	let res = 0;
	data = table(data);
	const [y, x] = findEntrance(data);
	const newStart = ['@#@','###','@#@'];
	const starts = []
	range(3)(i => {
		range(3)(j => {
			data[y + i - 1][x + j - 1] = newStart[i][j];
			if (newStart[i][j] === '@') starts.push([y + i - 1, x + j - 1]);
		})
	})
	const nKeys = countKeys(data);
	res = bfs4(data, starts, nKeys);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("18_input").toString("utf-8");

	// part1(data);
	part2(data);
	process.exit(0);
}

main();
