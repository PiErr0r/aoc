
const fs = require('fs');
const { exec } = require("child_process");
const { D4, D6, D8, MOD } = require("../lib");
const { joseph, findCycle } = require("../lib");
const { cache } = require("../lib");
const { bin, float, hex, int, num, oct } = require("../lib");
const { range, drange, trange, iter, diter, titer } = require("../lib");
const { copy,	entries, in_, inBB, keys, sort, values } = require("../lib");
const { Counter, DD, empty, FastQueue, PriorityQueue, Queue, set, Stack } = require("../lib");
const { ord, chr, count, debug, disp, disp3, crt, gcd, lcm, modPow, mod, prod, prodBig, randint, sum, sumBig, transpose } = require("../lib");
const { digits, ints,	floats,	singles,	words,	lines,	table,	groups,	getGroups,	groupsWith,	parse,	parseLine } = require ('../lib');
const { min, max, random, abs, ceil, floor, log, log10, log2, round, sign, sin, cos, tan, asin, acos, atan, atan2, sqrt, PI } = Math;
const { isSuperset, or, and, xor, sub } = set;
const { getExecStr } = require("../lib/post");
const { combinations, combinations_with_replacement, next_permutation, product } = require("../lib");

const parseOne = (props, pp) => {
	pp = pp.trim().split(' ');
	const [type, _, ...pps] = pp;
	pps.forEach(p => (props[type].push(p.replaceAll(',', '').trim())))
}

const parseProps = (s) => {
	const props = { immune: [], weak: [] };
	if (s.length === 0) return props;
	s = s.split(';');
	s.forEach(pp => {
		parseOne(props, pp);
	})
	return props;
}

const parseData = (data) => {
	let [tmpImmune, tmpInfection] = groups(data)
	tmpImmune = tmpImmune.slice(1);
	tmpInfection = tmpInfection.slice(1);

	let immune = [];
	iter(tmpImmune, imm => {
		if (imm.indexOf('(') !== -1) {
			imm = imm.split(')')
			imm = [...imm[0].split('('), ...imm.slice(1)];
			const [units, _1, _2, _3, hp, _4, _5] = imm[0].split(' ');
			const [_6, _7, _8, _9, _10, _11, dmg, type, _12, _13, _14, initiative] = imm[2].split(' ');
			const props = parseProps(imm[1]);
			immune.push({
				group: "IMMUNE",
				target: null,
				props,
				units: int(units),
				hp: int(hp),
				dmg: int(dmg),
				type,
				initiative: int(initiative),
			})
		} else {
			const [units, _1, _2, _3, hp, _4, _5, _6, _7, _8, _9, _10, dmg, type, _11, _12, _13, initiative] = imm.split(' ');
			const props = parseProps('');
			immune.push({
				group: "IMMUNE",
				target: null,
				props,
				units: int(units),
				hp: int(hp),
				dmg: int(dmg),
				type,
				initiative: int(initiative),
			})
		}
	});

	let infection = [];
	iter(tmpInfection, inf => {
		if (inf.indexOf('(') !== -1) {
			inf = inf.split(')')
			inf = [...inf[0].split('('), ...inf.slice(1)];
			const [units, _1, _2, _3, hp, _4, _5] = inf[0].split(' ');
			const [_6, _7, _8, _9, _10, _11, dmg, type, _12, _13, _14, initiative] = inf[2].split(' ');
			const props = parseProps(inf[1]);
			infection.push({
				group: "INFECTION",
				target: null,
				props,
				units: int(units),
				hp: int(hp),
				dmg: int(dmg),
				type,
				initiative: int(initiative),
			})
		} else {
			const [units, _1, _2, _3, hp, _4, _5, _6, _7, _8, _9, _10, dmg, type, _11, _12, _13, initiative] = inf.split(' ');
			const props = parseProps('');
			infection.push({
				group: "INFECTION",
				target: null,
				props,
				units: int(units),
				hp: int(hp),
				dmg: int(dmg),
				type,
				initiative: int(initiative),
			})
		}
	});

	return [...immune, ...infection];
}

const selectTargets = (armies) => {
	const chosen = new set();
	iter(armies, (curr, i) => {
		armies[i].target = null;
		let mxi = -1, mxDmg = 0, mxEff = 0, mxInit = 0;
		const { dmg, type, units } = curr;
		iter(armies, (target, j) => {
			if (i === j || chosen.has(j) || target.group === curr.group) return;

			let targetDmg = dmg * units;
			if (target.props.immune.indexOf(type) !== -1) targetDmg = 0;
			if (target.props.weak.indexOf(type) !== -1) targetDmg <<= 1;

			let effPower = target.units * target.dmg;
			let initiative = target.initiative;
			if (floor(targetDmg / target.hp) > 0 && targetDmg > mxDmg) {
				mxDmg = targetDmg;
				mxEff = effPower;
				mxInit = initiative;
				mxi = j;
			} else if (targetDmg && targetDmg === mxDmg) {
				if (effPower > mxEff) {
					mxEff = effPower;
					mxInit = initiative;
					mxi = j;
				} else if (effPower === mxEff) {
					if (initiative > mxInit) {
						mxInit = initiative;
						mxi = j;
					}
				}
			}
		});
		if (mxi !== -1) {
			armies[i].target = mxi;
			chosen.add(mxi);
		}
	})
	debug("HERE")
}

const allSame = (armies) => {
	const same = new set();
	iter(armies, army => {
		same.add(army.group);
	});
	return same.size === 1;
}

const attack = (armies, initiative) => {
	const losses = [];
	iter(initiative, ([init, i]) => {
		const army = armies[i];
		const { target } = army;
		if (target === null || army.units <= 0) return;
		let dmg = army.units * army.dmg;
		if (armies[target].props.weak.indexOf(army.type) !== -1) dmg <<= 1;
		if (armies[target].props.immune.indexOf(army.type) !== -1) dmg = 0;
		const dead = floor(dmg / armies[target].hp);
		// debug(dead, dmg, armies[target].units)
		armies[target].units -= dead;
		losses.push([target, dead])
	});
}

function part1(data) {

	let res = 0;
	let armies = parseData(data);

	while (!allSame(armies)) {
		sort(armies, ({ units: u1, dmg: d1, initiative: i1 }, { units: u2, dmg: d2, initiative: i2 }) => ((u2 * d2) - (u1 * d1)) || i2 - i1);
		selectTargets(armies);
		const initiative = armies.map((a, i) => [a.initiative, i]);
		sort(initiative, (a, b) => b[0] - a[0]);
		attack(armies, initiative);
		armies = armies.filter(a => a.units > 0);
	}

	iter(armies, army => {
		res += army.units;
	})


	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART1");
	return;
}

const allImmune = (armies) => {
	return allSame(armies) && armies[0].group === "IMMUNE";
}

function part2(data) {

	let res = 0;
	const original = parseData(data);

	let inc = 79;
	let armies;
	do {
		armies = original.map(a => Object.assign({}, a, { dmg: a.group === "IMMUNE" ? a.dmg + inc : a.dmg }));
		let cnt = 0;
		while (!allSame(armies)) {
			++cnt;
			sort(armies, ({ units: u1, dmg: d1, initiative: i1 }, { units: u2, dmg: d2, initiative: i2 }) => ((u2 * d2) - (u1 * d1)) || i2 - i1);
			selectTargets(armies);
			const initiative = armies.map((a, i) => [a.initiative, i]);
			sort(initiative, (a, b) => b[0] - a[0]);
			attack(armies, initiative);
			armies = armies.filter(a => a.units > 0);
			debug('!!!', inc, cnt,armies.map(a => [a.hp,a.target, a.group, a.units].join('.')))
		}
		++inc;
		debug(inc)
	} while (!allImmune(armies))

	iter(armies, army => {
		res += army.units;
	})

	debug(res);
	exec(`echo ${res} | xclip -sel clip -rmlastnl`);
	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("24_input").toString("utf-8");

	part1(data);
	part2(data);
	process.exit(0);
}

main();
