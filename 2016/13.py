
import math, copy, re
from collections import deque

MAX = 5000

# s = start
# d = destination
# v = { visited, wall }
# n = not visited
GOAL = [31, 39]
MAGIC = 1352
COUNT = 0
def calc_pos(x, y):
	res = x*x + 3*x + 2*x*y + y + y*y
	res += MAGIC
	res = bin(res)[2:].count('1')
	return res % 2 == 0 

def setup():
	LABYRINTH = [['0' for j in range(MAX)] for i in range(MAX)]
	LABYRINTH[31][39] = 'd'
	return (LABYRINTH, [1, 1])

def get_len(node):
	l = 0
	while node is not None:
		l += 1
		node = node[2]
	return l - 1


def bfs(x, y, L, steps = 0):
	global COUNT
	q = deque( [(x, y, None)] )
	vis = set()
	while len(q) > 0:
		node = q.popleft()
		[x, y, _] = node
		if not calc_pos(x, y):
			L[x][y] = 'w'
			continue
		else:
			L[x][y] = 'n' if L[x][y] == '0' else L[x][y]

		if L[x][y] in 'vw' or steps != 0 and get_len(node) > steps:
			continue
		elif L[x][y] == 'd':
			# print("FOUND IT")
			return get_len(node)
		else:
			L[x][y] = 'v'
			vis.add((x, y))
			COUNT += 1
			if L[x + 1][y] != 'w' and L[x + 1][y] != 'v':
				q.append((x + 1, y, node))
			if L[x][y + 1] != 'w' and L[x][y + 1] != 'v':
				q.append((x, y + 1, node))
			if x > 0 and L[x - 1][y] != 'w' and L[x - 1][y] != 'v':
				q.append((x - 1, y, node))
			if y > 0 and L[x][y - 1] != 'w' and L[x][y - 1] != 'v':
				q.append((x, y - 1, node))

	return len(vis)


def part_1(data):
	L, [x, y] = setup()
	print(bfs(x, y, L))
	return

def part_2(data):
	L, [x, y] = setup()
	print(bfs(x, y, L, 50))
	print(COUNT)
	# i = j = 0
	# while i < 50:
	# 	j = 0
	# 	while j < 50:
	# 		print(L[i][j], end="")
	# 		j += 1
	# 	print()
	# 	i += 1
	return 

if __name__ == '__main__':
	with open('13_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	