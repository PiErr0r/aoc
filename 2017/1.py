
import math, copy, re


def part_1(data):
	L = len(data)
	suma = 0

	for i in range(L):
		if data[i] == data[(i + 1) % L]:
			suma += data[i]
	print(suma)
	return

def part_2(data):
	L = len(data)
	half = L // 2
	suma = 0

	for i in range(L):
		if data[i] == data[(i + half) % L]:
			suma += data[i]
	print(suma)

	return 


if __name__ == '__main__':
	with open('1_input') as f:
		data = f.read()
		# data = data.split()
		data = list(map(int, list(data)))


	part_1(data)
	part_2(data)
	