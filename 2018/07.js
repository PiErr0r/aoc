
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

const string = 'Step F must be finished before step R can begin.';

const parse = (data) => data.map(d => {
	const a = d.split(' ');
	return [a[1], a[7]];
})

const makeTree = (data) => {
	TREE = {};
	iter(data,rule => {
		const [fst, snd] = rule;
		if (!TREE[fst]) {
			TREE[fst] = { children: [], parents: new set() };
		}
		if (!TREE[snd]) {
			TREE[snd] = { children: [], parents: new set() };
		}
		TREE[fst].children.push(snd);

		TREE[snd].parents.add(fst);
	});
	return TREE;
}

function part1(data) {

	data = parse(data);
	const TREE = makeTree(data);

	let ps = [];
	Object.keys(TREE).forEach(node => {
		TREE[node].children.sort();
		if (TREE[node].parents.size === 0) {
			ps.push(node);
		}
	});

	ps.sort();
	let s = '';
	const q = new Queue();
	const done = new set();
	for (let p of ps) q.push(p);
	let children = new set();
	while (!q.empty()) {
		const curr = q.pop();
		done.add(curr);
		s += curr;
		for (let c of TREE[curr].children) {
			if (sub(TREE[c].parents, done).size === 0) {
				q.push(c);
			}
		}
	}

	debug(s)

	console.log("END OF PART1");
	return;
}

function part2(data) {
	data = parse(data);
	const TREE = makeTree(data);

	const pending = new Queue();
	Object.keys(TREE).forEach(k => {
		if (TREE[k].parents.size === 0) {
			pending.push(k);
		}
		TREE[k].children.sort()
	});

	const workers = new Array(5).fill(0).map(a => ({ curr: '.', dur: 0 }));
	const done = new set();
	const progress = new set();

	let s = '';
	let cnt = 0;
	while (!pending.empty() || progress.size) {
		for (let i = 0; i < 5; ++i) {
			workers[i].dur--;
			if (workers[i].curr === '.' || workers[i].dur < 0) {
				done.add(workers[i].curr);
				progress.delete(workers[i].curr)
				if (TREE[ workers[i].curr ]) {
					for (let c of TREE[ workers[i].curr ].children) {
						if (sub(TREE[c].parents, done).size === 0) {
							pending.push(c);
						}
					}
				}
				const n = pending.pop();
				if (n === undefined) {
					workers[i].curr = '.';
					continue;
				}
				s += n;
				progress.add(n);
				workers[i].curr = n;
				workers[i].dur = 60 + (ord(n) - ord('A'));
			}
		}
		++cnt;
	}
	debug(s, cnt - 2) // not sure why I go into the loop 2 times
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("07_input").toString("utf-8");
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
