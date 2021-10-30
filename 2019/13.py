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

	ball_x = 0
	me_x = 0
	while not game.is_halted():
		screen = game.get_output(-1)
		i = 0
		while i < len(screen):
			[x, y, tile] = screen[i:i + 3] 
			if x == -1 and y == 0:
				pass
			else:
				if tile == 4:
					ball_x = x
				elif tile == 3:
					me_x = x

			i += 3

		game.unpause([sign(ball_x - me_x)])
		game.calculate()

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
	