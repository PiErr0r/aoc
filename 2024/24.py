
from __future__ import annotations
import sys
import re
from functools import cache
from itertools import product, combinations
from collections import defaultdict

import z3

def topsort(adj: Mapping[_N, Iterable[_N]]) -> tuple[list[_N], bool]:
    "Flag is true iff. graph is cyclic"
    indeg: defaultdict[_N, int] = defaultdict(int)
    for i, l in adj.items():
        indeg[i] += 0  # make sure all nodes are in indeg
        for j in l:
            indeg[j] += 1
    Q = [i for i in adj if indeg[i] == 0]
    for i in Q:
        for j in adj[i]:
            indeg[j] -= 1
            if indeg[j] == 0:
                Q.append(j)
    return Q, len(Q) != len(indeg)

def bfs(adj: _ADJ[_N, _N], *starts: _N) -> tuple[dict[_N, int], list[_N], dict[_N, _N]]:
    assert starts
    if not callable(adj):
        adj = adj.__getitem__

    D, Q, prev = dict.fromkeys(starts, 0), [*starts], {s: s for s in starts}
    for i in Q:
        d = D[i]
        for j in adj(i):
            if j not in D:
                D[j] = d + 1
                prev[j] = i
                Q.append(j)
    return D, Q, prev

def _inp(inp: str | None = None) -> str:
    inp = inp or sys.stdin.read()
    assert inp, "No input"
    return inp

def lines(inp: str | None = None) -> list[str]:
    return _inp(inp).splitlines()

def _get_day() -> int:
    match = re.fullmatch(r"(\d\d).*\.py", os.path.basename(sys.argv[0]))
    assert match is not None
    return int(match.group(1))

def replace_stdin():
    if not sys.stdin.isatty() or _EXTRA:
        return

    day = _get_day()
    p = Path(f"{day:02}.{'sin' if _ARGS.sample else 'in'}")
    if _ARGS.sample:
        if _ARGS.clear and p.exists():
            p.unlink()

        if not p.exists():
            import subprocess

            sample = subprocess.run(["xsel", "-b"], capture_output=True, text=True, check=True).stdout
            assert sample.strip(), "Clipboard is empty!"
            print(f"Writing sample\n-----\n{sample.strip()}\n-----\nto {p}")
            p.write_text(sample)

    sys.stdin = p.open()

res = 0
A, B = sys.stdin.read().split("\n\n")

G = dict()
for l in lines(A):
    a, b = l.split(": ")
    G[a] = int(b)

ops = {}
for l in lines(B):
    x, dest = l.split(" -> ")
    a, op, b = x.split()
    ops[dest] = (a, op, b)

zs = {s for s in ops if s[0] == "z"}
zs = sorted(zs, key=lambda x: int(x[1:]), reverse=True)

def sim(G):
    n = len(zs)

    i = 0
    while i < n:
        for d, (a, op, b) in ops.items():
            if d in G:
                continue
            if a in G and b in G:
                x, y = G[a], G[b]
                if op == "AND":
                    G[d] = x & y
                elif op == "OR":
                    G[d] = x | y
                elif op == "XOR":
                    G[d] = x ^ y
                else:
                    assert False

                if d in zs:
                    i += 1

    return int("".join(str(G[z]) for z in zs), 2)

import random

s = z3.Solver()
VAR = {s: z3.BitVec(s, 46) for s in list(G) + list(ops)}
for dest, (a, op, b) in ops.items():
    dv, av, bv = VAR[dest], VAR[a], VAR[b]
    if op == "AND":
        s.add(dv == (av & bv))
    elif op == "OR":
        s.add(dv == (av | bv))
    elif op == "XOR":
        s.add(dv == (av ^ bv))

xs = [f"x{i:02}" for i in range(45)]
ys = [f"y{i:02}" for i in range(45)]

@cache
def testf(i: int):
    DIFF = 6
    if i < DIFF:
        tests = list(product(range(1 << i), repeat=2))
    else:
        tests = []
        for _ in range(1 << (2*DIFF)):
            a = random.randrange(1 << i)
            b = random.randrange(1 << i)
            tests.append((a, b))

    random.shuffle(tests)
    return tests

def mkadj():
    adj = {s: [a, b] for s, (a, _, b) in ops.items()}
    for s in G:
        adj[s] = []
    return adj

def is_cyclic():
    return topsort(mkadj())[1]


def swappable(s: str):
    return set(bfs(mkadj(), s)[1]) - set(G)


def f(i: int, swapped: set[str]):
    if i == 46:
        res = ",".join(sorted(swapped))
        print("!!", res)
        exit()

    def getv(s: str, a: int, b: int) -> int:
        if s[0] == "x":
            return (a >> int(s[1:])) & 1
        if s[0] == "y":
            return (b >> int(s[1:])) & 1
        av, op, bv = ops[s]
        x, y = getv(av, a, b), getv(bv, a, b)
        if op == "AND":
            return x & y
        if op == "OR":
            return x | y
        if op == "XOR":
            return x ^ y

    def check():
        for a, b in testf(i):
            for j in range(i+1):
                x = getv(f"z{j:02}", a, b)
                if x != ((a + b) >> j) & 1:
                    return False


        return True

    works = check()
    print(i, works, swapped)
    if works:
        f(i+1, swapped)
        return

    if len(swapped) == 8:
        return

    inside = swappable(f"z{i:02}") - swapped
    outside = set(ops) - swapped
    to_test = list(product(inside, outside)) + list(combinations(inside, 2))
    random.shuffle(to_test)

    for a, b in to_test:
        if a == b: continue
        ops[a], ops[b] = ops[b], ops[a]
        swapped.add(a)
        swapped.add(b)
        if not is_cyclic() and check():
            f(i, swapped)
        swapped.remove(a)
        swapped.remove(b)
        ops[a], ops[b] = ops[b], ops[a]

f(0, set())
