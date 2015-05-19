import json
import Notify
import os

class TimeSchedulesDataset(object):
	# a class to manage the data retrieved from timeschedules
	def __init__(self):
		self.data = {}
		self.names = {}
		self._compressed = []
	def add(self, entries):
		for cls, data in entries.items():
			if cls not in self.data:
				self.data[cls] = {}
			for quarter, sections in data.items():
				if quarter == '__title__':
					self.names[cls] = sections # sections is a string here
				else:
					self.data[cls][quarter] = sections

	def notify_changes(self, origin):
		try:
			with open(origin) as f:
				comparison = json.load(f)
			for cls, quarters in self.data.items():
				for quarter, sections in quarters.items():
					for section, data in sections.items():
						if len(data['secondaries']) > 0:
							for secondary_id, secondaries in data['secondaries'].items():
								secondary_enrollment = secondaries[0]['enrollment']
								compare_enrollment = comparison[cls][quarter][section]['secondaries'][secondary_id][0]['enrollment']
								if secondary_enrollment != compare_enrollment:
									Notify.emit(quarter, cls, section, secondary_id, compare_enrollment, secondary_enrollment, newest=False)
									print('Update occurred for %s %s %s %s' % (cls, quarter, section, secondary_id))
						else:
							primary_enrollment = data['primaries'][0]['enrollment']
							compare_enrollment = comparison[cls][quarter][section]['primaries'][0]['enrollment']
							if primary_enrollment != compare_enrollment:
								Notify.emit(quarter, cls, section, None, compare_enrollment, primary_enrollment, newest=False)
								print('Update occurred for %s %s %s' % (cls, quarter, section))
		except Exception as e:
			print(e)

	def _parse_for_compression(self, activity):
		def add(target, value):
			if value not in target:
				target[value] = len(target)
			return target[value]
		instructors = []
		for instructor in activity['instructor']:
			instructors.append(add(self._instructors, instructor))
		return (
			add(self._types, activity['type']),
			add(self._locations, activity['location']),
			instructors)

	def compress(self):
		def compress_schedule(schedule):
			out = []
			for dow, times in schedule.items():
				for time in times:
					out.append(':'.join([dow, str(time['start']), str(time['end'])]))
			return '|'.join(out)

		self._compressed = []
		self._instructors = {}
		self._locations = {}
		self._types = {}
		# initialize the stuff ahead of time
		for id, quarters in self.data.items():
			for quarter, sections in quarters.items():
				for section, data in sections.items():
					for section in data['primaries']:
						self._parse_for_compression(section)
					for secondary_id, secondaries in data['secondaries'].items():
						for secondary in secondaries:
							self._parse_for_compression(secondary)

		for id, quarters in self.data.items():
			for quarter, sections in quarters.items():
				for section, data in sections.items():
					primaries = []
					secondaries = []
					for primary in data['primaries']:
						t, l, i = self._parse_for_compression(primary)
						primaries.append([t, l, i, compress_schedule(primary['schedule']), primary['enrollment']])
					for secondary_id, secondary_list in data['secondaries'].items():
						for secondary in secondary_list:
							t, l, i = self._parse_for_compression(secondary)
							secondaries.append([secondary_id, t, l, i, compress_schedule(secondary['schedule']), secondary['enrollment']])
					self._compressed.append([id, section, primaries, secondaries])

	def _reverse_map(self, m):
		rev = {v:k for k, v in m.items()}
		return [rev[i] for i in range(len(rev))]

	def write_timeschedules(self, target):
		if not os.path.exists(os.path.dirname(target)):
			os.makedirs(os.path.dirname(target))
		with open(target, 'w') as f:
			f.write(json.dumps(self.data))

	def write_timeschedules_compressed(self, target):
		if not self._compressed or len(self._compressed) == 0:
			self.compress()
		if not os.path.exists(os.path.dirname(target)):
			os.makedirs(os.path.dirname(target))
		with open(target, 'w') as f:
			f.write(json.dumps(self._compressed))
	
	def write_timeschedules_data_compressed(self, target):
		if not self._compressed or len(self._compressed) == 0:
			self.compress()
		if not os.path.exists(os.path.dirname(target)):
			os.makedirs(os.path.dirname(target))
		with open(target, 'w') as f:
			f.write(json.dumps([
				self._reverse_map(self._instructors),
				self._reverse_map(self._locations),
				self._reverse_map(self._types)
			]))
