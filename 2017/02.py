
import math, copy, re


def part_1(data):
	suma = 0
	for row in data:
		row = list(map(int, row.split()))
		maxi = mini = row[0]
		for num in row[1:]:
			maxi = max(maxi, num)
			mini = min(mini, num)
		suma += maxi - mini
	print(suma)
	return

def part_2(data):
	suma = 0
	for row in data:
		row = list(map(int, row.split()))
		div = 0
		L = len(row)

		for i in range(L - 1):
			for j in range(i + 1, L):
				maxi = max(row[i], row[j])
				mini = min(row[i], row[j])
				if maxi % mini == 0:
					div = maxi // mini
					break
			if div != 0:
				break
		suma += div
	print(suma)
	return 


if __name__ == '__main__':
	with open('2_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(data)
	part_2(data)
	