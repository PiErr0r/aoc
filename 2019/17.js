
var fs = require('fs');
var { debug, disp, range, drange, trange } = require("../helpers");
var { IntCode } = require("./intcode");

const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];

const mod = (a, b) => {
	if (a < 0) {
		return mod(a + b, b);
	} else {
		return a % b;
	}
}

const findTurn = (S, x, y, di) => {
	const r = mod(di + 1, 4);
	const l = mod(di - 1, 4);
	const [rdx, rdy] = DIRS[r];
	const [ldx, ldy] = DIRS[l];
	if (y + ldy < S.length && x + ldx < S[0].length && S[y + ldy][x + ldx] === '#') {
		return [l, 'L'];
	} else if (y + rdy < S.length && x + rdx < S[0].length && S[y + rdy][x + rdx] === '#') {
		return [r, 'R'];
	} else {
		return [-1, 'End'];
	}
}

const isPlus = (S, x, y) => {
	const res = [];
	for (d of DIRS) {
		const [dx, dy] = d;
		if (y + dy < S.length && x + dx < S[0].length) {
			res.push(S[y+dy][x+dx] === '#');
		} else {
			return false;
		}
	}
	return res.every(a => a);
}

function part1(data) {
	const game = new IntCode(data);
	game.calculate();

	const screen = game.getOutput(-1)
		.map(a => String.fromCharCode(a))
		.join('')
		.split('\n')
		.filter(r => r.length > 20)
		.map(s => s.split(''));
	
	let di = 2;
	let pos;
	range(screen[0].length)(i => {
		if (screen[0][i] === '#') {
			pos = [i, 0];
		}
	});

	const inters = new Set();

	let sum = 0;
	for (p of inters) {
		const x = Math.floor(p / 100);
		const y = p % 100;
		sum += x * y;
		screen[y][x] = 'O';
	}
	debug(sum);
	console.log("END OF PART1");
	return;
}

function part2(data) {
	data[0] = 2;
	const game = new IntCode(data);
	game.calculate();

	const screen = game.getOutput(-1)
		.map(a => String.fromCharCode(a))
		.join('')
		.split('\n')
		.filter(r => r.length > 20)
		.map(s => s.split(''));
	
	let pos;

	range(screen.length)(i => {
		if (screen[i][0] === '^') {
			pos = [0, i];
			return true;
		}
	});

	const moves = [];
	let di = 0;
	let cnt = 0;
	let turn;

	while (true) {
		const [dx, dy] = DIRS[di];
		let [x, y] = pos;
		x += dx;
		y += dy;
		if ((0 <= y && y < screen.length) && (0 <= x && x < screen[0].length) && screen[y][x] === '#') {
			++cnt;
		} else if (y < 0 || x < 0 || y >= screen.length || x >= screen[0].length || screen[y][x] === '.') {
			x -= dx;
			y -= dy;
			[di, turn] = findTurn(screen, x, y, di);
			if (di == -1) {
				moves.push(cnt);
				break;
			}
			if (cnt)
				moves.push(cnt);
			moves.push(turn);
			cnt = 0;
		}
		pos = [x, y];
	}

	// tried to solve programatically
	// let fncs = [];
	// let fn = 'A';

	// while (moves.indexOf('R') !== -1 || moves.indexOf('L') !== -1) {
	// 	let pat = '', reg, i = 0;
	// 	let prev, next = 0;
	// 	do {
	// 		prev = next;
	// 		pat += moves[i];
	// 		next = pat.length;
	// 		req = `/${pat}/g`;
	// 	} while (moves.join('').match(reg).length > 1);
		
	// 	pat = pat.slice(pat.length - (next - prev));
	// }

	// soved by hand
	const fncs = {
		A: 'R,5,5,L,6,6,R,6\n',
		B: 'R,6,R,5,5,R,6,6,R,6\n',
		C: 'R,5,5,L,6,6,L,6,6\n'
	}

	game.unpause('A,A,B,C,B,C,B,C,B,A\n'.split('').map(a => a.charCodeAt(0)))
	game.calculate();
	range(3)(i => {
		const out = game.getOutput(-1).map(c => String.fromCharCode(c)).join('');
		game.unpause(fncs[ out[out.length - 3] ].split('').map(a => a.charCodeAt(0)))
		game.calculate();
	})
	console.log(game.getOutput(-1).map(c => String.fromCharCode(c)).join(''));
	game.unpause(['y'.charCodeAt(0), '\n'.charCodeAt(0)]);
	game.calculate();

	let O = game.getOutput(-1);
	const ans = O.splice(O.length - 1)[0]
	debug(ans);
	O = O.map(c => String.fromCharCode(c)).join('').split('\n\n');

	const play = (i) => {
		if (i === O.length) return;
		disp(O[i].split('\n'));
		setTimeout(() => play(i+1), 100);
	}
	play(0);


	console.log("END OF PART2");
	return;
}

function main() {
	let data = fs.readFileSync("17_input").toString("utf-8");
	// data = data.split('\n');
	data = data.split(',').map(a => Number(a));

	if (Array.isArray(data)) {
		part1(Array.from(data));
		part2(Array.from(data));
	} else {
		part1(data);
		part2(data);
	}
}

main();
