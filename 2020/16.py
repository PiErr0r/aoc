
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def get_fields(data):
	fields = {}
	for f in data.split('\n'):
		key, ranges = f.split(':')
		fields[key] = []
		ranges = ranges.split('or')
		for r in ranges:
			a, b = r.split('-')
			fields[key].append((int(a), int(b)))
	return fields

def get_valid(v, f, retz = False):
	for k in f.keys():
		for r in f[k]:
			a, b = r
			if a <= v <= b:
				return 0 if retz else -1
	return v

def part_1(data):
	fields = get_fields(data[0])
	me = list(map(int, data[1].split()[-1].split(',')))
	tickets = [list(map(int, i.split(','))) for i in data[2].split('\n')[1:]]
	suma = 0
	for t in tickets:
		for val in t:
			suma += get_valid(val, fields, True)
	print(suma)
	print('END OF PART1')
	return

def get_valid_fields(v, f):
	retg = set()
	ak = set()
	for k in f.keys():
		ak |= {k}
		is_valid = False
		for r in f[k]:
			a, b = r
			if a <= v <= b:
				retg |= {k}
				continue

	return (retg, ak - retg)

def get_mul(m, g, f):
	ans = 1
	for k in f.keys():
		if k.startswith('departure'):
			i = g.index(k)
			ans *= m[i]
	return ans

def part_2(data):
	fields = get_fields(data[0])
	me = list(map(int, data[1].split()[-1].split(',')))
	tickets = [list(map(int, i.split(','))) for i in data[2].split('\n')[1:]]
	valid = []
	for t in tickets:
		is_valid = True
		for val in t:
			v = get_valid(val, fields)
			if v != -1:
				is_valid = False
				break
		if is_valid:
			valid.append(t[::])
	guesses = [set() for i in valid[0]]
	for j, t in enumerate(valid):
		for i, val in enumerate(t):
			g, b = get_valid_fields(val, fields)
			guesses[i] |= b


	guessed = [None for i in valid[0]]
	all_keys = set(fields.keys())
	while None in guessed:
		for i, g in enumerate(guesses):
			if guessed[i] is not None:
				if len(g) != 20:
					guesses[i] = set(all_keys)
				continue
			if len(g) == 19:
				good = all_keys - g
				guessed[i] = list(good)[0]
				for j, _ in enumerate(guesses):
					guesses[j] |= good
				break
				

	ans = get_mul(me, guessed, fields)
	print(ans)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('16_input') as f:
		data = f.read()
		data = data.split('\n\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	