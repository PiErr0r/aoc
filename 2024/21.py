from functools import lru_cache

numpad = {
    "7" : (0, 0), "8" : (0, 1), "9" : (0, 2),
    "4" : (1, 0), "5" : (1, 1), "6" : (1, 2),
    "1" : (2, 0), "2" : (2, 1), "3" : (2, 2),
                  "0" : (3, 1), "A" : (3, 2),
}

dirpad = {
                  "^" : (0, 1), "A" : (0, 2),
    "<" : (1, 0), "v" : (1, 1), ">" : (1, 2),
}

@lru_cache
def solve(src, dst, layer, robot=True):
    if layer == 0 or src == dst:
        return 1

    x = "^" if dst[0] < src[0] else "v" if dst[0] > src[0] else None
    y = "<" if dst[1] < src[1] else ">" if dst[1] > src[1] else None

    # Sorry python, I've been using OCaml too much
    def rec(src, dst):
        return solve(dirpad[src], dirpad[dst], layer - 1)

    # -1 to account for the extra "A" press when slotting between
    cx = abs(src[0] - dst[0]) - 1
    cy = abs(src[1] - dst[1]) - 1

    if x is None:
        return rec("A", y) + cy + rec(y, "A")
    if y is None:
        return rec("A", x) + cx + rec(x, "A")

    # Can't take a path if it can pass through the missing corner
    if src[1] == 0 and (dst[0] == 3 or robot):
        return rec("A", y) + cy + rec(y, x) + cx + rec(x, "A")
    if dst[1] == 0 and (src[0] == 3 or robot):
        return rec("A", x) + cx + rec(x, y) + cy + rec(y, "A")

    return min(
        rec("A", y) + cy + rec(y, x) + cx + rec(x, "A"),
        rec("A", x) + cx + rec(x, y) + cy + rec(y, "A"),
    )


with open("21_input") as f:
    inp = f.read().strip().splitlines()

def run(layers):
    total = 0
    for row in inp:
        res = 0
        for i in range(len(row)):
            src, dst = numpad[row[i - 1]], numpad[row[i]]
            res += solve(src, dst, layers, robot=False)
        print(row, res, int(row[:3]))
        total += int(row[:3]) * res
    return total

print(run(4))
print(run(26))