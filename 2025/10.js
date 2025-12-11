
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

const getNums = s => s.split(',').map(a => int(a));

const parseData = r => {
	const [a, ...b] = r.split(' ');
	const c = b.splice(b.length - 1, 1)[0];
	const lights = a.replace(/(\[|\])/g, '');
	const buttons = b.map(bb => getNums(bb.replace(/(\(|\))/g, '')));
	const joltage = getNums(c.replace(/(\{|\})/g, ''))
	return [lights, buttons, joltage];
}

const toggle = c => c === '#' ? '.' : '#';

const bfs = (lights, buttons) => {
	const res = empty(lights.length).map(_ => '.').join('');
	const q = new Queue();
	q.push([lights, 0]);
	const used = new set();
	while (!q.empty()) {
		const [light, L] = q.pop();
		if (light === res) return L;
		if (used.has(light)) continue;
		used.add(light);
		iter(buttons, b => {
			const nl = light.split('');
			iter(b, change => {
				nl[change] = toggle(nl[change]);
			})
			if (used.has(nl.join(''))) return;
			q.push([nl.join(''), L + 1]);
		})
	}
	return -1;
}

function part1(data) {

	let res = 0;
	data = lines(data);
	iter(data, r => {
		const [lights, buttons, joltage] = parseData(r);
		// debug('!!', lights)
		const tmp = bfs(lights, buttons);
		console.assert(tmp !== -1)
		res += tmp;
	})

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const prune = (q, used) => {
	const remain = [];
	while (!q.empty()) {
		const [jolt, L, w] = q.pop();
		if (jolt in used && L >= used[jolt]) continue;
		remain.push([jolt, L, w]);		
	}
	iter(remain, v => {
		q.push(v);
	})
}

const bfs2 = (joltage, buttons) => {
	const q = new PriorityQueue((a,b) => a[2] - b[2]);
	q.push([joltage, 0, sum(joltage)]);
	const used = {}
	let i = 0;
	let mini = MOD * 1000;
	while (!q.empty()) {
		++i;
		const [jolt, L, w] = q.pop();
		if (L > mini) continue;
		if (jolt.every(j => j === 0)) {
			debug(mini)
			mini = min(mini, L)
			continue;
		};
		if (jolt in used && L >= used[jolt]) continue;
		if (i % 10000 === 0) {
			// debug(q)
			const prev = q.size;
			// prune(q, used);
			debug(i, prev, '->', q.size, prev - q.size, L, mini, jolt, w);
		}
		used[jolt] = L;
		const calc = (_i) => _i + 1;
		let cnt = 0;
		iter(buttons, b => {
			const njs = empty(5).map(_ => [...jolt]);
			// const nj = [...jolt];
			iter(b, change => {
				iter(njs, (nj, ii) => {
					nj[change] -= calc(ii);
				})
				// nj[change]--
			})
			iter(njs, (nj, ii) => {
				if (nj.some(j => j < 0)) return;
				if (nj in used && (L + calc(ii)) >= used[nj]) return;
				q.push([nj, L + calc(ii), (L + calc(ii)) * 2.5 + sum(nj)]);
				++cnt;
			})
			// debug(njs)
		})
		// debug(cnt)
	}
	return mini;
}

function part2(data) {

	let res = 0;
	data = lines(data);
	iter(data, (r, ri) => {
		debug(ri, data.length)
		const [lights, buttons, joltage] = parseData(r);
		const tmp = bfs2(joltage, buttons);
		console.assert(tmp !== -1)
		res += tmp;
	})

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
