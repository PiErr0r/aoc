
import math, copy

KEYBOARD = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
]


NEW_KEYBOARD = [
  [None, None, 1, None, None],
  [None, 2, 3, 4, None],
	[5, 6, 7, 8, 9],
  [None, 'A', 'B', 'C', None],
  [None, None, 'D', None, None]
]

MAX = 2
NEW_MAX = 4

def part_1(data):
	# pos = [row, col]
	pos = [1, 1]
	cypher = ''
	for num in data:
		steps = list(num)

		for step in steps:
			if step == 'D':
				if pos[0] < MAX:
					pos[0] += 1
			elif step == 'U':
				if pos[0] > 0:
					pos[0] -= 1
			elif step == 'R':
				if pos[1] < MAX:
					pos[1] += 1
			elif step == 'L':
				if pos[1] > 0:
					pos[1] -= 1
		[row, col] = pos
		cypher += str( KEYBOARD[row][col] )
	print(cypher)
	return

def part_2(data):
	# pos = [row, col]
	pos = [2, 0]
	cypher = ''
	for num in data:
		steps = list(num)

		for step in steps:
			if step == 'D':
				if pos[0] < NEW_MAX and NEW_KEYBOARD[ pos[0] + 1][ pos[1] ] != None:
					pos[0] += 1
			elif step == 'U':
				if pos[0] > 0 and NEW_KEYBOARD[ pos[0] - 1][ pos[1] ] != None:
					pos[0] -= 1
			elif step == 'R':
				if pos[1] < NEW_MAX and NEW_KEYBOARD[ pos[0] ][ pos[1] + 1 ] != None:
					pos[1] += 1
			elif step == 'L' and NEW_KEYBOARD[ pos[0] ][ pos[1] - 1 ] != None:
				if pos[1] > 0:
					pos[1] -= 1
		[row, col] = pos
		cypher += str( NEW_KEYBOARD[row][col] )
	print(cypher)
	return
	return 


if __name__ == '__main__':
	with open('2_input') as f:
		data = f.read()
		data = data.split('\n')
		# data = list(map(int, data.split()))

	part_1(data)
	part_2(data)
	