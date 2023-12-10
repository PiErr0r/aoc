
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
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const D = {
    "|": (y, x, dy, dx) => [y + dy, x + dx, dy, dx], // is a vertical pipe connecting north and south.
    "-": (y, x, dy, dx) => [y + dy, x + dx, dy, dx], // is a horizontal pipe connecting east and west.
    "L": (y, x, dy, dx) => [y + (dy ? 0 : -1), x + (dx ? 0 : 1), dy ? 0 : -1, dx ? 0 : 1], // is a 90-degree bend connecting north and east.
    "J": (y, x, dy, dx) => [y + (dy ? 0 : -1), x + (dx ? 0 : -1), dy ? 0 : -1, dx ? 0 : -1], // is a 90-degree bend connecting north and west.
    "7": (y, x, dy, dx) => [y + (dy ? 0 : 1), x + (dx ? 0 : -1), dy ? 0 : 1, dx ? 0 : -1], // is a 90-degree bend connecting south and west.
    "F": (y, x, dy, dx) => [y + (dy ? 0 : 1), x + (dx ? 0 : 1), dy ? 0 : 1, dx ? 0 : 1], // is a 90-degree bend connecting south and east.
    ".": (y, x, dy, dx) => [y, x, dy, dx] //is ground; there is no pipe in this tile.
}

const go = (data, y, x, dy, dx) => {
	let cnt = 1;
	let path = [[y, x, dy, dx]];
	y += dy;
	x += dx;
	do {
		path.push([y, x, dy, dx]);
		let px = x, py = y;
		;[y, x, dy, dx] = D[ data[y][x] ](y, x, dy, dx);
		++cnt;
	} while (data[y][x] !== 'S');
	return [cnt, path]
}

const dfs = (x, y, data) => {
	let res = 0, path = null, tmp;
	if (inBB(y-1, x, data) && in_(data[y-1][x], '|F7')) {
		[tmp, path] = go(data, y, x, -1, 0);
		res = max(tmp, res)
	} else if (inBB(y+1, x, data) && in_(data[y+1][x], '|LJ')) {
		[tmp, path] = go(data, y, x, 1, 0);
		res = max(tmp, res)
	} else if (inBB(y, x-1, data) && in_(data[y][x-1], '-LF')) {
		[tmp, path] = go(data, y, x, 0, -1);
		res = max(tmp, res)
	} else if (inBB(y, x+1, data) && in_(data[y][x+1], '-J7')) {
		[tmp, path] = go(data, y, x, 0, 1);
		res = max(tmp, res)
	}
	return [res, path];
}

function part1(data) {

	let res = 0;
	data = table(data)
	let sy, sx;
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === 'S') {
				sy = y;
				sx = x;
				return sx;
			}
		})
		return sy;
	});

	res = floor(dfs(sx, sy, data)[0] / 2);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const countIn = (data) => {
	let cnt = 0;
	iter(data, (r, i) => {
		iter(r, (c, j) => {
			if (c === 'I') ++cnt;
		})
	});
	return cnt;
}

const bfs = (data, y, x, path) => {
	const q = new Queue();
	q.push([y, x]);
	while(!q.empty()) {
		const [yy, xx] = q.pop();
		if (data[yy][xx] === 'I') continue;
		data[yy][xx] = 'I';
		iter(D4, ([dy, dx]) => {
			if (inBB(yy+dy, xx+dx, data) && !path.has([yy+dy, xx+dx])) {
				q.push([yy+dy, xx+dx]);
			}
		})
	}
}

const mark = (path, data) => {
	const P = new set(path.map(([yy, xx, ..._]) => [yy, xx]))
	iter(path, ([y, x, _y, _x], i) => {
		const iters = [];
		let [_1, _2, dy, dx] = path[i || data.length - 1];

		switch (data[y][x]) {
		    case "|": iters.push([0, dy]); break;
		    case "-": iters.push([-dx, 0]); break;
		    case "L": 
		    	if (dy) {
			    	iters.push([-1, 1]);
		    	} else {
			    	iters.push([1, 0]);
			    	iters.push([1, -1]);
			    	iters.push([0, -1]);
			    }
			    break;
		    case "J":
		    	if (dy) {
		    		iters.push([0, 1]);
		    		iters.push([1, 1]);
		    		iters.push([1, 0]);
		    	} else {
		    		iters.push([-1 ,-1])
		    	}
		    	break;
		    case "7":
		    	if (dy) {
		    		iters.push([1, -1])
		    	} else {
		    		iters.push([-1, 0])
		    		iters.push([-1, 1])
		    		iters.push([0, 1])
		    	}
		    	break;
		    case "F": 
		    	if (dy) {
		    		iters.push([-1, 0])
		    		iters.push([-1, -1])
		    		iters.push([0, -1])
		    	} else {
		    		iters.push([1, 1])
		    	}
		    	break;
		    // case ".": iters.push([0, -1]); break;
		}
		iter(iters, ([ny, nx]) => {
			if (inBB(y + ny, x + nx, data) && !P.has([y+ny, x+nx])) {
				bfs(data, y+ny, x+nx, P);
			}
		})
	})
}

const shoelace = (path) => {
	let res = 0;
	range(path.length)(i => {
		res += path[i][0] * path[(i || path.length) - 1][1] - path[i][1] * path[(i || path.length) - 1][0];
	})
	return abs(res) >> 1;
}

function part2(data) {

	let res = 0;

	data = table(data)
	let sy, sx;
	iter(data, (r, y) => {
		iter(r, (c, x) => {
			if (c === 'S') {
				sy = y;
				sx = x;
				return sx;
			}
		})
		return sy;
	});
	const cp = copy(data);
	let [len, path] = dfs(sx, sy, cp);

	// better solution
	res = shoelace(path) - (len >> 1) + 1

	mark(path, cp);
	res =  countIn(cp)
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("10_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
