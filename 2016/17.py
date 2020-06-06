
import math, copy, re, hashlib
import numpy as np

PATHS = set()
DIRS = dict(U = np.array([0, -1]), R = np.array([1, 0]), D = np.array([0, 1]), L = np.array([-1, 0]))
MAXI = 0

def is_open(c):
	return c in 'bcdef'

def get_hash(s, p):
	h_str = s + p
	return hashlib.md5(h_str.encode()).hexdigest()[:4]

def solve_maze(s, path, pos):
	global PATHS
	global MAXI
	if -1 in pos or len(path) > 980:
		return
	for i in pos:
		if i > 3:
			return
	if (pos == np.array([3, 3])).all():
		if len(path) > MAXI:
			MAXI = len(path)
		PATHS.add(path)
		return
	dirs = "UDLR"
	h = get_hash(s, path)
	for i in range(4):
		if is_open(h[i]):
			solve_maze(s, path + dirs[i], np.add(pos, DIRS[ dirs[i] ]))
	return

def shortest(s):
	mini = 1000
	P = None
	for i in s:
		if len(i) < mini:
			mini = len(i)
			P = i
	return mini, P

def part_1(data):
	# data = 'ihgpwlah'
	solve_maze(data, '', np.array([0, 0]))
	print(shortest(PATHS))
	print('END OF PART1')
	return

def part_2(data):
	solve_maze(data, '', np.array([0, 0]))
	print(MAXI)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('17_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	