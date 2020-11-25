from lib import rl
import math, copy, re, hashlib
import itertools as it


def bfs(grid, f, m):
	xf, yf, kf = f
	l = list(range(m))
	res = [None for i in range(m)]
	H = len(grid)
	W = len(grid[0])
	q = [(xf, yf, 0)]
	while len(q) > 0 and None in res:
		x, y, n = q.pop(0)
		if grid[y][x] == '*':
			continue
		try:
			tmp = int(grid[y][x])
			res[tmp] = n
		except:
			pass
		grid[y][x] = '*'
		if x - 1 >= 0 and grid[y][x-1] != '#' and grid[y][x-1] != '*':
			q.append((x-1, y, n+1))
		if x + 1 < W and grid[y][x+1] != '#' and grid[y][x+1] != '*':
			q.append((x+1, y, n+1))
		if y - 1 >= 0 and grid[y-1][x] != '#' and grid[y-1][x] != '*':
			q.append((x, y-1, n+1))
		if y + 1 < H and grid[y+1][x] != '#' and grid[y+1][x] != '*':
			q.append((x, y+1, n+1))
	return res


def part_1(data, second):

	data = [list(i) for i in data]

	keys = []
	cnt = 0
	for i in rl(data):
		for j in rl(data[0]):
			if data[i][j] not in ['#', '.']:
				num = int(data[i][j])
				keys.append((j, i, num))
			elif data[i][j] == '.':
				cnt += 1

	keys.sort(key=lambda x: x[2])
	dists = dict()
	maxi = 0
	for key in keys:
		x, y, k = key
		dists[k] = (x, y)
		if k > maxi:
			maxi = k
	maxi += 1

	dists = [[None for j in range(maxi)] for i in range(maxi)]
	for i in range(maxi):
		bfs_res = bfs(copy.deepcopy(data), keys[i], maxi)
		dists[i] = bfs_res[::]

	min_d = len(data) ** 2
	for i in it.permutations(list(range(1, maxi))):
		# HERE
		perm = [0] + list(i) + ([0] if second else [])
		curr_d = 0
		for j in range(len(perm) - 1):
			curr_d += dists[perm[j]][perm[j + 1]]
		if curr_d < min_d:
			min_d = curr_d

	print(min_d)
	print('END OF', 'PART1' if not second else 'PART2')
	return

def part_2(data):
	# since the code can run both parts with minor change everything is done in part1 with addition of second boolean
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('24_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data), False)
	part_1(copy.deepcopy(data), True)
	