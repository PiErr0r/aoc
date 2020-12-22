
import math, copy, re, hashlib
import itertools as it
import numpy as np
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

UP = 0
RIGHT = 1
DOWN = 2
LEFT = 3

def get_short(t):
	ret = t[1:-1]
	ret = [r[1:-1] for r in ret]
	return ret

def get_tiles(d, short = False):
	ret = []
	for tile in d:
		if len(tile.strip()) == 0: continue
		tile = tile.split('\n')
		id = int(tile[0][5:-1])
		t = {
			'id': id,
			'tile': tile[1::],
			'pos': None,
			'neigh': set(),
			'ass': [None, None, None, None],
			'set': False
		}
		# neigh: [UP, RIGHT, DOWN, LEFT]
		ret.append(t)
		
	return ret

def are_lr(t1, t2):
	return "".join([r[-1] for r in t1['tile']]) == "".join([r[0] for r in t2['tile']])

def are_ud(t1, t2):
	return t1['tile'][-1] == t2['tile'][0]

def do_match(t1, t2):
	ret = any([r1 == r2 or "".join(reversed(r1)) == r2 for r1 in [t1[0], t1[-1]] for r2 in [t2[0], t2[-1], "".join([r[0] for r in t2]), "".join([r[-1] for r in t2])]])
	ret = ret or any([c1 == c2 or "".join(reversed(c1)) == c2 for c1 in ["".join([r[0] for r in t1]), "".join([r[-1] for r in t1])] for c2 in [t2[0], t2[-1], "".join([r[0] for r in t2]), "".join([r[-1] for r in t2])]])
	return ret


def part_1(data):

	tiles = get_tiles(data)
	for i, tf in enumerate(tiles):
		for j, ts in enumerate(tiles):
			if i == j: continue
			if do_match(tf['tile'], ts['tile']):
				tiles[i]['neigh'] |= {ts['id']}
				tiles[j]['neigh'] |= {tf['id']}

	cnt = 1
	for t in tiles:
		if len(t['neigh']) == 2:
			cnt *= t['id']
	print(cnt)
	print('END OF PART1')
	part_2(tiles)
	return

def flip(t, dir):
	if dir == 'h':
		return t[::-1]
	elif dir == 'v':
		return ["".join(r[i]) for r in t for i in range(len(t))]

def rot(t):
	nt = [list(i) for i in t]
	nt = np.rot90(nt)
	return ["".join(i) for i in t]

def rot90(t, n = 1):
	for i in range(n):
		t = rot(t)
	return t

def change(t, i, j, rev):
	if i == j:
		if not rev: 
			return flip(t, 'v' if i % 2 == 0 else 'h')
		else:
			return rot90(t, 2)
	elif i == (j + 2) % 4:
		return t if rev else flip(t, 'h' if i & 1 else 'v')
	elif i == 0 and j == 3:
		return rot90(t, 3) if rev else flip(rot90(t, 3), 'v')
	elif i == 3 and j == 0:
		return rot90(t) if rev else flip(rot90(t, 3), 'h')
	elif i == 1 and j == 2:
		return rot90(t) if rev else flip(rot90(t), 'h')
	elif i == 2 and j == 1:
		return rot90(t, 3) if rev else flip(rot90(t, 3), 'v')
	elif i == 2 and j == 3:
		return rot90(t) if rev else flip(rot90(t), 'v')
	elif i == 3 and j == 2:
		return rot90(t, 3) if rev else flip(rot90(t, 3), 'h')
	elif i == 0 and j == 1:
		return rot90(t) if rev else flip(rot90(t), 'v')
	elif i == 1 and j == 0:
		return rot90(t, 3) if rev else flip(rot90(t, 3), 'h')
	else:
		print("BAD")
		return None

def set_tiles(tiles, i1, i2):
	if tiles[i1]['set'] and tiles[i2]['set']:
		return tiles
	t1 = tiles[i1]['tile']
	t2 = tiles[i2]['tile']
	match = False
	for i, r1 in enumerate([t1[0], "".join([r[-1] for r in t1]), ''.join(reversed(t1[-1])), "".join([r[0] for r in t1[::-1]])]):
		for j, r2 in enumerate([t2[0], "".join([r[-1] for r in t2]), ''.join(reversed(t2[-1])), "".join([r[0] for r in t2[::-1]])]):
			if r1 == r2:
				t1 = change(t1, i, j, True)
				match = True
				break
			elif ''.join(reversed(r1)) == r2:
				t1 = change(t1, i, j, False)
				match = True
				break
		if match:
			print(tiles[i1]['id'], tiles[i2]['id'])
			tiles[i2]['ass'][j] = tiles[i1]['id']
			tiles[i1]['set'] = True
			tiles[i1]['tile'] = t1[::]
			tiles[i1]['ass'][(j + 2) % 4] = tiles[i2]['id']
			break
	return tiles

def assemble(tiles, i):
	print("NEW", tiles[i]['id'])
	if len(tiles[i]['neigh']) == 0:
		return tiles
	tiles[i]['set'] = True
	while len(tiles[i]['neigh']): 
		id = tiles[i]['neigh'].pop()
		for j, t in enumerate(tiles):
			if id == t['id']:
				break
		tiles = set_tiles(tiles, j, i)
		tiles = assemble(tiles, j)
	return tiles

def get_pos(p, i):
	x,y = p
	if i == 0: return 	(x   ,y-1)
	elif i == 1: return (x+1 ,y)
	elif i == 2: return (x   ,y+1)
	elif i == 3: return (x-1 ,y)

def fill_grid_r(pos, g, tiles, t):
	x, y = pos
	if g[y][x] is not None:
		return g
	g[y][x] = t
	tile = None
	for i in tiles:
		if i['id'] == t:
			tile = i
			break
	for i, t_id in enumerate(tile['ass']):
		p = get_pos(pos, i)
		g = fill_grid_r(p, g, tiles, t_id)
	return g

def fill_grid(g, tiles):
	x, y = (len(g) // 2, len(g) // 2)
	t = tiles[0]
	g[y][x] = t['id']
	for i, t_id in enumerate(t['ass']):
		print(t_id)
		if t_id is not None:
			p = get_pos((x, y), i)
			g = fill_grid_r(p, g, tiles, t_id)
	for i in g:
		print(i)

def parse(tiles):
	for i in rl(tiles):
		tiles[i]['tile'] = [r[1:-1] for r in tiles[i]['tile'][1:-1]]

	grid = [[None for i in range(50)] for j in range(50)]
	grid = fill_grid(grid, tiles)


def part_2(tiles):
	tiles = assemble(tiles, 0)
	for t in tiles:
		print(t)
	img = parse(tiles)

	monster = ['                  # ','#    ##    ##    ###', ' #  #  #  #  #  #   ']
	monster_found = False
	while not monster_found:
		monster_found = has_monster(img, monster)
		img = rot(img)

	img = fill_mons(img, monster)
	cnt = count_safe(img)
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	