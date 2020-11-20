from lib import rl
import math, copy, re, hashlib
import itertools as it

# 439 players; last marble is worth 71307 points
# 10 players; last marble is worth 1618 points: high score is 8317
# 13 players; last marble is worth 7999 points: high score is 146373
# 17 players; last marble is worth 1104 points: high score is 2764
# 21 players; last marble is worth 6111 points: high score is 54718
# 30 players; last marble is worth 5807 points: high score is 37305




def part_1(data):
    [n, last] = data
    res = None

    print(res)
    print('END OF PART1')
    return res

def part_2(data):
    
    print('END OF PART2')
    return 


if __name__ == '__main__':
    with open('09_input') as f:
    	data = f.read()
	# data = data.split('\n')
	# data = list(map(int, data.split()))

    tests = [[10, 1618], [13, 7999], [17, 1104], [21, 6111], [30, 5807]]
    sols = [8317, 146373, 2764, 54718, 37305]
    for i in rl(tests):
        res = part_1(copy.deepcopy(tests[i]))
        if res != sols[i]:
            print("########################################################")
            print("ERROR")
            print(f"Solution {i} is not correct!")
            print("########################################################")
            exit(1)
    part_1([439, 71307])


    part_2(copy.deepcopy(data))
