
const fs = require('fs');
const { exec } = require("child_process");
const { ord, chr, debug, disp, int, num, float, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;

const sort = (arr, fn = (a, b) => a-b) => {
	arr.sort(fn);
}
const in_ = (a, arr) => arr.indexOf(a) !== -1;

const D4 = [[0,1],[1,0],[0,-1],[-1,0]];
const D8 = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];
const MOD = 1e9+7;

function part1(data) {
	const [p, _1, _2, _3, _4, _5, pts, _6] = data.split(' ').map(a => int(a));

	const players = new Array(p).fill(0);
	const marbles = [0, 1];
	let curr = 1;

	range(2, pts + 1)(i => {
		if (i % 23 === 0) {
			let player = i % p;
			if (player === 0) player = p;
			const pos = mod(curr - 7, marbles.length);
			players[player - 1] += i;
			players[player - 1] += marbles[pos];
			curr = pos;
			marbles.splice(curr, 1);
		} else {
			const pos = mod(curr + 2, marbles.length)
			if (pos === 0) {
				curr = marbles.length;
				marbles.push(i)
			} else {
				marbles.splice(pos, 0, i);
				curr = pos;
			}
		}
		let a = i%p ? i%p : p;
	});

	let res = max(...players);
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);

	console.log("END OF PART1");
	return;
}

function part2(data) {
	const [p, _1, _2, _3, _4, _5, tpts, _6] = data.split(' ').map(a => int(a));
	const pts = 100 * tpts;
	const players = new Array(p).fill(0);

	let LL = { value: 0, next: null, prev: null };
	LL.next = { value: 1, next: LL, prev: LL };
	LL.prev = LL.next;
	LL = LL.next
	let i = 2;
	while (i <= pts) {
		if (i % 23 === 0) {
			let player = i % p;
			if (player === 0) player = p;
			players[player - 1] += i;
			for (let j = 0; j < 7; ++j) {
				LL = LL.prev;
			}
			const tmp = LL;
			players[player - 1] += LL.value;
			LL.prev.next = LL.next;
			LL.next.prev = LL.prev;
			LL = LL.next;
			delete tmp; // maybe redundant since garbage collection 
		} else {
			LL = LL.next;
			LL.next = { value: i, prev: LL, next: LL.next };
			LL.next.next.prev = LL.next;
			LL = LL.next;
		}

		++i;
	}

	let res = max(...players);
	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("09_input").toString("utf-8");

	part1(data);
	part2(data);

}

main();
