import HTMLParser
import re

# I have to write an fsm to parse timeschedules :|

class TimeSchedulesFSM(object):
	def __init__(self, text):
		contents = re.compile(r'tdCourse">(.+?)</td>', re.MULTILINE | re.DOTALL).findall(text)
		self.lines = []
		for content in contents:
			line = re.compile(r'<.*?>').sub('', content.replace('\n', '').replace('\r', '')).strip()
			self.lines.append(line)
		self.index = 0
		h2 = re.compile(r'<h2>(.+?)</h2>', re.MULTILINE | re.DOTALL).findall(text)
		self.quarter = h2[0].strip()[-11:]
		self.parser = HTMLParser.HTMLParser()

	def has_next(self):
		return self.index < len(self.lines)

	def advance(self, n):
		self.index = self.index + n
	
	def get_next(self):
		self.index = self.index + 1
		return re.sub(' +', ' ', self.lines[self.index - 1])

	def peek_next(self):
		return self.lines[self.index]

	def construct_schedule(self, s):
		out = {'U':[], 'M':[], 'T':[], 'W':[], 'H':[], 'F':[], 'S':[]}
		days = []
		for i in range(len(s)):
			c = s[i]
			if c == 'A':
				# ARR ARR shit
				return out
			if c.isdigit():
				# end of dow classifier
				break
			if c == 'U' or (c == 'u' and i > 0 and s[i - 1] != 'T'):
				# sunday class
				days.append('U')
			if c == 'M':
				days.append('M')
			if c == 'T' and s[i + 1] != 'h':
				# it's tuesday, hopefully
				days.append('T')
			if c == 'W':
				days.append('W')
			if c == 'h' or c == 'R':
				days.append('H')
			if c == 'F':
				days.append('F')
			if c == 'S' and s[i + 1] != 'u':
				# Saturday, hopefully
				days.append('S')
		timestamp_parse = re.compile(r'(\d+):(\d{2})([A|P])M').findall(s)
		if len(timestamp_parse) % 2 == 1:
			# the universe is broken
			raise Exception('Invalid timestamp %s' % s)
		else:
			def minutes_from_midnight(time):
				t = int(time[0]) * 60 + int(time[1])
				if time[2] == 'P' and int(time[0]) < 12:
					return t + 12 * 60
				elif time[2] == 'A' and int(time[0]) == 12:
					return t - 12 * 60
				else:
					return t

			for i in range(0, len(timestamp_parse), 2):
				start = minutes_from_midnight(timestamp_parse[i])
				end = minutes_from_midnight(timestamp_parse[i + 1])
				for day in days:
					out[day].append({'start':start, 'end':end})
		return out
	
	def identify(self, s):
		return tuple(re.split('&nbsp;.&nbsp;', s))

	def execute(self):
		classes = {}
	
		while self.has_next():
			e = self.identify(self.get_next())
			if len(e) == 1:
				self.advance(13)
				continue
		
			class_title = self.get_next()

			if class_title == 'CANCELLED':
				self.advance(12)
				continue
			else:
				self.advance(1)

			department, number, section = e
			class_string = "%s %s" % (department.strip(), number.strip())
			if class_string not in classes:
				classes[class_string] = {self.quarter:{}}
			if section in classes[class_string][self.quarter]:
				raise Exception('Duplicate class found %s %s' % (class_string, section))

			classes[class_string]['__title__'] = class_title
			classes[class_string][self.quarter][section] = {'primaries':[], 'secondaries':{}}
			basis = classes[class_string][self.quarter][section]

			instructor = self.get_next().split(' ; ')
			schedule = self.construct_schedule(self.get_next())
			section_type = self.get_next()
			self.advance(2)
			try:
				enrollment = int(self.get_next())
			except ValueError as e:
				enrollment = -1
			try:
				enrollment_limit = int(self.get_next())
			except ValueError as e:
				enrollment_limit = -1
			location = self.get_next().replace(' - ', '-')
			self.advance(3)

			basis['primaries'].append({
				'type':section_type,
				'schedule':schedule,
				'instructor':instructor,
				'location':location,
				'enrollment':[enrollment, enrollment_limit]
			})
			
			while self.has_next() and len(self.peek_next()) == 0:
				# subactivity
				self.advance(3)
				if len(self.peek_next()) > 0:
					instructor = self.get_next().split(' ; ')
				else:
					self.advance(1)
				schedule = self.construct_schedule(self.get_next())
				section_type = self.get_next()
				is_primary = True
				if len(section_type) == 0:
					is_primary = False
					activity_id = self.get_next()
					section_type = self.get_next()
					try:
						enrollment = int(self.get_next())
					except ValueError as e:
						enrollment = -1
					try:
						enrollment_limit = int(self.get_next())
					except ValueError as e:
						enrollment_limit = -1
					if len(section_type) == 0:
						#wtf
						is_primary = True
				else:
					self.advance(2)
					try:
						enrollment = int(self.get_next())
					except ValueError as e:
						enrollment = '?'
					try:
						enrollment_limit = int(self.get_next())
					except ValueError as e:
						enrollment_limit = -1
				location = self.get_next().replace(' - ', '-')
				self.advance(3)
				activity = {
					'type':section_type,
					'schedule':schedule,
					'instructor':instructor,
					'location':location,
					'enrollment':[enrollment, enrollment_limit]
				}
				if is_primary:
					basis['primaries'].append(activity)
				else:
					if activity_id not in basis['secondaries']:
						basis['secondaries'][activity_id] = []
					basis['secondaries'][activity_id].append(activity)
		return classes

