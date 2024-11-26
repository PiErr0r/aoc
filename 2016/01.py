
import math, copy
### ne da mi se ovo uredivati

def part_1(data):
	pos = dict(N=0, E=0, W=0, S=0)
	dirs = 'NESW'
	curr_dir = 'N'
	curr_pos = [0, 0]
	positions = [curr_pos]
	i = 0
	cp = copy.deepcopy(curr_pos)
	for move in data:
		dir_ch, steps = move[0], move[1:]
		if dir_ch == 'R':
			curr_dir = dirs[(dirs.index(curr_dir) + 1) % len(dirs)]
		elif dir_ch == 'L':
			curr_dir = dirs[(dirs.index(curr_dir) - 1) % len(dirs)]

		if curr_dir == 'N':
			for j in range(int(steps)):
				cp[0] += 1
				if cp in positions:
					print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', abs(cp[0]) + abs(cp[1]) )
				else:
					positions.append(copy.deepcopy(cp))
		elif curr_dir == 'S':
			for j in range(int(steps)):
				cp[0] -= 1
				if cp in positions:
					print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', abs(cp[0]) + abs(cp[1]) )
				else:
					positions.append(copy.deepcopy(cp))
		elif curr_dir == 'E':
			for j in range(int(steps)):
				cp[1] += 1
				if cp in positions:
					print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', abs(cp[0]) + abs(cp[1]) )
				else:
					positions.append(copy.deepcopy(cp))
		elif curr_dir == 'W':
			for j in range(int(steps)):
				cp[1] -= 1
				if cp in positions:
					print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', abs(cp[0]) + abs(cp[1]) )
				else:
					positions.append(copy.deepcopy(cp))
		if cp in positions:
			# print('here', cp, i, positions)
			print('!!!!!!!!!!!', cp)
			positions.append(copy.deepcopy(cp))
			print(abs(cp[0]) + abs(cp[1]))
			# break
		else:
			positions.append(copy.deepcopy(cp))

		pos[curr_dir] += int(steps)
		i += 1
	dist = abs(pos['N'] - pos['S']) + abs(pos['E'] - pos['W'])
	print(dist)
	return

def part_2(data):
	return 


if __name__ == '__main__':
	with open('01_input') as f:
		data = f.read()
		data = data.split(', ')
		# data = list(map(int, data.split()))

	part_1(data)
	#part_2(data)
	
