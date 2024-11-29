from itertools import combinations

items = ["asterisk", "boulder", "food ration", "candy cane", "mutex", "prime number", "mug"]

combs = []
for i in range(1, len(items) + 1):
	combs += list(combinations(items, i))

with open('tmp_program', 'w') as f:
	S = []
	for c in combs:
		for item in c:
			S.append('take ' + item)
		S.append("north")
		for item in c:
			S.append('drop ' + item)
	f.write('\n'.join(S))


# print(combs)
# print(list(combinations(items, 7)))