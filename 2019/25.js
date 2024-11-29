const readline = require('readline')
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
const { IntCode } = require('./intcode');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const OPS = ["north", "south", "east", "west", "take", "drop", "inv"];

function runGame(game) {
	game.calculate()
	const q = game.getOutput(-1);
	rl.question(q.map(a => chr(a)).join(''), ans => {
		const [op, ...other] = ans.split(' ');
		if (OPS.indexOf(op) === -1) console.log("? BAD ?");
		game.unpause((ans + '\n').split('').map(a => ord(a)));
		runGame(game);
	})
}

const runProgram = (game) => {
	let program = fs.readFileSync("25_program").toString("utf-8");
	program = program.split('\n');
	iter(program, op => {
		game.calculate();
		const q = game.getOutput(-1);
		debug(q.map(a => chr(a)).join(''), op);
		game.unpause((op+'\n').split('').map(a => ord(a)));
	})
}

function part1(data) {

	let res = 0;
	data = ints(data);
	const game = new IntCode(data)

	// runGame(game);
	runProgram(game);
	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

function part2(data) {

	let res = 0;

	debug(res);
	if (res) exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("25_input").toString("utf-8");

	part1(data);
	// part2(data);
	// process.exit(0);
}

main();
