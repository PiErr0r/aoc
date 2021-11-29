
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

const parse = (data) => {
	return data.map(r => {
		let [id, rect] = r.split('@');
		id = int(id.slice(1).trim());
		let [pos, len] = rect.split(':');
		const [x, y] = pos.split(',').map(i => int(i.trim()));
		const [w, h] = len.split('x').map(i => int(i.trim()));
		return {id, x, y, w, h};
	});
}

function part1(data) {
	data = parse(data);

	const fabric = new Array(1000).fill(0).map(r => new Array(1000).fill(0));
	let res = 0;

	iter(data)(rect => {
		const { x, y, w, h, id } = rect;
		let hasOl = false;
		range(x, x+w)(i => {
			range(y, y+h)(j => {
				fabric[j][i]++;
			})
		});
	})

	iter(fabric)(r => {
		iter(r)(c => {
			if (c > 1) ++res;
		})
	})
	
	debug(res)
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = parse(data);

	const fabric = new Array(1000).fill(0).map(r => new Array(1000).fill(0));
	
	const s = new set();
	iter(data)(rect => {
		const { x, y, w, h, id } = rect;
		s.add(id);
		let hasOl = false;
		range(x, x+w)(i => {
			range(y, y+h)(j => {
				if (fabric[j][i]) {
					s.delete(fabric[j][i]);
					s.delete(id);
				}
				fabric[j][i] = id;
			})
		});
	})
	
	debug(s)

	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");
	data = data.split('\n');
	// data = data.split('\n').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
