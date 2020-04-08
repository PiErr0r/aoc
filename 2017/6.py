
import math, copy, re

CONFIGURATIONS = []

def part_1(data):
	L = len(data)
	cnt = 0
	while data not in CONFIGURATIONS:
		CONFIGURATIONS.append(data[:])
		maxi = index = -1
		for i in range(L):
			if data[i] > maxi:
				maxi = data[i]
				index = i
		i = index + 1
		data[index] = 0
		while maxi > 0:
			data[i % L] += 1
			i += 1
			maxi -= 1
		cnt += 1

	print('END', cnt)
	part_2(data, cnt)
	return

def part_2(data, cnt):
	ind = CONFIGURATIONS.index(data)
	print(cnt - ind)

	return 


if __name__ == '__main__':
	with open('6_input') as f:
		data = f.read()
		# data = data.split('\n')
		data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	# part_2(copy.deepcopy(data))
	