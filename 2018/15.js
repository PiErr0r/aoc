
const fs = require('fs');
const { exec } = require("child_process");
const { _D4, D6, D8, MOD } = require("../lib");
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

// const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D4 = [[-1, 0], [0, -1], [0, 1], [1, 0]];

const allSame = (players) => {
	const res = { G: 0, E: 0 };
	iter(players, p => (p.HP > 0 && res[p.type]++, 0));
	return (res.G !== 0) ^ (res.E !== 0);
}

const sumHP = (players) => {
	return sum(players.map(p => p.HP));
}

const manhattan = ([x1, y1], [x2, y2]) => {
	return abs(x1 - x2) + abs(y1 - y2);
}

const bfs = (G, players, pi) => {
	const curr = players[pi];
	let [y, x] = curr.p;
	const Q = new Queue();
	Q.push([y, x, null]);
	let ll = -1;
	iter(players, (p, i) => {
		if (pi === i || p.HP <= 0) return;
		const [y, x] = p.p;
		G[y][x] = p.type;
	});
	let res = null;
	// debug(curr)
	while (!Q.empty()) {
		// debug(Q)
		const [yy, xx, fp] = Q.pop();
		if (G[yy][xx] === '~') continue;
		G[yy][xx] = `~`;
		// debug(curr.p)
		// if (pi === 9)
		// disp(G)
		iter(D4, ([dy, dx]) => {
			if (res) return;
			if (!inBB(yy+dy, xx+dx, G) || G[yy+dy][xx+dx] === '#') return;
			if ('GE'.indexOf(G[yy+dy][xx+dx]) !== -1) {
				if (curr.type !== G[yy+dy][xx+dx]) {
					const adj = [];
					iter(D4, ([ddy, ddx]) => {
						if ('GE'.indexOf(G[yy+ddy][xx+ddx]) !== -1) {
							if (curr.type !== G[yy+ddy][xx+ddx]) adj.push([yy+ddy, xx+ddx]);
						}
					});
					// debug("%%%", adj.length)
					if (adj.length) {
						const Ps = adj.map(([yyy, xxx]) => players.find(({p: [ppy, ppx]}) => ppy === yyy && ppx === xxx));
						sort(Ps, (p1, p2) => (p1.HP - p2.HP) || (p1.p[0] - p2.p[0]) || (p1.p[1] - p2.p[1]));
						const PP = Ps[0];
						// debug("%", PP, Ps, adj)
						res = [PP.p[0], PP.p[1], fp];
					} else {
						res = [yy+dy, xx+dx, fp];
					}
				}
				return;
			}
			if (G[yy+dy][xx+dx] === '~') return;
			Q.push([yy+dy, xx+dx, fp === null ? [yy+dy, xx+dx] : fp]);
		});
		// debug(Q.empty(), res)
		if (res) break;
	}
	// debug(Q.size(), Q.empty())

	// debug(res, curr, /*players*/)
	// console.assert(res);
	if (!res) return [null, null]
	return [players.find(p => p.p[0] === res[0] && p.p[1] === res[1]), res[2] ? res[2] : [y, x]];
}

const findClosest = (G, players, i) => {
	const data = copy(G);
	const curr = players[i];
	const [y, x] = curr.p;

	iter(players, (p, i) => {
		if (p.HP <= 0) return;
		const [yy, xx] = p.p;
		data[yy][xx] = p.type;
	});

	const adj = [];
	iter(D4, ([dy, dx]) => {
		if ('GE'.indexOf(data[y+dy][x+dx]) !== -1) {
			if (curr.type !== data[y+dy][x+dx]) adj.push([y+dy, x+dx]);
		}
	});

	if (adj.length) {
		const Ps = adj.map(([yy, xx]) => players.find(({p: [py, px]}) => py === yy && px === xx));
		sort(Ps, (p1, p2) => (p1.HP - p2.HP) || (p1.p[0] - p2.p[0]) || (p1.p[1] - p2.p[1]));
		return [Ps[0], curr.p];
	} else {
		return bfs(data, players, i);
	}
}

function part1(data, POW = 3) {

	data = table(data);
	let players = [];
	range(data.length)(i => {
		range(data[0].length)(j => {
			if ("GE".indexOf(data[i][j]) !== -1) {
				players.push({
					type: data[i][j],
					HP: 200,
					AP: data[i][j] === 'E' ? POW : 3,
					p: [i, j]
				});
				data[i][j] = '.'
			}
		})
	})

	let round = 0;
	let rr = -1;
	let ended = false;
	while (!allSame(players)) {
		++round;
		// debug(round, players.length)
		let cnt = 0;
		iter(players, (p, i) => {
			if (p.HP <= 0) return;
			if (allSame(players)) {
				rr = round - 1;
				// debug("$$$$$$$$$ No enemies in round", round)
				// return true;
			}
			const [P, np] = findClosest(copy(data), players, i);
			if (P === null && np === null) {
				// debug('!!!!',i/*, players.length, round*/)
				// // debug(players)
				// ended = !!allSame(players);
				// ++cnt;
				return;
			}
			let att = false;
			if (manhattan(p.p, P.p) === 1 || manhattan(np, P.p) === 1) {
				if (P.HP > 0) {
					P.HP -= p.AP;
					att = true;
				}
			}
			p.p = np;
		})

		players = players.filter(p => p.HP > 0);
		sort(players, (p1, p2) => (p1.p[0] - p2.p[0]) || (p1.p[1] - p2.p[1]));
		// ++round;
		const G = copy(data);
		iter(players, (pp, i) => {
			// if (pi === i || p.HP <= 0) return;
			const [y, x] = pp.p;
			G[y][x] = pp.type;
		});
		// disp(G);
		// debug('#', players.length, players.map(pp => pp.HP))
	}
	// debug(players.length, ended, rr, round, sumHP(players))
	let res = (rr === -1 ? round : rr) * sumHP(players);

	iter(players, (p, i) => {
		// if (pi === i) return;
		const [y, x] = p.p;
		data[y][x] = p.type;
	});
	// disp(data)
	// 17 false 74 75 2749 

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return players[0].type;
}

function part2(data) {

	let res;

	// debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	let p = 4;
	while (part1(data, p) !== 'E') debug(p) || ++p;
	// part2(data);
	process.exit(0);
}

main();
