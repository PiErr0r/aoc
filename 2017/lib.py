def disp(grid, s = -1, e = -1):
		if e == -1:
			e = len(grid[0])
		if s == -1:
			s = 0
		for row in grid:
		    print("".join(row[s:e]))
		print()


def rl(arr):
	return range(len(arr))