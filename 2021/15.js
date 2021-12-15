
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D8, MOD } = require('../lib');
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

function part1(data) {

	data = lines(data).map(l => l.split('').map(a => int(a)));

	let res = 0;

	// debug(data)

	for (let i = 0; i < data.length; ++i) {
		for (let j = 0; j < data[0].length; ++j) {
			if (i || j) {
				const l = min(inBB(i - 1, j, data) ? data[i-1][j] : 1e9, 
											inBB(i, j - 1, data) ? data[i][j-1] : 1e9);
				// debug(i, j, l)
				data[i][j] += l;
			}
		}
	}
	// disp(data)
	res = data[data.length - 1][data[0].length - 1] - data[0][0]

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res;
	data = lines(data).map(l => l.split('').map(a => int(a)));
	const f = data.length, s = data[0].length;
	const nData = empty(5*f).map(a => empty(5*s));
	range(f*5)(i => {
		range(s*5)(j => {
			if (i || j) {
				nData[i][j] = (data[i%f][j%s]-1 + floor(i/f) + floor(j/s)) % 9 + 1;
			}
		})
	})
	nData[0][0] = 1;
	const q = new PriorityQueue([[0,0,nData[0][0]]], (a, b) => a[2] - b[2]);
	const S = new set([[0,0]]);
	let cnt = 0
	while (true) {
		// we should in place change nData values
		// add a condition to replace the nData value if new is lower than old
		const [x, y, risk] = q.pop();
		if (x === 5*s - 1 && y === 5*f - 1) {
			res = risk ;
			break;
		}
		for (const d of D4) {
			const [dx, dy] = d;
			if (inBB(y+dy, x+dx, nData) && !S.has([y+dy, x+dx])) {
				q.push([y+dy, x+dx, nData[y+dy][x+dx] + risk]);
				S.add([y+dy, x+dx]);
			}
		}
	}

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("15_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
