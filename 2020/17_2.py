from itertools import product

space = dict()

with open('17_input') as f:
    data = f.read()
    data = data.split('\n')
for y, f in enumerate(enumerate(l.rstrip()) for l in data):
    for x, c in f:
        if c == "#":
          space[(x, y, 0, 0)] = 1  

def neighbours(p):
  for dx, dy, dz, dw in product([-1, 0, 1], repeat = 4):
    if dx == 0 and dy == 0 and dz == 0 and dw == 0:
      continue
    yield (p[0] + dx, p[1] + dy, p[2] + dz, p[3] + dw)        

def occ(p):
  o = 0
  for p in neighbours(p):
    if space.get(p, 0):
      o += 1
  return o

for cycle in range(6):
  occupied = dict()
  for p in {p for cell in space.keys() for p in neighbours(cell)}:
    occupied[p] = occ(p)
  for p, o in occupied.items():
    if space.get(p, 0) and not (o == 2 or o == 3):
      space[p] = 0
    elif not space.get(p, False) and o == 3:
      space[p] = 1
  print(cycle)
print(sum(space.values()))