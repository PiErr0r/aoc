from random import randint
from intcode import IntCode
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
# from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

dirs = [(0, 1), (0, -1), (-1, 0), (1, 0)]
tile = {
	0: '#',
	1: '.',
	2: 'O'
}

other_way = [(0, -1), (0, 1), (1, 0), (-1, 0)]
owi = [1, 0, 3, 2]
MINX = MINY = MAXX = MAXY = 0

def gr():
	return randint(1,4)

def disp(G, mnx = None, mxx = None, mny = None, mxy = None):
	global MINX , MINY , MAXX , MAXY
	if mnx is None:
		mnx = MINX
	if mxx is None:
		mxx = MAXX
	if mny is None:
		mny = MINY
	if mxy is None:
		mxy = MAXY
	for i in range(mny, mxy + 1):
		for j in range(mnx, mxx + 1):
			tmp = G.get((j, i), None)
			if i == 0 and j == 0:
				print('S', end = '')
				continue
			if tmp is not None:
				print(tmp, end='')
			else:
				print('?', end='')
		print()

def dfs(G, mnx, mxx, mny, mxy):
	q = [(0, 0, 0)]
	
	while len(q):
		p = q.pop(0)
		x, y, l = p
		tmp = G.get((x, y), None)
		if tmp is None or tmp == tile[0] or tmp == 'V':
			continue
		G[(x, y)] = 'V'
		if tmp == tile[2]:
			return l
		for dr in dirs:
			dx, dy = dr
			q.append((x+dx, y+dy, l+1))



def part_1(data):

	pos = [0, 0]
	GRID = {tuple(pos): tile[1]}
	minx = miny = maxx = maxy = 0
	res = None
	di = gr()
	game = IntCode(data, [di])
	cnt = 0
	while res != 2:
		game.calculate()
		dx, dy = dirs[di - 1]
		tmp = (pos[0] + dx, pos[1] + dy)
		res = game.get_output(-1)[0]
		GRID[tmp] = tile[res]
		if res != 0:
			pos = list(tmp)
		if pos[0] < minx:
			minx = pos[0]
		if pos[0] > maxx:
			maxx = pos[0]
		if pos[1] < miny:
			miny = pos[1]
		if pos[1] > maxy:
			maxy = pos[1]
		di = gr()
		game.unpause([di])
		cnt += 1

	disp(GRID, minx, maxx, miny, maxy)

	res = dfs(GRID, minx, maxx, miny, maxy)
	print(res)
	print('END OF PART1')
	return


def bfs(game, G, pos, dr):
	global MINX , MINY , MAXX , MAXY
	game.unpause([dr + 1])
	game.calculate()
	res = game.get_output(-1)[0]
	G[tuple(pos)] = tile[res]

	if res == 0:
		return False
	for i in range(len(dirs)):
		dx, dy = dirs[i]
		pos = [pos[0] + dx, pos[1] + dy]
		if G.get(tuple(pos), None) is not None:
			pos = [pos[0] - dx, pos[1] - dy]	
			continue

		if pos[0] < MINX:
			MINX = pos[0]
		if pos[0] > MAXX:
			MAXX = pos[0]
		if pos[1] < MINY:
			MINY = pos[1]
		if pos[1] > MAXY:
			MAXY = pos[1]

		tmp = bfs(game, G, pos, i)
		if not tmp:
			pos = [pos[0] - dx, pos[1] - dy]
			continue
			
		pos = [pos[0] - dx, pos[1] - dy]
		game.unpause([ owi[i] + 1 ])
		game.calculate()
		asd = game.get_output(-1)[0]

	return True


def find_O(G):
	for i in range(MINY, MAXY + 1):
		for j in range(MINX, MAXX + 1):
			if G.get((j, i), None) == tile[2]:
				return (j, i)

def dfs_O(G, pos):
	tx, ty = pos
	q = [(tx, ty, 0)]
	mxl = 0
	while len(q):
		p = q.pop(0)
		x, y, l = p
		tmp = G.get((x, y), None)
		if tmp is None or tmp == tile[0] or tmp == 'V':
			continue
		G[(x, y)] = 'V'
		if l > mxl:
			mxl = l
		for dr in dirs:
			dx, dy = dr
			tmp_pos = (x+dx, y+dy)
			tmp_res = G.get(tmp_pos, None)
			if tmp_res is None or tmp_res != tile[1]:
				continue
			q.append((x+dx, y+dy, l+1))

	return mxl

def part_2(data):
	global MINX , MINY , MAXX , MAXY
	pos = [0, 0]
	GRID = {tuple(pos): tile[1]}
	game = IntCode(data, [])
	
	bfs(game, GRID, [0,-1], 1)
	
	pos_O = find_O(GRID)
	res = dfs_O(GRID, pos_O)
	print(res)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('15_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split(',')))
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	