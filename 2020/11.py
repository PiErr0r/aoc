
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields, disp

def rl(arr):
	return range(len(arr))

def get_hash(d):
	return hash(tuple(d))

def get_pos(d, y, x):
	h, w = len(d), len(d[0])
	curr = d[y][x]
	cnt = 0
	for i in range(y - 1, y + 2):
		if i < 0 or i >= h:
			continue
		for j in range(x - 1, x + 2):
			if i == y and j == x or j < 0 or j >= w:
				continue
			if d[i][j] == "#":
				cnt += 1
	if curr == "#":
		if cnt >= 4:
			return "L"
	elif curr == "L":
		if cnt == 0:
			return "#"
	return curr

def new_seats(d):
	nd = [[None for j in rl(d[0])] for i in rl(d)]
	for y in rl(d):
		for x in rl(d[y]):
			nd[y][x] = get_pos(d, y, x)
	return [''.join(i) for i in nd]

def get_dirs():
	dirs = it.combinations_with_replacement([-1, 0, 1],2)
	ndirs = []
	for d in dirs:
		if d[0] == 0 and d[1] == 0: continue
		if d[0] != d[1]:
			ndirs.append((d[1], d[0]))
		ndirs.append(d[::])
	return ndirs

def get_pos_v(d, y, x):
	dirs = get_dirs()
	h, w = len(d), len(d[0])
	cnt = 0
	curr = d[y][x]

	for dr in dirs:
		dy, dx = dr
		nx, ny = x + dx, y + dy
		while 0 <= nx < w and 0 <= ny < h:
			if d[ny][nx] == "#":
				cnt += 1 
				break
			elif d[ny][nx] == "L":
				break
			nx += dx
			ny += dy
	if curr == "#":
		if cnt >= 5:
			return "L"
	elif curr == "L":
		if cnt == 0:
			return "#"
	return curr

def new_seats_v(d):
	nd = [[None for j in rl(d[0])] for i in rl(d)]
	for y in rl(d):
		for x in rl(d[y]):
			nd[y][x] = get_pos_v(d, y, x)
	return [''.join(i) for i in nd]	

def count_taken(d):
	cnt = 0
	for i in d:
		for j in i:
			if j == "#":
				cnt += 1
	return cnt

def part_1(data):

	new = get_hash(data)
	prev = 0
	while new != prev:
		prev = new
		data = new_seats(data)
		new = get_hash(data)
	print(count_taken(data))
	print('END OF PART1')
	return

def part_2(data):

	new = get_hash(data)
	prev = 0
	while new != prev:
		prev = new
		data = new_seats_v(data)
		new = get_hash(data)
	print(count_taken(data))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('11_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	