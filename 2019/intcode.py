class IntCode(object):
	"""docstring for IntCode"""
	def __init__(self, data):
		super(IntCode, self).__init__()
		self.data = data
		self.pos = 0
		self.func = {
			"01": lambda x: self.add(*self.get_mode(x)),
			"02": lambda x: self.mul(*self.get_mode(x)),
			"99": lambda x: self.halt()
		}

		while self.pos != -1:
			param = self.data[ self.pos ]
			opcode = f"{param%100:02d}"
			self.func[ opcode ](param)

	def get_mode(self, n):
		ns = f"{n:05d}"
		return map(lambda x: x == "0", reversed(str(ns)[:3]))

	def mul(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		res = f * s

		self.data[res_pos] = res
		self.pos += 4

	def add(self, f_addr = True, s_addr = True, res_addr = True):
		f_pos = self.data[ self.pos + 1 ] if f_addr else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if s_addr else self.pos + 2
		res_pos = self.data[ self.pos + 3 ] if res_addr else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		res = f + s

		self.data[res_pos] = res
		self.pos += 4

	def halt(self):
		self.pos = -1
		