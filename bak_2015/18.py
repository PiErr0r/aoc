
import math, copy, time

global data 
with open('18_input') as f:
	data = f.read()
	# data = list(map(int, data.split()))

data = data.split('\n')
data = [list(i) for i in data]

ON = '#'
OFF = '.'
STEPS = 100
MAX_DIM = 100
# x - row
# y - col

def neighbour_num(point, data):
	[x, y] = point
	n_on = 0
	start_x = x - 1 if x > 0 else x
	end_x = x + 1 if x < MAX_DIM - 1 else x
	start_y = y - 1 if y > 0 else y
	end_y = y + 1 if y < MAX_DIM - 1 else y

	for i in range(start_x, end_x + 1):
		for j in range(start_y, end_y + 1):
			if [i, j] == [x, y]:
				continue
			if data[i][j] == ON:
				n_on += 1
	# print(n_on)
	return n_on



def part_1(data):
	data_new = [[None for j in range(MAX_DIM)] for i in range(MAX_DIM)]

	[print(''.join(r)) for r in data]
	for step in range(STEPS):
		print(f'step {step}')

		for i in range(MAX_DIM):
			for j in range(MAX_DIM):
				n = neighbour_num([i, j], data)
				if data[i][j] == ON:
					data_new[i][j] = ON if n == 2 or n == 3 else OFF
				elif data[i][j] == OFF:
					data_new[i][j] = ON if n == 3 else OFF
		data = copy.deepcopy(data_new)
		time.sleep(0.2)
		[print(''.join(r)) for r in data]

	cnt = 0
	for i in range(MAX_DIM):
		for j in range(MAX_DIM):
			if data[i][j] == ON:
				cnt += 1
	print(cnt)

	return

def part_2(data):
	data_new = [[None for j in range(MAX_DIM)] for i in range(MAX_DIM)]

	[print(''.join(r)) for r in data]
	for step in range(STEPS):
		print(f'step {step}')

		for i in range(MAX_DIM):
			for j in range(MAX_DIM):
				if (i == MAX_DIM - 1 or i == 0) and (j == MAX_DIM - 1 or j == 0):
					data_new[i][j] = data[i][j]
					continue
				n = neighbour_num([i, j], data)
				if data[i][j] == ON:
					data_new[i][j] = ON if n == 2 or n == 3 else OFF
				elif data[i][j] == OFF:
					data_new[i][j] = ON if n == 3 else OFF
		data = copy.deepcopy(data_new)
		time.sleep(0.2)
		[print(''.join(r)) for r in data]

	cnt = 0
	for i in range(MAX_DIM):
		for j in range(MAX_DIM):
			if data[i][j] == ON:
				cnt += 1
	print(cnt)
	return 


if __name__ == '__main__':
	part_1(data)
	part_2(data)
	