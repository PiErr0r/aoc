
import math, copy, re, hashlib
import itertools as it

def rl(arr):
	return range(len(arr))

def part_1(data):
	cnt = 0
	l = 0
	for i in data:
		if i[l % len(i)] == '#':
			cnt +=1
		l += 3
	print(cnt)

	print('END OF PART1')
	return

def part_2(data):
	cnt, ans = 1, 1
	sl = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
	for s in rl(sl):
		dx, dy = sl[s]
		i, j, cnt = 0, 0, 0
		while i < len(data):
			if data[i][j % len(data[0])] == '#':
				cnt += 1
			j += dx
			i += dy
		ans *= cnt

	print(ans)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('03_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	