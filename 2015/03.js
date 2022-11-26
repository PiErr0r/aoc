
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
// const { parsePacket, ops, HEX, ALU, VARS, resetVars } = require('./lib_2021'); // specific to AOC 2021

function part1(data) {

	data = singles(data);
	let curr = [0, 0];
	let res = new set();
	res.add('0-0');
	iter(data, dir => {
		let dx = 0, dy = 0;
		switch (dir) {
		case '>': dx = 1; break;
		case '<': dx = -1; break;
		case '^': dy = 1; break;
		case 'v': dy = -1; break;
		default: debug("BAD");
		}
		let [x, y] = curr;
		res.add(`${x+dx}-${y+dy}`);
		curr = [x+dx, y+dy];
	})


	debug(res.size);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	data = singles(data);
	let curr1 = [0, 0];
	let curr2 = [0, 0];
	let res = new set();
	let curr = false;
	res.add('0-0');
	iter(data, dir => {
		let dx = 0, dy = 0;
		switch (dir) {
		case '>': dx = 1; break;
		case '<': dx = -1; break;
		case '^': dy = 1; break;
		case 'v': dy = -1; break;
		default: debug("BAD");
		}
		let [x, y] = curr ? curr2 : curr1;
		res.add(`${x+dx}-${y+dy}`);
		const tmp = [x+dx, y+dy];
		if (curr) 
			curr2 = [...tmp];
		else
			curr1 = [...tmp];
		curr = !curr;
		
		// (curr ? curr2 : curr1) = ;
	})
	debug(res.size);
	// exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("03_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
