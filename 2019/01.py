
import math, copy, re, hashlib

def calc_mass(m):
	return m // 3 - 2

def part_1(data):

	res = sum([calc_mass(int(i)) for i in data])
	print(res)

	print('END OF PART1')
	return

def calc_mass_2(m):
	res = m // 3 - 2
	fuel = calc_mass(res)
	while fuel > 0:

		res += fuel
		fuel = calc_mass(fuel)	
	return res

def part_2(data):

	res = sum([calc_mass_2(int(i)) for i in data])
	print(res)

	# fuel = calc_mass(res)
	# while fuel > 0:
	# 	print(fuel)
	# 	res += fuel
	# 	fuel = calc_mass(fuel)

	# print(res, fuel)

	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('01_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	