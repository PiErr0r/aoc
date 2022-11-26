
import math

with open('1_input') as f:
	data = f.read()

# data = data.split('')
# data = list(map(int, data.split()))

floor = 0

for (i, move) in enumerate(data):
	if move == '(':
		floor += 1
	elif move == ')':
		floor -= 1

	if floor < 0:
		print(i + 1)
		break

print(floor)

	