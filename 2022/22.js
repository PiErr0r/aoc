
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

const getNum = (s, i) => {
	let n = 0;
	while (i < s.length && ord(s[i]) >= ord('0') && ord(s[i]) <= ord('9')) {
		n = 10 * n + (ord(s[i]) - ord('0'));
		++i;
	}
	return [i, n];
}

const getOrientation = (s, i) => [i + 1, s[i]];

const wrapAround = (G, r, c, dir) => {
	const [dy, dx] = D4[dir];
	r = mod(r + dy, G.length);
	c = mod(c + dx, G[r].length);
	while (G[r][c] === ' ') {
		r = mod(r + dy, G.length);
		c = mod(c + dx, G[r].length);
	}
	return [r, c];
}

const move = (G, r, c, dir, n) => {
	const [dy, dx] = D4[dir];
	let i = 0;
	while (i < n) {
		r += dy;
		c += dx;
		if (r >= G.length || r < 0 || c < 0 || c >= G[r].length) {
			let [nr, nc] = wrapAround(G, r, c, dir);
			if (G[nr][nc] === '#')
				return [r - dy, c - dx];
			r = nr;
			c = nc;
			++i;
			continue;
		}
		switch (G[r][c]) {
			case '#': return [r - dy, c - dx];
			case '.': break;
			case ' ': {
				let [nr, nc] = wrapAround(G, r, c, dir);
				if (G[nr][nc] === '#')
					return [r - dy, c - dx];
				r = nr;
				c = nc;
			}
		}
		++i;
	}
	return [r, c];
}

const wrapCube = (G, r, c, dir) => {
	const [dy, dx] = D4[dir];
	if (dy) {
		if (r === 0 && dy === -1) {
			if (c >= 50 && c < 100) {
				return [150 + c - 50, 0, 0];
			} else if (c >= 100 && c < 150) {
				return [199, c - 100, 3]
			} else {
				debug("BAD STUFF", r, c, dx, dy);	
			}
		} else if (r === 49 && dy === 1) {
			if (c >= 50 && c < 100) {
				return [50, c, 1]
			} else if (c >= 100 && c < 150) {
				return [50 + c - 100, 99, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 50 && dy === -1) {
			if (c >= 50 && c < 100) {
				return [49, c, 3];
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 99 && dy === 1) {
			if (c >= 50 && c < 100) {
				return [100, c, 1]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 100 && dy === -1) {
			if (c >= 0 && c < 50) {
				return [50 + c, 50, 0]
			} else if (c >= 50 && c < 100) {
				return [99, c, 3]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 149 && dy === 1) {
			if (c >= 0 && c < 50) {
				return [150, c, 1]
			} else if (c >= 50 && c < 100) {
				return [150 + c - 50, 49, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 150 && dy === -1) {
			if (c >= 0 && c < 50) {
				return [149, c, 3]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (r === 199 && dy === 1) {
			if (c >= 0 && c < 50) {
				return [0, 100 + c, 1]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else {
			debug("BAD STUFF", r, c, dx, dy);
			throw new Error();
		}
	} else if (dx) {
		if (c === 0 && dx === -1) {
			if (r >= 100 && r < 150) {
				return [49 - (r - 100), 50, 0]
			} else if (r >= 150 && r < 200) {
				return [0, 50 + r - 150, 1]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (c === 49 && dx === 1) {
			if (r >= 100 && r < 150) {
				return [r, 50, 0]
			} else if (r >= 150 && r < 200) {
				return [149, 50 + r - 150, 3]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (c === 50 && dx === -1) {
			if (r >= 0 && r < 50) {
				return [100 + 49 - r, 0, 0]
			} else if (r >= 50 && r < 100) {
				return [100, r - 50, 1]
			} else if (r >= 100 && r < 150) {
				return [r, 49, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (c === 99 && dx === 1) {
			if (r >= 0 && r < 50) {
				return [r, 100, 0]
			} else if (r >= 50 && r < 100) {
				return [49, 100 + r - 50, 3]
			} else if (r >= 100 && r < 150) {
				return [49 - (r - 100), 149, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (c === 100 && dx === -1) {
			if (r >= 0 && r < 50) {
				return [r, 99, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else if (c === 149 && dx === 1) {
			if (r >= 0 && r < 50) {
				return [100 + 49 - r, 99, 2]
			} else {
				debug("BAD STUFF", r, c, dx, dy);
			}
		} else {
			debug("BAD STUFF", r, c, dx, dy);
		}
	} else {
		debug("BAD STUFF", r, c, dx, dy);
	}
}

const moveCube = (G, r, c, dir, n) => {
	let i = 0;
	while (i < n) {
		const [dy, dx] = D4[dir];
		if (abs(mod(r, 50) - mod(r + dy, 50)) > 1 || abs(mod(c, 50) - mod(c + dx, 50)) > 1) {
			let [nr, nc, nd] = wrapCube(G, r, c, dir);
			if (G[nr][nc] === '#')
				return [r, c, dir];
			r = nr;
			c = nc;
			dir = nd;
			++i;
			continue
		}
		switch (G[r+dy][c+dx]) {
			case '#': return [r, c, dir];
			case '.': r += dy; c += dx; break;
			case ' ': {
				let [nr, nc, nd] = wrapCube(G, r, c, dir);
				if (G[nr][nc] === '#')
					return [r, c, dir];
				r = nr;
				c = nc;
				dir = nd;
			}
		}
		++i;
	}
	return [r, c, dir];
}

function part1(data, part) {
	let [G, path] = groups(data)
	path = path[0];
	let mx = 0;
	iter(G, row => {
		mx = max(mx, row.length);
	})
	range(G.length)(i => {
		if (G[i].length < mx) {
			G[i] += new Array(mx - G[i].length).fill(' ').join('');
		}
	});
	let dir = 0; // -1 turn right, 1 turn left
	let r = 0;
	let c = 0;
	while (G[0][c] === ' ') ++c;
	let i = 0, n, or;
	while (i < path.length) {
		[i, n] = getNum(path, i);
		if (part === 1)
			[r, c] = move(G, r, c, dir, n);
		else
			[r, c, dir] = moveCube(G, r, c, dir, n);
		[i, or] = getOrientation(path, i);
		if (or === 'R')
			dir = mod(dir + 1, D4.length);
		else if (or === 'L')
			dir = mod(dir - 1, D4.length);
	}
	let res = 1000 * (r + 1) + 4 * (c + 1) + dir;

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
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data, 1);
	part1(data, 2);
	process.exit(0);
}

main();
