
import math, copy
from itertools import combinations

with open('17_input') as f:
	data = f.read()
	# data = data.split()
	data = list(map(int, data.split('\n')))

L = len(data)

def part_1():
	cnt = 0
	for i in range(L):
		combs = list(combinations(data, i))
		for c in combs:
			if sum(c) == 150:
				cnt += 1
		if cnt > 0:
			break
	print(cnt)
	return

def part_2():
	return 


if __name__ == '__main__':
	part_1()
	#part_2()
	