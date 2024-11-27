
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

function part1(data) {

	let res = 0;
	data = scanf(data, "p=<%d,%d,%d>, v=<%d,%d,%d>, a=<%d,%d,%d>"/*p=<5528,2008,1661>, v=<-99,-78,-62>, a=<-17,-2,-2>*/)
	let mna = MOD, mnv = MOD, mnd = MOD, mni = -1;
	iter(data, (p, i) => {
		const [x, y, z, vx, vy, vz, ax, ay, az] = p;
		const da = manDist([0, 0, 0], [ax, ay, az]);
		const dv = manDist([0, 0, 0], [vx, vy, vz]);
		const dd = manDist([0, 0, 0], [x, y, z]);
		if (da < mna) {
			mna = da;
			mnv = dv;
			mnd = dd;
			mni = i;
		} else if (da === mna) {
			if (dv < mnv) {
				mnv = dv;
				mnd = dd;
				mni = i;
			} else if (dv === mnv) {
				if (dd < mnd) {
					mnd = dd;
					mni = i;
				}
			}
		}
	})
	res = mni;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const solveLinear = (a, b) => {
	if (a === 0) return [b === 0, 0];
	// solve for form a * x + b = 0
	const res = -b / a;
	return res > 0 && int(res) === res ? [true, res] : [false, 0];
}

const solveQuadratic = (a, b, c) => {
	if (a === 0) return solveLinear(b, c);
	// solve for form a * x^2 + b * x + c = 0
	const D = b * b - 4 * a * c;
	if (D < 0) return [false, 0];

	const Dsq = sqrt(D);
	if (Dsq * Dsq !== D) return [false, 0];
	const x1 = (-b + Dsq) / (2 * a);
	const x2 = (-b - Dsq) / (2 * a);

	if (x1 < 0 && x2 < 0) return [false,0];
	if (x1 < 0) return [int(x2) === x2, x2];
	if (x2 < 0) return [int(x1) === x1, x1];

	const L = [];
	if (int(x1) === x1) L.push(x1);
	if (int(x2) === x2) L.push(x2);
	return [L.length > 0, ...L];
}

const collision = (p1, p2) => {
	const [x1, y1, z1, vx1, vy1, vz1, ax1, ay1, az1] = p1;
	const [x2, y2, z2, vx2, vy2, vz2, ax2, ay2, az2] = p2;
	/***
	 * z(t) = z0 + vz * t + az * t ** 2
	 * z1(t) = z2(t) => (az1 - az2) / 2 * t * (t + 1) + (vz1 - vz2) * t + (z1 - z2) = 0
	 * solve for t => t1 = ?, t2 = ?
	 */
	const [X, ...tx] = solveQuadratic((ax1 - ax2) / 2, (ax1 - ax2) / 2 + vx1 - vx2, x1 - x2);
	const [Y, ...ty] = solveQuadratic((ay1 - ay2) / 2, (ay1 - ay2) / 2 + vy1 - vy2, y1 - y2);
	const [Z, ...tz] = solveQuadratic((az1 - az2) / 2, (az1 - az2) / 2 + vz1 - vz2, z1 - z2);
	if (!X || !Y || !Z) return -1;

	let res = -1;
	iter(tx, ttx => {
		iter(ty, tty => {
			iter(tx, ttz => {
				if (ttx === tty && tty === ttz) res = ttx;
			})
		})
	});
	return res;
}

const evaluate = (p, t) => {
	let [x, y, z, vx, vy, vz, ax, ay, az] = p
	range(t)(_ => {
		vx += ax
		vy += ay
		vz += az
		x += vx
		y += vy
		z += vz
	})
	return [x, y, z]
}

function part2(data) {

	let res = 0;
	data = scanf(data, "p=<%d,%d,%d>, v=<%d,%d,%d>, a=<%d,%d,%d>"/*p=<5528,2008,1661>, v=<-99,-78,-62>, a=<-17,-2,-2>*/);

	while (true) {
		let collisions = new set();
		let ct = MOD;
		iter(data, (p1, i) => {
			if (p1 === null) return
			iter(data.slice(i + 1), (p2, j) => {
				if (p2 === null) return;
				const collisionT = collision(p1, p2);
				if (collisionT < 0) return;
				if (collisionT < ct) {
					collisions = new set();
					collisions.add(i);
					collisions.add(i+j+1);
					ct = collisionT;
				} else if (collisionT === ct) {
					collisions.add(i);
					collisions.add(i+j+1);
				}
			})
		})
		if (collisions.size === 0) break;
		// const cA = [...collisions];
		// sort(cA);
		// cA.reverse();
		iter(collisions, (i) => {
			// data.splice(i, 1)
			data[i] = null;
		})
		ct = MOD;
	}
	res = data.filter(p => p !== null).length;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("20_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
