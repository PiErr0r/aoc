
import math, copy, re, hashlib
import itertools as it
import functools as ft
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def parse(data):
	alls = {}
	ings = []
	for food in data:
		ingredients, allergens = food.split('contains')
		ingredients = ingredients[:-1].split()
		allergens = allergens[:-1].split(", ")
		ings.append(ingredients)
		for a in allergens:
			a = a.strip()
			try:
				alls[a] &= set(ingredients)
			except:
				alls[a] = set(ingredients)
	return alls, ings

def part_1(data):
	data, ings = parse(data)
	while any([len(data[k]) > 1 for k in data.keys()]):	
		for k1 in data.keys():
			if len(data[k1]) > 1:
				for k2 in data.keys():
					if k1 == k2: continue
					if len(data[k2]) == 1:
						data[k1] -= data[k2]

	allergens = ft.reduce(lambda x,y: x | y, [data[k] for k in data.keys()], set())
	cnt = 0
	for food in ings:
		for i in food:
			if i not in allergens:
				cnt += 1


	print(cnt)
	print('END OF PART1')
	part_2(data)
	return

def part_2(data):

	data = [(k, list(data[k])[0]) for k in data.keys()]
	data.sort(key=lambda x: x[0])
	res = ",".join(i[1] for i in data)
	print(res)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('21_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	