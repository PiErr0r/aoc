from shapely.geometry import Polygon, box

def is_inside():
	rect = box(x_min, y_min, x_max, y_max)  # Create rectangle
	
	return poly.contains(rect)


def make_polygon(data):
	res = [data[0]]
	curr = 0
	used = set()
	used.add(0)
	while len(res) != len(data):
		X, Y = res[curr]
		for i, (x, y) in enumerate(data):
			if i in used: continue
			if x == X or y == Y:
				res.append((x, y))
				curr += 1
				used.add(i)
	assert len(used) == len(data)
	return res

if __name__ == '__main__':
	with open('09_input') as f:
		data = f.read().strip().split('\n')
		data = [a.split(',') for a in data]
		data = [(int(a[0]), int(a[1])) for a in data]

	res = 0
	poly = Polygon(make_polygon(data))
	i = -1
	for x1, y1 in data:
		i += 1
		for x2, y2 in data[i+1:]:
			mnx = min(x1, x2)
			mxx = max(x1, x2)
			mny = min(y1, y2)
			mxy = max(y1, y2)

			area = (mxy - mny + 1) * (mxx - mnx + 1)
			if area <= res: continue
			if (poly.contains(box(mnx, mny, mxx, mxy))):
				print(area, x1, y1, x2, y2)
				res = area

	print(res)