import O365
from O365 import Account, Connection,  MSGraphProtocol, Message
from O365.mailbox import MailBox
from datetime import datetime
import re
# as per recommendation from @freylis, compile once only
CLEANR = re.compile('<.*?>') 

def cleanhtml(raw_html):
  cleantext = re.sub(CLEANR, '', raw_html)
  return cleantext
from regex import P

def getoutlook():
  credentials = ('1e7e79eb-87d4-47f6-ab2b-675b5523c3c0', 'Mfo7Q~B83R6E~rE3YRxYSaeaI-WX7hQA47am_')
  account = Account(credentials)
  # account.connection.refresh_token()
  mailbox = account.mailbox()
  inbox = mailbox.inbox_folder()
  list_of_emails = []
  email = {'Date':'' , 'To':'' , 'From':'' , 'Subject':'' , 'Imperative':'' , 'Events':''}
  #print("check ", inbox.get_messages())
  for message in inbox.get_messages(limit=10):
      # recipients = [rec.address for rec in message.to._recipients]
      email['Subject'] = message.subject
      email['Date'] = message.received
      email['From'] = message.sender
      email['Body'] = cleanhtml(message.body)
      list_of_emails.append(email)
  print(list_of_emails)
    

getoutlook()

# print("mailbox= ", mailbox)
# inbox = mailbox.get_folder(folder_name='*')
# print('inbox = ', inbox)
# child_folders = inbox.get_folders(25)
# print('child_folders = ', child_folders)
# for folder in child_folders:
#     print(folder.name, folder.parent_id)

# m = account.new_message()
# m.to.add('l180921@lhr.nu.edu.pk')
# m.subject = 'Testing!'
# m.body = "George Best quote: I've stopped drinking, but only while I'm asleep."
# m.send()


# scopes 'https://outlook.office365.com/Calendars.Read']
# account = Account(credentials)

# schedule = account.schedule()
# calendar = schedule.get_default_calendar()

# q = calendar.new_query('start').greater_equal(datetime(2019, 5, 20))
# q.chain('and').on_attribute('end').less_equal(datetime(2019, 10, 24))

# events = calendar.get_events(query=q, include_recurring=True)

# for event in events:
#     print(event.subject)

# from O365 import Account
# credentials = ('1e7e79eb-87d4-47f6-ab2b-675b5523c3c0', 'Mfo7Q~B83R6E~rE3YRxYSaeaI-WX7hQA47am_')

# # the default protocol will be Microsoft Graph
# # the default authentication method will be "on behalf of a user"

# account = Account(credentials)
# if account.authenticate(scopes=['basic', 'message_all']):
#    print('Authenticated!')