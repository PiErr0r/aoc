
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

const shiftCoords = (data, mnx) => {
	range(data.length)(i => {
		const [_1, n1, _2, n21, n22] = data[i];
		if (_1 === 'x') {
			data[i][1] -= mnx;
		} else {
			data[i][3] -= mnx; 
			data[i][4] -= mnx; 
		} 
	})
}

const findMnY = (G, yy, lb, rb) => {
	let y = yy;
	let ll, rr;
	const x = int(lb + (rb - lb) / 2);
	do {
		ll = -1;
		rr = -1;
		range(x, -1, -1)(i => {
			if (G[y][i] === '#') {
				ll = i;
				return true;
			}
		});
		range(x, G[y].length)(i => {
			if (G[y][i] === '#') {
				rr = i;
				return true;
			}
		});
		--y;
	} while (ll === lb && rr === rb);
	return y + 2;
}

const MEMO = [];
const drop = (G, well) => {
	if (MEMO[well]) return true;
	let [y, x] = well;
	++y;

	G[y][x] = '|';
	let drawn = false;
	while (inBB(y+1, x, G) && in_(G[y+1][x], '.|')) {
		++y;
		if (G[y][x] === '.') {
			drawn = true;
			G[y][x] = '|';
		}
	}

	if (!inBB(y+1, x, G) || drawn && G[y][x+1] === '|' && G[y][x-1] === '|') return true;
	let lb = null, rb = null, ld = null, rd = null;
	range(x, -1, -1)(i => {
		if (in_(G[y+1][i], '.|')) {
			ld = i;
			return true;
		}
		if (G[y][i] === '#') {
			lb = i;
			return true;
		}
	});
	range(x, G[y].length)(i => {
		if (in_(G[y+1][i], '.|')) {
			rd = i;
			return true;
		}
		if (G[y][i] === '#') {
			rb = i;
			return true;
		}
	});

	let res = false;
	if (lb !== null && rb !== null) {
		const mny = findMnY(G, y, lb, rb);
		range(mny, y + 1)(yy => {
			range(lb + 1, rb)(i => {
				if (G[yy][i] === '.') {
					drawn = true;
				}
				G[yy][i] = '~';
			})
		})
	}
	if (lb === null && rb !== null) {
		range(ld, rb)(i => {
			if (G[y][i] === '.') {
				drawn = true;
				G[y][i] = '|';
			} 
		})
		while(!(drop(G, [y, ld])));
	}
	if (lb !== null && rb === null) {
		range(lb + 1, rd + 1)(i => {
			if (G[y][i] === '.') {
				drawn = true;
				G[y][i] = '|';
			} 
		})
		while(!(drop(G, [y, rd])));
	}
	if (lb === null && rb === null) {
		range(ld, rd + 1)(i => {
			if (G[y][i] === '.') {
				drawn = true;
				G[y][i] = '|';
			}
		})
		while(!(drop(G, [y, ld])));
		while(!(drop(G, [y, rd])));
	}
	if (!MEMO[well]) {
		MEMO[well] = !drawn;
	}
	return !drawn;
 }

function part1(data) {

	data = parse(data, 'w=d, w=d..d');
	const well = [0, 500];
	let res = 0;
	let mny = MOD, mxy = 0, mnx = MOD, mxx = 0;
	iter(data, ([_1, n1, _2, n21, n22]) => {
		if (_1 === 'x') {
			mnx = min(mnx, n1);
			mxx = max(mxx, n1);
			mxy = max(mxy, n21, n22);
			mny = min(mny, n21, n22);
		} else {
			mnx = min(mnx, n21, n22);
			mxx = max(mxx, n21, n22);
			mxy = max(mxy, n1);
			mny = min(mny, n1);
		}
	});
	--mnx;
	++mxx;

	shiftCoords(data, mnx);
	
	well[1] -= mnx;
	const G = empty(mxy + 1, mxx - mnx + 1);
	G[well[0]][well[1]] = '+';
	iter(data, ([_1, n1, _2, n21, n22]) => {
		if (_1 === 'x') {
			range(n21, n22 + 1)(i => {
				G[i][n1] = '#';
			});
		} else {
			range(n21, n22 + 1)(i => {
				G[n1][i] = '#';
			});
		}
	});
	range(G.length)(r => {
		range(G[r].length)(c => {
			if (G[r][c] === 0) G[r][c] = '.';
		})
	})

	let overflow = false, cnt = 0;
	while (!overflow) {
		overflow = drop(G, well);
	}

	let res1 = 0, res2 = 0;
	iter(G.slice(mny), r => {
		iter(r, c => {
			if (c === '|')
				++res1;
			if (c === '~')
				++res2
		})
	})
	res = res1 + res2;

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	debug(res2)
	console.log("END OF PART2");
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
	let data = fs.readFileSync("17_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
