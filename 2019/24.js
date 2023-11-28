
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
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const calcBio = (data) => {
	let res = 0;
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === '#') res |= 1 << (data.length * i + j)
		})
	})
	return res;
}

function part1(data) {

	let res = 0;
	data = table(data);
	const visited = new set();
	while (true) {
		res = calcBio(data);
		if (visited.has(res)) {
			disp(data)
			break;
		}
		visited.add(res);
		const nData = copy(data);
		iter(data, (r, y) => {
			iter(r, (c, x) => {
				const cnt = { '#': 0, '.': 0 }
				iter(D4, ([dy, dx]) => {
					if (inBB(y+dy, x+dx, data)) cnt[data[y+dy][x+dx]]++;
				})
				if (data[y][x] === '#' && cnt['#'] !== 1) nData[y][x] = '.';
				else if (data[y][x] === '.' && (cnt['#'] === 1 || cnt['#'] === 2)) nData[y][x] = '#';
			})
		})
		data = copy(nData);
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const getInnerBorder = (grid, lvl, dy, dx) => {
	const cnt = { '#': 0, '.': 0 };
	if (lvl === 0) {
		// console.assert(false, "Shouldn't have come here")
		return cnt;
	}
	range(5)(i => {
		if (dy === 1) {
			cnt[ grid[lvl-1][0][i] ]++;
		} else if (dy === -1) {
			cnt[ grid[lvl-1][4][i] ]++;
		} else if (dx === 1) {
			cnt[ grid[lvl-1][i][0] ]++;
		} else if (dx === -1) {
			cnt[ grid[lvl-1][i][4] ]++
		} else {
			console.assert(false, "What is this direction?");
		}
	})
	return cnt;
}

const getOuterBorder = (grid, lvl, dy, dx) => {
	const cnt = { '#': 0, '.': 0 };
	if (lvl === 500 - 1) {
		// console.assert(false, "Shouldn't have come here")
		return cnt;
	}
	if (dy === 1) {
		cnt[ grid[lvl+1][3][2] ]++;
	} else if (dy === -1) {
		cnt[ grid[lvl+1][1][2] ]++;
	} else if (dx === 1) {
		cnt[ grid[lvl+1][2][3] ]++;
	} else if (dx === -1) {
		cnt[ grid[lvl+1][2][1] ]++
	} else {
		console.assert(false, "What is this direction?");
	}
	return cnt;
}

function part2(data) {

	let res = 0;
	data = table(data);
	let grid = empty(500, 5, 5).map(lvl => lvl.map(r => r.map(c => '.')));
	grid[250] = copy(data); 
	
	let min = 0;
	while (min < 200) {
		const cpy = copy(grid);
		iter(grid, (lvlGrid, lvl) => {
			iter(lvlGrid, (r, y) => {
				iter(r, (c, x) => {
					if (y === 2 && x === 2) return;
					const cnt = { '#': 0, '.': 0 }
					iter(D4, ([dy, dx]) => {
						if (inBB(y+dy, x+dx, grid[0])) {
							if (y + dy === 2 && x + dx === 2) {
								const border = getInnerBorder(grid, lvl, dy, dx);
								iter('#.', bug => { cnt[bug] += border[bug] });
							} else {
								cnt[ grid[lvl][y+dy][x+dx] ]++;
							}
						} else {
							const border = getOuterBorder(grid, lvl, dy, dx);
							iter('#.', bug => { cnt[bug] += border[bug] });
						}
					})
					if (grid[lvl][y][x] === '#' && cnt['#'] !== 1) cpy[lvl][y][x] = '.';
					else if (grid[lvl][y][x] === '.' && (cnt['#'] === 1 || cnt['#'] === 2)) cpy[lvl][y][x] = '#';
				})
			})
		})
		grid = copy(cpy)	
		++min;
	}

	iter(grid, lvl => {
		iter(lvl, r => {
			iter(r, c => {
				if (c === '#') ++res;
			})
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
