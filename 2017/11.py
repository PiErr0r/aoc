
import math, copy, re


#    \ 1,0/
#0,-1 +--+ 1,1
#    /    \
#  -+ 0,0  +-
#    \    /
#-1,-1+--+ 0,1
#    /-1,0\


def part_1(data):
	curr = [0, 0]
	for cDir in data:
		if cDir == 'n':
			curr[0] += 1
		elif cDir == 's':
			curr[0] -= 1
		elif cDir == 'ne':
			curr[0] += 1
			curr[1] += 1
		elif cDir == 'nw':
			curr[1] -= 1
		elif cDir == 'se':
			curr[1] +=1
		elif cDir == 'sw':
			curr[0] -= 1
			curr[1] -= 1
	[a, b] = curr
	print(max(curr))
	return

def part_2(data):
	curr = [0, 0]
	maxi = 0
	for cDir in data:
		if cDir == 'n':
			curr[0] += 1
		elif cDir == 's':
			curr[0] -= 1
		elif cDir == 'ne':
			curr[0] += 1
			curr[1] += 1
		elif cDir == 'nw':
			curr[1] -= 1
		elif cDir == 'se':
			curr[1] +=1
		elif cDir == 'sw':
			curr[0] -= 1
			curr[1] -= 1
		maxi = max(maxi, max(curr))
	[a, b] = curr
	print(maxi)
	return
	return 


if __name__ == '__main__':
	with open('11_input') as f:
		data = f.read()
		data = data.split(',')
		# data = list(map(int, data.split()))


	part_1(copy.deepcopy(data))
	part_2(copy.deepcopy(data))
	