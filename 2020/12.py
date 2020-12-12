
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

TURN = "RL"
DIRS = "NESW"
DDIR = [(0, -1), (1, 0), (0, 1), (-1, 0)]
MOVE = "F"

def rl(arr):
	return range(len(arr))

def rot(k, v):
	rot_dir = 1 if k == "R" else -1
	rot_ang = v // 90
	return rot_dir * rot_ang

def mov(k, v):
	di = DIRS.index(k)
	mov = DDIR[di]
	return mov[0] * v, mov[1] * v

def man_dist(pos):
	return abs(pos[0]) + abs(pos[1])

def part_1(data):

	pos = [0, 0]
	curr = "E"
	for cmd in data:
		key, value = cmd[0], int(cmd[1:])
		if key in TURN:
			ci = DIRS.index(curr)
			curr = DIRS[(ci + rot(key, value)) % 4]
		elif key in DIRS:
			dx, dy = mov(key, value)
			pos[0], pos[1] = pos[0] + dx, pos[1] + dy
		elif key == MOVE:
			dx, dy = mov(curr, value)
			pos[0], pos[1] = pos[0] + dx, pos[1] + dy

	print(man_dist(pos))
	print('END OF PART1')
	return

def rot_r(wp):
	[x, y] = wp
	return [-y, x]

def rot_l(wp):
	[x, y] = wp
	return [y, -x]

def rot_wp(wp, k, v):
	rot_ang = v // 90
	for i in range(rot_ang):
		wp = rot_r(wp) if k == "R" else rot_l(wp)
	return wp

def mov_me(p, wp, v):
	return [p[0] + v * wp[0], p[1] + v * wp[1] ]

# I had to copy this beauty of the code fro 4chan aoc board
# such fucking elegance, gj Anon
def part_2xx(data):
	ops = [(x[0], int(x[1:])) for x in data.split("\n")]
	pos, wpos = 0, 10 + 1j
	cdirs = {"N":1j, "S": -1j, "E":1, "W":-1}	
	dirs = {"L":1j, "R":-1j}
	for op, l in ops:
		wpos += cdirs.get(op, 0) * l
		wpos *= dirs.get(op, 1) ** (l / 90)
		if op == "F":
			pos += wpos * l
	print(int( abs(pos.real) + abs(pos.imag) ))

def part_2(data):
	pos = [0, 0]
	wp = [10, -1]
	for cmd in data:
		k, v = cmd[0], int(cmd[1:])
		if k in TURN:
			wp = rot_wp(wp, k, v)
		elif k in DIRS:
			dx, dy = mov(k, v)
			wp[0], wp[1] = wp[0] + dx, wp[1] + dy
		elif k == MOVE:
			pos = mov_me(pos, wp, v)
	print(man_dist(pos))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('12_input') as f:
		data = f.read()
		in_data = data
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	part_2xx(in_data)