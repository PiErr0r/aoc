import re
fields =  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

"""

    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.

"""

def byr(v):
	try:
		v = int(v)
		return 1920 <= v <= 2002
	except:
		return False

def iyr(v):
	try:
		v = int(v)
		return 2010 <= v <= 2020
	except:
		return False

def eyr(v):
	try:
		v = int(v)
		return 2020 <= v <= 2030
	except:
		return False

def hgt(v):
	try:
		val = int(v[:-2])
		unit = v[-2:]
		return 150 <= val <= 193 if unit == "cm" else 59 <= val <= 76 if unit == "in" else False
	except:
		return False

def hcl(v):
	reg = "^#([0-9]|[a-f]){6}$"
	return re.search(reg, v) is not None and len(v) == 7

def ecl(v):
	return v in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]

def pid(v):
	reg = "^[0-9]{9}$"
	return len(v) == 9 and re.search(reg, v) is not None

def cid(v):
	return True

check = {
	
	"byr": byr,
	"iyr": iyr,
	"eyr": eyr,
	"hgt": hgt,
	"hcl": hcl,
	"ecl": ecl,
	"pid": pid,
	"cid": cid
}

def check_data(data):
	for i in fields:
		if not check[i](data[i]):
			return False
	return True

def parse_row(data, r):
	row = r.split()
	for i in row:
		[field, value] = i.split(":")
		data[field] = value
	return data


def has_all_fields(data):
	try:
		for i in fields:
			data[i]
	except:
		return False
	return True


def disp(grid):
	for row in grid:
		if type(row) == str:
			print(row)
		else:
			print("".join(row))
	print()

    