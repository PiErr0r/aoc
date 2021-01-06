
import math, copy, re, hashlib
import itertools as it
import numpy as np
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields, disp

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

def flip(t, f):
	# f == horizontal
	if f:
		return ["".join(list(reversed(r))) for r in t]
	else:
		return t[::-1]

def rot(t):
	nt = [list(i) for i in t]
	nt = np.rot90(nt)
	return ["".join(i) for i in nt][::]

def rot90(t, n = 1):
	for i in range(n):
		t = rot(t)
	return t[::]

def change(t, i, j, rev):
	# j = fixed
	if i == j:
		return rot90(t, 2) if rev else flip(rot90(t, 2), i % 2 == 0)
	elif (i + 2) % 4 == j:
		return t if rev else flip(t, i % 2 == 0)
	elif (i + 1) % 4 == j:
		return rot(t) if rev else flip(rot(t), i % 2 == 1)
	elif i == (j + 1) % 4:
		return rot90(t, 3) if rev else flip(rot90(t, 3), i % 2 == 1)
	else:
		print("BAD")
		exit(0)


def set_tiles(tiles, i1, i2):
	# if tiles[i1]['set']:
	# 	return tiles
	t1 = tiles[i1]['tile']
	t2 = tiles[i2]['tile']
	match = False
	for i, r1 in enumerate([t1[0], "".join([r[-1] for r in t1]), ''.join(reversed(t1[-1])), "".join([r[0] for r in t1[::-1]])]):
		for j, r2 in enumerate([t2[0], "".join([r[-1] for r in t2]), ''.join(reversed(t2[-1])), "".join([r[0] for r in t2[::-1]])]):
			if r1 == r2 or r1[::-1] == r2:
				t1 = change(t1, i, j, r1[::-1] == r2)
				match = True
				break

		if match:
			if tiles[i2]['ass'][j] is not None or tiles[i1]['ass'][(j + 2) % 4] is not None:
				exit(1)
			tiles[i2]['ass'][j] = tiles[i1]['id']
			tiles[i1]['tile'] = t1[::]
			tiles[i1]['ass'][(j + 2) % 4] = tiles[i2]['id']
			break
	return tiles

def assemble(tiles, i):
	if len(tiles[i]['neigh']) == 0:
		return tiles
	tiles[i]['set'] = True
	while len(tiles[i]['neigh']): 
		id = tiles[i]['neigh'].pop()
		j = 0
		while j < len(tiles):
			if id == tiles[j]['id']:
				tiles[j]['neigh'] -= {tiles[i]['id']}
				break
			j += 1
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
	if t is None:
		return g
	x, y = pos
	if g[y][x] is not None:
		return g
	g[y][x] = t
	tile = None
	for i in tiles:
		if i['id'] == t:
			tile = i
			break
	i = 0
	
	while i < len(tile['ass']):
		t_id = tile['ass'][i]
		p = get_pos(pos, i)
		g = fill_grid_r(p, g, tiles, t_id)
		i += 1
	return g

def get_s_tile(t_id, tiles):
	i = 0
	while i < len(tiles):
		if tiles[i]['id'] == t_id:
			return tiles[i]['tile'][::]
		i += 1

def fill_grid(g, tiles):
	x, y = (len(g) // 2, len(g) // 2)
	t = tiles[0]
	g[y][x] = t['id']
	for i, t_id in enumerate(t['ass']):
		if t_id is not None:
			p = get_pos((x, y), i)
			g = fill_grid_r(p, g, tiles, t_id)
	ret = []
	for i, row in enumerate(g):
		first = False
		for j, col in enumerate(row):
			if col is None:
				continue
			curr_tile = get_s_tile(col, tiles)
			for _ in range(len(curr_tile)):
				if not first:
					ret.append(curr_tile[_])
				else:
					ret[(i - 15) * len(curr_tile) + _] += curr_tile[_]
			first = True
	return ret

def parse(tiles):
	for i in rl(tiles):
		tiles[i]['tile'] = [r[1:-1] for r in tiles[i]['tile'][1:-1]]

	grid = [[None for i in range(50)] for j in range(50)]
	grid = fill_grid(grid, tiles)
	return grid

def is_monster(g, pos, m):
	y, x = pos
	h = len(m)
	w = len(m[0])
	m_cnt, g_cnt = 0, 0

	for i in range(h):
		for j in range(w):
			if m[i][j] == ' ':
				continue
			m_cnt += 1
			if g[y+i][x+j] in ['#', 'o']:
				g_cnt += 1
	return m_cnt == g_cnt

def has_monster(img, monster):
	h = len(monster)
	w = len(monster[0])
	
	i = 0
	while i < len(img) - h:
		j = 0
		while j < len(img[0]) - w:
			if is_monster(img, (i, j), monster):
				return True
			j += 1
		i += 1
	return False

def fill_s_mons(g, pos, m):
	y, x = pos
	h, w = len(m), len(m[0])
	for i in range(h):
		for j in range(w):
			if m[i][j] == '#':
				g[y+i] = g[y+i][:x+j] + 'o' + g[y+i][x+j + 1:]
	return g

def fill_mons(img, m):
	h, w = len(m), len(m[0])
	i = 0
	while i < len(img) - h:
		j = 0
		while j < len(img[0]) - w:
			if is_monster(img, (i, j), m):
				img = fill_s_mons(img, (i, j), m)
			j += 1
		i += 1
	return img

def count_safe(img):
	cnt = 0
	for r in img:
		for c in r:
			cnt += c == '#'
	return cnt

def part_2(tiles):
	tiles = assemble(tiles, 0)
	img = parse(tiles)

	monster = ['                  # '
						,'#    ##    ##    ###'
						,' #  #  #  #  #  #   ']

	monster_found = False
	cnt = 0
	fnc = {
		4: lambda x: flip(x, 'h'),
		5: lambda x: flip(rot90(x), 'h'),
		6: lambda x: flip(rot90(x, 2), 'h'),
		7: lambda x: flip(rot90(x, 3), 'h')
	}
	nimg = img[::]
	while not has_monster(nimg, monster):
		if cnt < 4:
			nimg = rot(nimg)
		else:
			nimg = fnc[cnt](img[::])
		cnt += 1

	if cnt < 4:
		img = nimg[::]
	else:
		img = fnc[cnt - 1](img)

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
	