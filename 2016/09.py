
import math, copy, re

def count_dc_len(string):
	reg = r"\(([0-9]+x[0-9]+)\)"
	L = len(string)
	ret_str = ''
	i = 0
	too_long = False
	suma = 0

	while i < L:
		found = False
		for j in range(5, 10):
			if i + j > L:
				too_long = True
				break
			if re.match(reg, string[i : i + j]):
				found = True
				break
		if too_long:
			ret_str += string[i : i + j]
			break
		if found:
			tmp = string[i + 1 : i + j - 1]
			[l, repeat] = list(map(int, tmp.split('x')))
			ret_str += string[i + j : i + j + l] * repeat

			suma += repeat * count_dc_len(string[i + j : i + j + l])
			i += j + l
		else:
			ret_str += string[i]
			i += 1
	if suma == 0:
		return len(string)
	return suma


def decompress(string):
	reg = r"\(([0-9]+x[0-9]+)\)"
	L = len(string)
	ret_str = ''
	i = 0
	too_long = False

	while i < L:
		found = False
		for j in range(5, 10):
			if i + j > L:
				too_long = True
				break
			if re.match(reg, string[i : i + j]):
				found = True
				break
		if too_long:
			ret_str += string[i : i + j]
			break
		if found:
			tmp = string[i + 1 : i + j - 1]
			[l, repeat] = list(map(int, tmp.split('x')))
			ret_str += string[i + j : i + j + l] * repeat
			i += j + l
		else:
			ret_str += string[i]
			i += 1

	return ret_str

def part_1(data):
	unzip = decompress(data)
	print(len(unzip))
	return

def part_2(data):
	L = count_dc_len(data)
	print(L)
	return 


if __name__ == '__main__':
	with open('9_input') as f:
		data = f.read()
		# data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	