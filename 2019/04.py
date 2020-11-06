
import math, copy, re, hashlib


def is_inc(n):
	sn = str(n)
	return all(map(lambda (x, y): x <= y, [(sn[i], sn[i + 1]) for i in range(len(sn) - 1)]))

def has_same_adj(n):
	sn = str(n)
	return any(map(lambda (x, y): x == y, [(sn[i], sn[i + 1]) for i in range(len(sn) - 1)]))

def had_no_large(n):
	sn = str(n)
	for i in sn[::-1]:
		if i * 2 in sn and not any(map(lambda x: i * x in sn, range(3, len(sn) + 1))):
			return True
	return False

def meets_crit(n):
	return is_inc(n) and has_same_adj(n)

def meets_crit2(n):
	return is_inc(n) and has_same_adj(n) and had_no_large(n)

def part_1(data):
	cnt = 0
	for i in range(data[0], data[1] + 1):
		if meets_crit(i):
			cnt += 1

	print(cnt)
	print('END OF PART1')
	return

def part_2(data):
	cnt = 0
	for i in range(data[0], data[1] + 1):
		if meets_crit2(i):
			cnt += 1
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('04_input') as f:
		data = f.read()
		# data = data.split('-')
		data = list(map(int, data.split('-')))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	