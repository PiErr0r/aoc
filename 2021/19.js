
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
// const { parsePacket, ops, HEX } = require('./lib_2021'); // specific to AOC 2021

const r0 	 = ([x, y, z]) => [ x, y, z];
const r90  = ([x, y, z]) => [ x,-z, y];
const r180 = ([x, y, z]) => [ x,-y,-z];
const r270 = ([x, y, z]) => [ x, z,-y];

const ROTS = [r0, r90, r180, r270];

const dx  = ([x, y, z]) => [ x, y, z];
const d_x = ([x, y, z]) => [-x,-y, z];
const dy  = ([x, y, z]) => [ y,-x, z];
const d_y = ([x, y, z]) => [-y, x, z];
const dz  = ([x, y, z]) => [ z, y,-x];
const d_z = ([x, y, z]) => [-z, y, x];

const DIRS = [dx, d_x, dy, d_y, dz, d_z];

const permute = (a) => {
	const perms = [];

	DIRS.forEach(d => {
		ROTS.forEach(r => {
			perms.push(a.map(coord => r(d(coord))));
		});
	})
	return perms;
}

const addBeacons = (beacons, scanner, coords) => {
	scanner.forEach(c => {
		const [x, y, z] = coords;
		const [dx, dy, dz] = c;
		beacons.add([x+dx, y+dy, z+dz]);
	});
}

const tryMatch = (beacons, scanner) => {
	let cnt = 0;
	for (const s of scanner) {
		const [sx, sy, sz] = s;
		for (let b of beacons) {
			const [x, y, z] = b;
			const px = x - sx, py = y - sy, pz = z - sz;

			cnt = 0;
			scanner.forEach(coord => {
				const [dx, dy, dz] = coord;
				if (beacons.has([px + dx, py + dy, pz + dz])) {
					++cnt;
				}
			});
			if (cnt >= 12) {
				return [true, [px, py, pz]];
			}
		}
	}
	return [false, null];
}

const mandist = (a, b) => {
	const [ax, ay, az] = a;
	const [bx, by, bz] = b;
	return abs(ax - bx) + abs(ay - by) + abs(az - bz)
}

function part1(data) {

	data = getGroups(data)
		.map(g => lines(g)
			.map((r, i) => i ? ints(r) : null)
			.filter(a => a !== null))
	const scanners = empty(data.length);
	scanners[0] = [0,0,0];
	const beacons = new set();
	addBeacons(beacons, data[0], [0,0,0]);
	let i = 0;
	while (!scanners.every(a => a)) {
		i = (i + 1) % scanners.length;
		debug("START", i);
		if (scanners[i]) continue;
		const perms = permute(data[i]);
		perms.forEach(p => {
			if (scanners[i]) return;
			const [match, coords] = tryMatch(beacons, p);
			if (match) {
				scanners[i] = coords;
				data[i] = copy(p);
				debug(coords)
				addBeacons(beacons, p, coords);
			}
		});
	}

	let res1 = beacons.size;
	let res2 = 0;
	diter(scanners, (a, b) => {
		const m = mandist(a, b);
		if (m > res) {
			res = m;
		}
	})

	debug(res1);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	debug(res2);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
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
	let data = fs.readFileSync("19_input").toString("utf-8");

	part1(data);
	// part2(data);
	process.exit(0);
}

main();
