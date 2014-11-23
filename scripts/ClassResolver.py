import json, requests
import re, time
import HTMLParser

def clean_class(name):
	oldname = name
	if name.endswith(' (honors)'): # basic algebra is weird
		name = 'Honors ' + name[:-9]
	honors_regex = re.compile('(:|-)\s*honors$', re.IGNORECASE)
	if honors_regex.search(name):
		name = 'Honors ' + honors_regex.sub('', name)
	name = re.sub(r'[\s-]+(1|I)(:|$)', r' 1\2', name)
	name = re.sub(r'[\s-]+(2|II)(:|$)', r' 2\2', name)
	name = re.sub(r'[\s-]+(3|III)(:|$)', r' 3\2', name)
	name = re.sub(r'[\s-]+(4|IV)(:|$)', r' 4\2', name)
	name = re.sub(r'[\s-]+(5|V)(:|$)', r' 5\2', name)
	name = re.sub(r'[\s-]+(6|VI)(:|$)', r' 6\2', name)
	name = re.sub(r'[\s-]+(7|VII)(:|$)', r' 7\2', name)
	name = re.sub(r'[\s-]+(8|VIII)(:|$)', r' 8\2', name)
	name = re.sub(r'[\s-]+(9|IX)(:|$)', r' 9\2', name)
	name = re.sub(r'[\s-]+(10|X)(:|$)', r' 10\2', name)
	name = name.replace(' In ', ' in ')
	name = name.replace(' To ', ' to ')
	name = name.replace(' Of ', ' of ')
	name = name.replace(' And ', ' and ')
	name = name.replace('Anc ', 'Ancient ')
	name = name.replace('Mediterr ','Mediterranean ')
	name = name.replace('Introduction ', 'Intro ')
	name = name.replace('Intro: ','Intro to ')
	name = name.replace('Intro ', 'Introduction ')
	name = name.replace(' & ', ' and ')
	name = name.replace('B. A.', 'B.A.')
	name = re.sub(' +', ' ', name) # remove duplicate spaces
	if oldname != name:
		print("Converted %s -> %s" % (oldname, name))
	return name


class SetEncoder(json.JSONEncoder):
	def default(self, obj):
		if isinstance(obj, set):
			return list(obj)
		return json.JSONEncoder.default(self, obj)


class ClassResolver(object):
	def __init__(self, session, filename):
		self.session = session
		try:
			with file(filename) as f:
				self.data = json.loads(f.read())
		except:
			print('Failed to parse')
			self.data = {}
		self.resolvable = {}
		self.predefined = {}

	def add(self, id, quarter, name):
		if id not in self.resolvable:
			self.predefined[id] = name
			self.resolvable[id] = quarter

	def write(self, filename):
		for id, quarter in self.resolvable.items():
			while True:
				try:
					req = self.session.post('https://classes.uchicago.edu/courseDetail.php?courseName=%s' % id, {'TermName':quarter}).text
					if req.find('You have tried to load too many pages too quickly') != -1:
						time.sleep(0.1)
						continue
				except:
					continue
				break
			title_re = re.search(r'\w{4} \d{5}: (.+?)\<', req, re.DOTALL | re.MULTILINE)
			if not title_re:
				if self.predefined[id]:
					print("FALLBACK %s %s %s" % (id, quarter, self.predefined[id]))
					class_title = self.predefined[id]
				else:
					print("REJECT %s %s" % (id, quarter))
					continue
			else:
				class_title = title_re.group(1).strip()
			class_title = clean_class(HTMLParser.HTMLParser().unescape(class_title).strip())
			if class_title.strip() != 'CANCELLED':
#				print("%s :: %s" % (id, class_title))
				self.data[id] = {'crosslist':set(), 'name':class_title}
				cl_re = re.findall(r'courseDetail\.php\?courseName=(\w{4} \d{5})', req)
				for cl in cl_re:
					if cl != id:
						self.data[id]['crosslist'].add(cl.strip())
		
		# add manual overrides because wtf!?
		self.data['HUMA 19100'] = {'name':'Humanities Writing Seminars', 'crosslist':set()}
	
		with open(filename, 'w') as f:
			f.write(json.dumps(self.data, cls=SetEncoder))
