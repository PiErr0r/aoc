
var fs = require('fs');
const { ord, chr, debug, disp, int, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => {
	arr.sort(fn);
}
const in_ = (a, arr) => arr.indexOf(a) !== -1;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

const string = '[1518-10-31 00:58]';

const parse = (data) => {
	return data.map(r => {
		const time = r.slice(1, string.length - 1);
		const action = r.slice(string.length).trim();
		const [dt, tm] = time.split(' ');
		const [YY, MM, DD] = dt.split('-').map(d => int(d.trim()));
		const [hh, mm] = tm.split(':').map(t => int(t.trim()));
		return { action, YY, MM, DD, hh, mm }
	}).sort((a, b) => a.YY - b.YY || a.MM - b.MM || a.DD - b.DD || a.hh - b.hh || a.mm - b.mm);
}

function part1(data) {

	data = parse(data);

	let id, start, end;
	const guards = {};

	iter(data)(r => {
		const { action, YY, MM, DD, hh, mm } = r;
		if (action.startsWith('Guard')) {
			id = action.split(' ')[1].slice(1);
			if (!guards[id]) {
				guards[id] = new Array(60).fill(0);
			}
		} else if (action.startsWith('falls')) {
			start = mm;
		} else if (action.startsWith('wakes')) {
			if (mm < start) {
				mm += 60;
			}
			range(start, mm)(i => {
				guards[id][i]++;
			});
		}
	});

	let mxg = -1, mxmin = -1;

	Object.keys(guards).forEach(id => {
		const sm = guards[id].reduce((acc, curr) => acc + curr, 0);
		if (sm > mxmin) {
			mxmin = sm;
			mxg = id;
		}
	});

	mxmin = -1;
	let mxi = -1;
	guards[mxg].forEach((min, i) => {
		if (min > mxmin) {
			mxmin = min;
			mxi = i
		}
	});

	debug(int(mxg) * mxi)

	console.log("END OF PART1\n");
	part2(guards);
	return;
}

function part2(guards) {

	let mxg = -1, mxmin = -1;

	Object.keys(guards).forEach(id => {
		let mx = max(...guards[id]);
		if (mx > mxmin) {
			mxmin = mx;
			mxg = id;
		}
	});

	mxmin = -1;
	let mxi = -1;
	guards[mxg].forEach((min, i) => {
		if (min > mxmin) {
			mxmin = min;
			mxi = i;
		}
	})

	debug(int(mxg) * mxi)

	console.log("END OF PART2\n");
	return;
}

function main() {
	let data = fs.readFileSync("04_input").toString("utf-8");
	data = data.split('\n');
	// data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		// part2(Array.from(data));
	} else {
		part1(data);
		// part2(data);
	}
}

main();
