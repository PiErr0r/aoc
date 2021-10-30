from lib import disp
from intcode import IntCode
import math, copy, re, hashlib
import itertools as it

"""
1 is a wall tile.  Walls are indestructible barriers.
2 is a block tile.  Blocks can be broken by the ball.
3 is a horizontal paddle tile.  The paddle is indestructible.
4 is a ball tile.  The ball moves 
"""
t = {
	0: ' . ',
	1: ' # ',
	2: ' * ',
	3: '___',
	4: ' o '
}

def part_1(data):
	game = IntCode(data, [])
	game.calculate()
	screen = game.get_output(-1)

	i = 0
	cnt = 0
	while i < len(screen):
		[x, y, tile] = screen[i:i + 3] 
		if tile == 2:
			cnt += 1
		i += 3
	print(cnt)
	# disp(GRID)
	print('END OF PART1')
	return

def sign(n):
	if n == 0:	return 0
	elif n > 0:	return 1
	else: 			return -1

def empty_plus(G, x, y):
	return G[y][x + 1] != t[2] and G[y][x - 1] != t[2] and G[y + 1][x] != t[2] and G[y - 1][x] != t[2]

def empty_x(G, x, y):
	return G[y + 1][x + 1] != t[2] and G[y + 1][x - 1] != t[2] and G[y - 1][x + 1] != t[2] and G[y - 1][x - 1] != t[2]

def up_n_lr(G, x, y, dx):
	if dx > 0:
		return G[y][x+1] in [t[1], t[2]] #and G[y-1][x] in [t[1], t[2]]
	else:
		return G[y][x-1] in [t[1], t[2]] #and G[y-1][x] in [t[1], t[2]]

def part_2(data):
	data[0] = 2
	game = IntCode(data, [])
	game.calculate()
	rows = 23
	cols = 44

	cnt = 0
	ball_y = None
	ball_x = None
	ball_y_prev = None
	ball_x_prev = None
	ball_x_fut = None
	me_x = None
	GRID = [[' . ' for i in range(cols)] for j in range(rows)]
	while not game.is_halted():
		screen = game.get_output(-1)
		i = 0
		while i < len(screen):
			[x, y, tile] = screen[i:i + 3] 
			if x == -1 and y == 0:
				score = tile
				i += 3
				continue
			else:
				GRID[y][x] = t[tile]

			if tile == 4:
				ball_x_prev = ball_x
				ball_y_prev = ball_y
				ball_x = x
				ball_y = y
			elif tile == 3:
				me_x = x

			i += 3

		rmed = False
		if ball_x_prev is None:
			to_play = [0, 0, 0]
		else:
			to_rm = 0
			sgn = sign(ball_x - ball_x_prev)
			truth = (empty_plus(GRID, ball_x, ball_y) and not empty_x(GRID, ball_x, ball_y) and GRID[ball_y - 1][ball_x + sgn] == t[2] or 
				GRID[ball_y - 1][ball_x + sgn] == t[0] and  empty_plus(GRID, ball_x + sgn, ball_y - 1) and not empty_x(GRID, ball_x + sgn, ball_y - 1)
				and GRID[ball_y - 2][ball_x + 2*sgn] == t[2])
			truth2 = ball_x < 42 and up_n_lr(GRID, ball_x + sgn, ball_y - 1, sgn) and GRID[ball_y - 1][ball_x + sgn] == t[0] and GRID[ball_y - 1][ball_x] != t[2] 
			truth3 = ball_x < 42 and up_n_lr(GRID, ball_x + sgn, ball_y + 1, sgn) and GRID[ball_y + 1][ball_x + sgn] == t[0] and GRID[ball_y + 1][ball_x] != t[2] and cnt > 150

			if (truth or truth2) and ball_y < ball_y_prev or up_n_lr(GRID, ball_x, ball_y, sgn) or truth3 and ball_y > ball_y_prev and ball_y < 19:
				if not (truth or truth2):
					tmp = sgn
					sv = GRID[ball_y][ball_x + tmp]
					GRID[ball_y][ball_x + tmp] = t[0]
					# disp(GRID)
					truth = (empty_plus(GRID, ball_x, ball_y) and not empty_x(GRID, ball_x, ball_y) and GRID[ball_y - 1][ball_x + sgn] == t[2] or 
						GRID[ball_y - 1][ball_x + sgn] == t[0] and  empty_plus(GRID, ball_x + sgn, ball_y - 1) and not empty_x(GRID, ball_x + sgn, ball_y - 1)
						and GRID[ball_y - 2][ball_x + 2*sgn] == t[2])
					truth2 = ball_x < 42 and up_n_lr(GRID, ball_x + sgn, ball_y - 1, sgn) and GRID[ball_y - 1][ball_x + sgn] == t[0] and GRID[ball_y - 1][ball_x] != t[2] 

					if (truth or truth2):
						sgn *= -1
					# print("HERE", sgn, truth or truth2)
					GRID[ball_y][ball_x + tmp] = sv

				sgn *= -1

			ball_x_fut = ball_x + 3 * sgn
			if ball_y > ball_y_prev and ball_y >= 18 and ball_y <= 20:
				to_rm = ball_y - 18 + 1
				if to_rm == 3 and me_x == ball_x: 
					to_rm = 0
			rmed = ball_y == 20 and ball_x + sgn == me_x

			ball_x_fut -= sgn * to_rm
			if ball_x_fut >= cols - 1:
				ball_x_fut -= 4
			elif ball_x_fut <= 0:
				ball_x_fut += 3

			tempe = None
			if ball_y < 6 and cnt < 920:
				if ball_x < 15:
					tempe = (12 + ball_x) // 2
				elif ball_x < 30:
					tempe = (18 + ball_x) // 2
				else:
					tempe = (31 + ball_x) // 2
			diff = min(abs((ball_x_fut if tempe is None else tempe) - me_x), 3)
			sgn = sign((ball_x_fut if tempe is None else tempe) - me_x)

			to_play = diff * [sgn] if not rmed else [0] + (diff - 1) * [sgn]
			if 3 - diff == 2 and ball_y > 17:
				if ball_y == 19:
					to_play += [0, sign(ball_x - ball_x_prev) if me_x != 1 else -sign(ball_x - ball_x_prev)]
				elif ball_y == 18:
					to_play += [sign(ball_x - ball_x_prev), 0]
				elif ball_y == 20:
					if me_x <= 4 or me_x >= 40:
						to_play += [-sgn, -sgn]
					else:
						to_play += [sgn, sgn]
				else:
					to_play += [sgn, sgn]
			else:
				to_play += (3 - diff) * [0]

		if to_play in [[0,0,1],[0,1,0],[1,0,0]]:
			to_play = [sgn, 1, -1]
		if cnt in [113]:
			to_play = [0, 1, -1]
		if cnt >= 113 and me_x == ball_x and ball_y == 20:
			to_play[0] = 0
		if cnt in [199, 840, 841, 842, 839, 1322]:
			to_play = [1, 1, 1]
		elif cnt in [542, 916, 973, 990, 1046, 1083, 1612, 1792]:
			to_play = [-1, -1, -1]
		elif cnt == 951:
			to_play = [1, 0, -1]
		elif cnt in [1965, 2495]:
			to_play = [1, -1, 1]

		game.unpause(to_play)
		game.calculate()

		cnt += 1

	print(game.get_output(-1)[-1])
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	