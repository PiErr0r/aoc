
import math, copy, re, hashlib
import itertools as it


def part_1(data):

	twos = 0
	threes = 0
	for i in data:
		has2 = False
		has3 = False
		for l in i:
			if list(i).count(l) == 3:
				has3 = True
				continue
			if list(i).count(l) == 2:
				has2 = True
		threes += 1 if has3 else 0
		twos += 1 if has2 else 0


	print(twos * threes)
	print('END OF PART1')
	return

def get_diff(s1, s2):
	diff = 0
	s = ""
	for i in range(len(s1)):
		if s1[i] != s2[i]:
			diff += 1
		else:
			s += s1[i]
	return (diff, s)

def part_2(data):
	found = False
	res =  None
	for i in range(len(data)):
		for j in range(len(data)):
			if i == j: continue
			diff, string = get_diff(data[i], data[j])
			if diff == 1:
				res = string
				found = True
				break
		if found: break
	print(res)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('02_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	