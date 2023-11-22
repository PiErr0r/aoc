
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

const manDist = ([x1, y1, z1], [x2, y2, z2]) => {
	return abs(x1 - x2) + abs(y1 - y2) + abs(z1 - z2);
}

function part1(data) {

	let res = 0;
	data = parse(data, 'pos=<d,d,d>, r=d')
	
	let nano = null, mx = 0;
	iter(data, ([x, y, z, r]) => {
		if (r > mx) {
			mx = r;
			nano = [x, y, z, r];
		}
	});
	const [nx, ny, nz, nr] = nano;
	iter(data, ([x, y, z, r]) => {
		if (manDist([nx, ny, nz], [x, y, z]) <= nr) ++res;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = parse(data, 'pos=<d,d,d>, r=d')

	let nano = null, mx = 0;
	iter(data, ([x, y, z, r]) => {
		if (r > mx) {
			mx = r;
			nano = [x, y, z, r];
		}
	});

	const xs = data.map(c => c[0]).sort((a, b) => a - b);
	const ys = data.map(c => c[1]).sort((a, b) => a - b);
	const zs = data.map(c => c[2]).sort((a, b) => a - b);
	let xmed = xs[int(xs.length/2)], ymed = ys[int(ys.length/2)], zmed = zs[int(zs.length/2)];
	let xavg = 0, yavg = 0, zavg = 0;
	iter(data, ([x, y, z, r]) => {
		// if (manDist([nx, ny, nz], [x, y, z]) <= nr) ++res;
		xavg += floor(x);
		yavg += floor(y);
		zavg += floor(z);
	});
	xavg = floor(xavg / data.length)
	yavg = floor(yavg / data.length)
	zavg = floor(zavg / data.length)

	let med = 0;
	let avg = 0;
	iter(data, ([x, y, z, r]) => {
		if (manDist([xavg, yavg, zavg], [x, y, z]) <= r) ++avg;
		if (manDist([xmed, ymed, zmed], [x, y, z]) <= r) ++med;
	})
	debug(mx, avg, med, [xmed, ymed, zmed], [xavg, yavg, zavg])
	let res1 = manDist([xavg, yavg, zavg], [0,0,0])
	let res2 = manDist([xmed, ymed, zmed], [0,0,0])

	debug(res, res1, res2);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("23_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
