
import math, copy, re

import hashlib 

times = 2017

def has_repeated(s, num):
	for i in range(len(s) - num + 1):
		curr = s[i]
		found = True
		for j in range(1, num):
			if s[i + j] != curr:
				found = False
				break
		if found:
			return { curr } 
	return set()

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
	# data = 'abc'
	hashes = []
	print(stretch_hash('abc22551'))
	for i in range(1001):
		s = data + str(i)
		res = stretch_hash(s)
		hashes.append(res)
	indexes = set()
	cnt = 1001
	failed = set()
	while len(indexes) < 64:
		threes = has_repeated(hashes[0], 3)
		if len(threes) == 0:
			hashes = hashes[1:]
			s = data + str(cnt)
			res = stretch_hash(s)
			hashes.append(res)
			cnt += 1
			continue

		for j in range(1, 1001):
			fives = has_repeated(hashes[j], 5)
			if len(fives) == 0:
				continue
			if len(threes & fives) > 0:
				indexes.add(cnt - 1000 if cnt - 1000 < 1000 else cnt - 1001)
				print(cnt - 1000 if cnt - 1000 < 1000 else cnt - 1001, cnt - 1000 + j if cnt - 1000 < 1000 else cnt - 1001 + j, hashes[0], hashes[j], threes, fives)
				break

		hashes = hashes[1:]
		s = data + str(cnt)
		res = stretch_hash(s)
		hashes.append(res)
		cnt += 1

	indexes = sorted(list(indexes))
	print(indexes)


	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('14_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	# part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	