
import math, copy, re, hashlib


def part_1(data):

	data = [[int(i.split('-')[0]), int(i.split('-')[1])] for i in data]
	data.sort(key=lambda x: x[0])
	mini = 0
	for i in data:
		if mini < i[0]:
			break
		if mini >= i[0] and mini <= i[1]:
			mini = i[1] + 1

	print(mini)
	print('END OF PART1')
	return

def merge(l):
	merged = -1
	ret = []

	i = 0
	while i < len(l):
		[a, b] = l[i]
		j = i + 1
		while j < len(l) and l[j][0] < b: 
			b = max(b, l[j][1])
			j += 1
		ret.append([a, b])
		i = j

	return ret

def part_2(data):

	data = [[int(i.split('-')[0]), int(i.split('-')[1])] for i in data]
	data.sort(key=lambda x: x[0])
	cnt = 0
	new_data = merge(data)
	new_data = merge(new_data)
	new_data = merge(new_data)
	new_data = merge(new_data)
	new_data = merge(new_data)
	print(len(data), len(new_data))
	MAX = 4294967295
	for i in range(len(new_data) - 1):
		cnt += new_data[i + 1][0] - new_data[i][1] - 1
	cnt += MAX - new_data[-1][1] if MAX != new_data[-1][1] else 0
	print(cnt)
	print('END OF PART2')
	return 


if __name__ == '__main__':
	with open('20_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	