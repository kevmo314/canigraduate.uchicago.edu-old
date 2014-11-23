#!/usr/bin/python
import sqlite3, urllib, sys
from email.mime.text import MIMEText
from subprocess import Popen, PIPE

def emit(quarter, id, section, activity, old, new, newest=True):
	# newest=true if from contribute.php, false if from get_schedules.py
	connection = sqlite3.connect('/var/www/canigraduate/canigraduate.db', timeout=15)
	cursor = connection.cursor()
	for row in cursor.execute('SELECT email FROM watches WHERE (quarter=? OR quarter IS NULL OR quarter="") AND (course=? OR course IS NULL OR course="") AND (section=? OR section IS NULL OR section="") AND (activity=? OR activity IS NULL OR activity="") AND quarter_id %s (SELECT MAX(quarter_id) FROM watches)' % ('IN' if newest else 'NOT IN'), (quarter, id, section, activity)):
		print(row)
		get_param = urllib.urlencode({
			'cnetid':row[0].split("@")[0],
			'quarter':quarter or '',
			'id':id or '',
			'section':section or '',
			'activity':activity or ''
		})
		email(row[0], '%s %s Enrollment Notification' % (quarter, id), 'Hi there! One of your watches on Can I Graduate? was triggered. Exciting!\n\nQuarter: %s\nClass: %s\nSection: %s\nActivity: %s\n\nPrevious: %d/%s\nCurrent: %d/%s\n\nVisit this link to add this class: https://canigraduate.uchicago.edu/quickadd.php?%s\n\nMuuuuuugit!\nMagister Mugit\n\nDidn\'t expect this email? Questions or comments? Want to unsubscribe? Send it to Magister.Mugit@uchicago.edu!' % (quarter, id, section, activity, old[0], old[1] if old[1] > -1 else 'NO LIMIT', new[0], new[1] if new[1] > -1 else 'NO LIMIT', get_param))
	connection.close()

def email(to, subject, message):
	msg = MIMEText(message)
	msg["From"] = "mugit@canigraduate.uchicago.edu"
	msg["To"] = to
	msg["Reply-To"] = "Magister.Mugit@uchicago.edu"
	msg["Subject"] = subject
	p = Popen(["/usr/sbin/sendmail", "-t"], stdin=PIPE)
	p.communicate(msg.as_string())

def main():
	if len(sys.argv) == 9:
		# includes an activity
		emit(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], [int(sys.argv[5]), int(sys.argv[6])], [int(sys.argv[7]), int(sys.argv[8])])
	elif len(sys.argv) == 8:
		emit(sys.argv[1], sys.argv[2], sys.argv[3], None, [int(sys.argv[5]), int(sys.argv[6])], [int(sys.argv[7]), int(sys.argv[8])])

if __name__ == '__main__':
	main()
