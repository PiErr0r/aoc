
import math, copy

with open('6_input') as f:
	data = f.read()
	data = data.split('\n')

light_field = [[0 for j in range(1000)] for i in range(1000)]

def part_1():
	for cmd in data:
		c = cmd.split()

		if c[0] == 'toggle':
			[start, _, end] = c[1:]
			[x1, y1] = list(map(int, start.split(',')))
			[x2, y2] = list(map(int, end.split(',')))

			for i in range(x1, x2 + 1):
				for j in range(y1, y2 + 1):
					light_field[i][j] += 2

		elif c[0] == 'turn':
			if c[1] == 'on':
				[start, _, end] = c[2:]
				[x1, y1] = list(map(int, start.split(',')))
				[x2, y2] = list(map(int, end.split(',')))
				for i in range(x1, x2 + 1):
					for j in range(y1, y2 + 1):
						light_field[i][j] += 1
				
			elif c[1] == 'off':
				[start, _, end] = c[2:]
				[x1, y1] = list(map(int, start.split(',')))
				[x2, y2] = list(map(int, end.split(',')))
				for i in range(x1, x2 + 1):
					for j in range(y1, y2 + 1):
						light_field[i][j] -= 1 if light_field[i][j] > 0 else 0
	lights_on = 0
	for i in range(1000):
		for j in range(1000):
			if light_field[i][j]:
				lights_on += light_field[i][j]
	print(lights_on)
	return

def part_2():
	return 

	data = data.split()
	data = list(map(int, data.split()))


if __name__ == '__main__':
	part_1()
	#part_2()
	