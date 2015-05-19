import re
from TimeSchedulesFSM import TimeSchedulesFSM

class TimeSchedules(object):
	def __init__(self, session):
		search_page = session.get('http://timeschedules.uchicago.edu/search.php').text
		self.session = session
		self.terms = [int(x) for x in set(re.compile('value="(\d+)"').findall(search_page))]
		self.terms.sort(reverse=True)

	def __iter__(self):
		for x in self.terms:
			yield TimeSchedulesTerm(self.session, str(x))

class TimeSchedulesTerm(object):
	def __init__(self, session, term):
		self.term = term
		self.session = session
		request = session.get('http://timeschedules.uchicago.edu/index.php?term=%s' % term)
		if 'location' in request.headers:
			self.departments = []
		else:
			self.departments = list(set(re.compile(r'view\.php\?dept=(\w+)&').findall(request.text)))
			self.departments.sort()
		try:
			self.term_string = re.compile(r'\w{6} \d{4}').search(request.text).group(0)
		except:
			self.term_string = "?"
			self.departments = []
	
	def __iter__(self):
		for x in self.departments:
			yield TimeSchedulesDepartment(self.session, self.term, x)

	def __str__(self):
		return self.term_string

	def __repr__(self):
		return self.term

class TimeSchedulesDepartment(object):
	def __init__(self, session, term, department):
		self.term = term
		self.department = department
		self._request = session.get('http://timeschedules.uchicago.edu/view.php?dept=%s&term=%s' % (department, term))
	def get_entries(self):
		return TimeSchedulesFSM(self._request.text).execute()
	def __str__(self):
		return self.department

	def __repr__(self):
		return self.department
