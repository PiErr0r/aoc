
const fs = require('fs');
const { exec } = require("child_process");
const { bin, float, hex, int, num, oct } = require("../lib");
const { ord, chr, count, debug, disp, randint, gcd, lcm, crt, modPow, mod } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { empty, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine, copy } = require ('../lib');
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

	let res = 0;
	data = lines(data).map(a => a.split(' | ').map(b => b.split(' ')));

	iter(data, i => {
		iter(i[1], j => {
			switch(j.length) {
				case 2:
				case 3:
				case 4:
				case 7:
					++res;
					break;
			}
		})
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;
	data = lines(data).map(a => a.split(' | ').map(b => b.split(' ')));

	iter(data, i => {
		const digs = {};
		digs[1] = new set(i[0].find(a => a.length === 2).split(''));
		digs[7] = new set(i[0].find(a => a.length === 3).split(''));
		digs[4] = new set(i[0].find(a => a.length === 4).split(''));
		digs[8] = new set(i[0].find(a => a.length === 7).split(''));
		const _069 = i[0].filter(a => a.length === 6);
		const _235 = i[0].filter(a => a.length === 5);
		digs[2] = new set(_235.find(a => (sub(new set(a.split('')), digs[4] ).size === 3)).split(''));
		digs[3] = new set(_235.find(a => (sub(new set(a.split('')), digs[1] ).size === 3)).split(''));
		digs[5] = new set(_235.find(a => (sub(new set(a.split('')), digs[2] ).size !== 0 
											&& sub(new set(a.split('')), digs[3] ).size !== 0)).split(''));

		digs[9] = new set(_069.find(a => (sub(new set(a.split('')), digs[4] ).size === 2)).split(''));
		digs[0] = new set(_069.find(a => (sub(new set(a.split('')), digs[1] ).size === 4 
											&& sub(new set(a.split('')), digs[9] ).size !== 0)).split(''));
		digs[6] = new set(_069.find(a => (sub(new set(a.split('')), digs[1] ).size === 5)).split(''));;

		let curr = 0;
		iter(i[1], (j, jid) => {
			j = new set(j.split(''));
			range(10)(k => {
				if (xor(j, digs[k]).size === 0) {
					curr = 10 * curr + k;
				}
			})
		})
		res += curr;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("08_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
