
const fs = require('fs');
const { exec } = require("child_process");
const { ALPHA_L, ALPHA_U, NUMS, D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle, rangeOverlap } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { binSearch, Counter, DD, empty, FastQueue, PriorityQueue, Queue, RBTree, set, Stack } = require("../lib");
const { areaInt, circumference, manDist, shoelace } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, modPowBig, modInv, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, scanf } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { disjoint, isSubset, isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product, unique_permutations } = require("../lib");

const area = (x1, y1, x2, y2) => {
 return (max(x1, x2) - min(x1, x2) + 1) * (max(y1, y2) - min(y1, y2) + 1)
}

function part1(data) {

	let res = 0;
	data = scanf(data, "%d,%d");
	iter(data, ([x1, y1], i) => {
		iter(data.slice(i + 1), ([x2, y2]) => {
			const tmp = (max(x1, x2) - min(x1, x2) + 1) * (max(y1, y2) - min(y1, y2) + 1)
			res = max(res, tmp);
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const makePolygon = (data) => {
	const res = [data[0]];
	let curr = 0;
	const used = new set();
	used.add(0);
	while (res.length !== data.length) {
		const [X, Y] = res[curr];
		iter(data, ([x, y], i) => {
			if (used.has(i)) return;
			if (x === X || y === Y) {
				res.push([x, y]);
				++curr;
				used.add(i);
			}
		})
	}
	console.assert(used.size === data.length);
	return res;
}

const makeRect = (A, B) => {
	x1 = min(A[0], B[0]);
	x2 = max(A[0], B[0]);
	y1 = min(A[1], B[1]);
	y2 = max(A[1], B[1]);
	return [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
}

const makeWalls = (poly) => {
	const tmp = poly.map(r => [...r]);
	tmp.push(tmp[0]);
	const walls = DD(new Array);
	range(1, tmp.length)(i => {
		const [x1, y1] = tmp[i-1];
		const [x2, y2] = tmp[i];
		if (x1 === x2) {
			walls[x1].push([y1+1, y2-1]);
		} else {
			const prev = tmp[mod(i - 2, tmp.length)][1]
			const next = tmp[mod(i + 1, tmp.length)][1]
			if (sign(prev - y1) === sign(y1 - next)) {
				walls[x1].push([y1, y1]);
			}
		}
	})
	return walls;
}

const hit = (walls, dataDict, x1, y1, x2, y2) => {
	let a = false;
	let b = false;
	if (dataDict[x1].has(y2)) {
		a = true;
	} else {
		let cnt = 0;
		iter(keys(walls), k => {
			k = int(k);
			iter(walls[k], ([w1, w2]) => {
				if (w1 <= y2 && y2 <= w2) {
					++cnt;
				}
			})
		})
		a = cnt % 2 === 1;
	}

	if (dataDict[x2].has(y1)) {
		b = true;
	} else {
		let cnt = 0;
		iter(keys(walls), k => {
			k = int(k);
			iter(walls[k], ([w1, w2]) => {
				if (w1 <= y1 && y1 <= w2) {
					++cnt;
				}
			})
		})
		b = cnt % 2 === 1;
	}

	return a && b;
}

const segmentsIntersect = (s1, s2) => {
	const [p1, p2] = s1;
	const [p3, p4] = s2;

	const orientation = (p, q, r) => {
		/**
		 * Returns:
     * 0 if p, q, r are collinear
     * 1 if clockwise
     * 2 if counterclockwise
     */
		const res = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
		return res === 0 
			? 0 
			: res > 0 
			? 1 
			: 2;
	}

	const onSegment = (p, q, r) => {
    return (min(p[0], r[0]) <= q[0] && q[0] <= max(p[0], r[0]) &&
            min(p[1], r[1]) <= q[1] && q[1] <= max(p[1], r[1]));
	}

  const o1 = orientation(p1, p2, p3);
  const o2 = orientation(p1, p2, p4);
  const o3 = orientation(p3, p4, p1);
  const o4 = orientation(p3, p4, p2);

  // General case: segments intersect if they straddle each other
  if (o1 != o2 && o3 != o4)
      return true
  
  // Special cases: check if points are collinear and overlapping
  // if (o1 == 0 && onSegment(p1, p3, p2))
  //     return true
  // if (o2 == 0 && onSegment(p1, p4, p2))
  //     return true
  // if (o3 == 0 && onSegment(p3, p1, p4))
  //     return true
  // if (o4 == 0 && onSegment(p3, p2, p4))
  //     return true
  
  return false
}

function part2(data) {

	debug(segmentsIntersect([[0, 0], [0,1]], [[1,1], [0, 1]]))
	return;
	let res = 0;
	data = scanf(data, "%d,%d");
	data = makePolygon(data);
	const dataDict = data.reduce((acc, curr) => {
		const [x, y] = curr;
		if (!(x in acc)) acc[x] = new set();
		acc[x].add(y);
		return acc;
	}, {});
	const walls = makeWalls(data);
	iter(data, ([x1, y1], i) => {
		debug(i, data.length)
		iter(data.slice(i + 1), ([x2, y2]) => {
			// const R = makeRect([x1, y1], [x2, y2]);
			if ((max(x1, x2) - min(x1, x2) + 1) * (max(y1, y2) - min(y1, y2) + 1) < res) return;
			if (hit(walls, dataDict, x1, y1, x2, y2) % 2 === 1) {
				const tmp = (max(x1, x2) - min(x1, x2) + 1) * (max(y1, y2) - min(y1, y2) + 1)
				res = max(res, tmp);
			}
		})
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
