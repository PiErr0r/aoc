class IntCode(object):
	"""docstring for IntCode"""
	def __init__(self, data):
		super(IntCode, self).__init__()
		self.data = data
		self.pos = 0
		self.func = {
			1: self.add,
			2: self.mul,
			99: self.halt
		}

		while self.pos != -1:
			self.func[ self.data[ self.pos ] ]()

	def mul(self, address = True):
		f_pos = self.data[ self.pos + 1 ] if address else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if address else self.pos + 2
		r_pos = self.data[ self.pos + 3 ] if address else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		r = f * s

		self.data[r_pos] = r
		self.pos += 4

	def add(self, address = True):
		f_pos = self.data[ self.pos + 1 ] if address else self.pos + 1
		s_pos = self.data[ self.pos + 2 ] if address else self.pos + 2
		r_pos = self.data[ self.pos + 3 ] if address else self.pos + 3

		f = self.data[ f_pos ]
		s = self.data[ s_pos ]
		r = f + s

		self.data[r_pos] = r
		self.pos += 4

	def halt(self):
		self.pos = -1
		