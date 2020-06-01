
import math, copy, re

import hashlib 

times = 2017

def has_repeated(s, num):
	strs = set()
	for i in s:
		if i * num in s:
			strs.add(i)
	return strs

def stretch_hash(s):
	for i in range(times):
		s = hashlib.md5(s.encode()).hexdigest()
	return s

def part_1(data):
	# data = 'abc'
	i = 0
	results = dict()
	indexes = set()
	while len(indexes) < 64:
		string = data + str(i)
		res = hashlib.md5(string.encode()).hexdigest()
		threes = has_repeated(res, 3)
		if len(threes) > 0:
			results[i] = threes
		mini = 0 if i < 1000 else i - 1000
		fives = has_repeated(res, 5)
		if len(fives) > 0:
			for j in range(mini, i):
				if j in results:
					tmp = results[j] & fives
					if len(tmp) > 0:
						print(i, j)
						indexes.add(j)
						# if len(indexes) == 64: break
		i += 1
	indexes = sorted(list(indexes))
	print(indexes[62:], len(indexes))
	print('END OF PART1')
	return

def part_2(data):
	data = 'abc'
	i = 0
	results = dict()
	indexes = set()
	while len(indexes) < 64:
		string = data + str(i)
		res = stretch_hash(string)
		threes = has_repeated(res, 3)
		if len(threes) > 0:
			results[i] = threes
		mini = 0 if i < 1000 else i - 1000
		fives = has_repeated(res, 5)
		if len(fives) > 0:
			# print(i)
			for j in range(mini, i):
				if j in results:
					tmp = results[j] & fives
					if len(tmp) > 0:
						print(i, j)
						indexes.add(j)
						# if len(indexes) == 64:
						# 	break
		i += 1
	# rmv = { max(indexes) }
	# indexes ^= rmv
	print("___")
	indexes = sorted(list(indexes))
	print(indexes[60:], len(indexes))
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	