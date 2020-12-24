
import math, copy, re, hashlib
import itertools as it
# import lib for year 2020
from lib import check_data, parse_row, has_all_fields

def rl(arr):
	return range(len(arr))

def part_1(data):
	curr = 0
	for move in range(100):
		# print(data)
		cl = data[curr]
		n = curr + 1
		s = data[n:n+3]
		data = data[:n] + data[n+3:]
		nl = int(cl) - 1
		while str(nl) in s or nl == 0:
			nl -= 1
			if nl <= 0:
				nl = 9

		ni = data.index(str(nl))
		data = data[:ni + 1] + s + data[ni + 1:]
		curr = data.index(cl) + 1 % 9
		if curr > 5:
			curr -= 5
			data = data[5:] + data[:5]

	i = data.index('1')
	cnt = 0
	ns = ""
	while cnt < len(data):
		ns += data[i]
		cnt += 1
		i = (i + 1) % len(data)

	print(ns[1:])
	print('END OF PART1')
	return

def ls(a):
	x = 1
	for i in range(10):
		print(x, end=" ")
		x = a[x]
	print()

def part_2(data):

	maxi = 1000000
	ll = [None for i in range(maxi + 1)]
	prev = 0
	for i in data:
		i = int(i)
		ll[prev] = i
		prev = i
	ll[prev] = maxi
	for i in range(10, maxi + 1):
		ll[prev] = i
		prev = i

	x = ll[0]
	ll[prev] = x
	for move in range(10000000):
		three = [None, None, None][::]
		three[0] = ll[x]
		three[1] = ll[three[0]]
		three[2] = ll[three[1]]
		xl = x - 1
		while xl in three or xl == 0:
			xl -= 1
			if xl < 1:
				xl = maxi
		ll[x] = ll[three[2]]
		tmp = ll[xl]
		ll[xl] = three[0]
		ll[three[2]] = tmp
		x = ll[x]

	ls(ll)
	x = ll[1]
	print(x, ll[x])
	print(x * ll[x])

	
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('23_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	