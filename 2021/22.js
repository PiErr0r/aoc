
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {

	data = parse(data, 'w x=d..d,y=d..d,z=d..d');
	// debug(data)

	let cube = empty(100).map(a => empty(100).map(b => empty(100)));
	let res = 0;
	iter(data, r => {
		const [on, x1, x2, y1, y2, z1, z2] = r;
		range(max(x1, -50), 1 + min(x2, 50))(k => {
			range(max(y1, -50), 1 + min(y2, 50))(j => {
				range(max(z1, -50), 1 + min(z2, 50))(i => {
					cube[i+50][j+50][k+50] = on === 'on';
				})
			})
		})
	});

	iter(cube, r => {
		iter(r, c => {
			iter(c, v => {
				res += Number(v);
			})
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 22, 1, res));
	// }
	console.log("END OF PART1");
	return;
}

const inInt = (t11, t12, t21, t22) => {
	return t12 <= t11 && t11 <= t22
		|| t12 <= t12 && t12 <= t22;
}

const inInt1D = (t1, t21, t22) => t12 <= t1 && t1 <= t22

const isIn = (a, b) => {
	const [on, x1, x2, y1, y2, z1, z2] = a;
	const [on, _x1, _x2, _y1, _y2, _z1, _z2] = b;
	return inInt(x1, x2, _x1, _x2) 
	&& inInt(y1, y2, _y1, _y2) 
	&& inInt(z1, z2, _z1, _z2);
}

const fullyIn = (c1, c2) => {
	const [on, x1, x2, y1, y2, z1, z2] = c1;
	const [on, _x1, _x2, _y1, _y2, _z1, _z2] = c2;

	return inInt1D(x1, _x1, _x2)
		&& inInt1D(x2, _x1, _x2)
		&& inInt1D(y1, _y1, _y2)
		&& inInt1D(y2, _y1, _y2)
		&& inInt1D(z1, _z1, _z2)
		&& inInt1D(z2, _z1, _z2);
}

const getCubes = (c1, c2) => {
	const [on, x1, x2, y1, y2, z1, z2] = c1;
	const [on, _x1, _x2, _y1, _y2, _z1, _z2] = c2;



}

// doesn't work
// idea was to split the cubes in n new cubes based on the overlaps
// but too many different cases so this one goes in TODO queue
const overlap = (cubes, r) => { 
	const [on, x1, x2, y1, y2, z1, z2] = r;
	const dn = on === 'on' ? 1 : -1;

	if (on === 'on') {
		let doesOverlap = false;
		iter(cubes, (c, i) => {
			const [on, _x1, _x2, _y1, _y2, _z1, _z2] = c;
			if (fullyIn(r, c)) {
				return true;
			} else if (fullyIn(c, r)) {
				cubes.splice(i, 0);
			} else if (isIn(r, c)) {
				cubes.push( ...getCubes(r, c) )
			} else if (isIn(c, r)) {
				cubes.splice(i, 1, ...getCubes(c, r));
			}
		})
	}
}

// TODO
// https://stackoverflow.com/questions/244452/what-is-an-efficient-algorithm-to-find-area-of-overlapping-rectangles
// https://stackoverflow.com/questions/12769386/how-to-calculate-total-volume-of-multiple-overlapping-cuboids
function part2(data) {

	data = parse(data, 'w x=d..d,y=d..d,z=d..d');

	const cubes = [];
	iter(data, r => {
		// const [on, x1, x2, y1, y2, z1, z2] = r;
		overlap(cubes, r)
	})

	let res;

	debug(res);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	// if (res) {
	// 	exec(getExecStr(2021, 22, 2, res));
	// }
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("22_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
