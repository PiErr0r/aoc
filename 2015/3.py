
import math, copy

with open('3_input') as f:
	data = f.read()

# data = data.split()
# data = list(map(int, data.split()))

def part_1():
	houses = [(0, 0)]

	for move in data:
		curr = list(copy.deepcopy(houses[-1]))

		if move == '^':
			curr[1] += 1
		elif move == 'v':
			curr[1] -= 1
		elif move == '>':
			curr[0] += 1
		elif move == '<':
			curr[0] -= 1

		houses.append(tuple(curr))

	print(len(set(houses)))


def part_2():
	r_houses = [(0, 0)]
	s_houses = [(0, 0)]

	for i, move in enumerate(data):
		curr = list(copy.deepcopy(r_houses[-1])) if i % 2 == 0 else list(copy.deepcopy(s_houses[-1]))

		if move == '^':
			curr[1] += 1
		elif move == 'v':
			curr[1] -= 1
		elif move == '>':
			curr[0] += 1
		elif move == '<':
			curr[0] -= 1

		if (i % 2 == 0):
			r_houses.append(tuple(curr))
		else:
			s_houses.append(tuple(curr))

	print(len(set(s_houses + r_houses)))



if __name__ == '__main__':
	# part_1()
	part_2()