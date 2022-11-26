
import math, copy

with open('14_input') as f:
	data = f.read()
	data = data.split('\n')
	# data = list(map(int, data.split()))
# Prancer can fly 25 km/s for 6 seconds, but then must rest for 143 seconds.

deers = dict()

def setup():
	for deer in data:
		deer = deer.split()
		name = deer[0]
		speed = deer[3]
		t = deer[6]
		rest = deer[-2]

		deers[name] = dict(speed = int(speed), t = int(t), rest = int(rest), dist = 0, points = 0)

def part_1():
	setup()
	time = 2503
	deers_list = list(deers.keys())

	dist_list = [0 for i in range(len(deers_list))]
	for i in range(time):

		for j, deer in enumerate(deers_list):
			curr_t = i % (deers[deer]['t'] + deers[deer]['rest'])
			if curr_t < deers[deer]['t']:
				deers[deer]['dist'] += deers[deer]['speed']
				dist_list[j] = deers[deer]['dist']

		max_dist = max(dist_list)		
		for deer, dist in zip(deers_list, dist_list):
			if dist == max_dist:
				deers[deer]['points'] += 1 

	max_dist = max_points = 0
	
	for deer in deers.keys():
		if deers[deer]['dist'] > max_dist:
			max_dist = deers[deer]['dist']
		if deers[deer]['points'] > max_points:
			max_points = deers[deer]['points']

	print(max_dist)
	print(max_points)
	return

def part_2():
	return 


if __name__ == '__main__':
	part_1()
	#part_2()
	