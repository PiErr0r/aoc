
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

const dijkstra = (data) => {
	const gy = data.length - 1, gx = data[0].length - 1;
	const q = new PriorityQueue((a, b) => b[5] - a[5]);
	// y x dy dx cnt loss
	q.push([1, 0, 1, 0, 1, int(data[1][0])])
	q.push([0, 1, 0, 1, 1, int(data[0][1])])
	let mn = MOD * 1000;
	const visited = new set();
	while (!q.empty()) {
		const [y, x, pdy, pdx, cnt, loss] = q.pop();
		if (y === gy && x === gx) {
			mn = min(mn, loss);
			continue;
		}
		if (loss > mn) continue;
		if (visited.has([y, x, pdy, pdx, cnt])) continue;
		visited.add([y, x, pdy, pdx, cnt])
		iter(D4, ([dy, dx]) => {
			if (!inBB(y+dy, x+dx, data)) return;
			if (dy === -pdy && dx === -pdx) return;
			if (dy === pdy && dx === pdx) {
				if (cnt === 3) return;
				q.push([y+dy, x+dx, dy, dx, cnt+1, loss + int(data[y+dy][x+dx])]);
			} else {
				q.push([y+dy, x+dx, dy, dx, 1, loss + int(data[y+dy][x+dx])]);
			}
		})
	}
	return mn
}

function part1(data) {

	let res = 0;
	data = table(data);
	res = dijkstra(data);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const ultraDijkstra = (data) => {
	const gy = data.length - 1, gx = data[0].length - 1;
	const q = new PriorityQueue((a, b) => b[5] - a[5]);
	// y x dy dx cnt loss
	let lly = 0, llx = 0;
	range(4)(i => {
		lly += int(data[0 + (i+1) * 1][0])
		llx += int(data[0][0 + (i+1) * 1])
	});	
	q.push([4, 0, 1, 0, 4, lly])
	q.push([0, 4, 0, 1, 4, llx])
	let mn = MOD * 1000;
	const visited = new set();
	while (!q.empty()) {
		const [y, x, pdy, pdx, cnt, loss] = q.pop();
		if (y === gy && x === gx) {
			mn = min(mn, loss)
			continue;
		}
		if (loss > mn) continue;
		if (visited.has([y, x, pdy, pdx, cnt])) continue;
		visited.add([y, x, pdy, pdx, cnt])
		iter(D4, ([dy, dx]) => {
			if (dy === -pdy && dx === -pdx) return;
			if (dy === pdy && dx === pdx) {
				if (cnt === 10) return;
				if (!inBB(y+dy, x+dx, data)) return;
				q.push([y+dy, x+dx, dy, dx, cnt+1, loss + int(data[y+dy][x+dx])]);
			} else {
				if (!inBB(y+4*dy, x+4*dx, data)) return;
				let ll = 0;
				range(4)(i => {
					ll += int(data[y + (i+1) * dy][x + (i+1) * dx])
				});
				q.push([y+4*dy, x+4*dx, dy, dx, 4, loss + ll]);
			}
		})
	}
	return mn
}


function part2(data) {

	let res = 0;
	data = table(data);
	res = ultraDijkstra(data);

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("17_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
