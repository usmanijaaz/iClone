from __future__ import print_function

import os.path
import O365
from O365 import Account, Connection,  MSGraphProtocol, Message
from O365.mailbox import MailBox
from datetime import datetime
import re
import json
#import Gmail as gmailpy
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from nltk import word_tokenize, pos_tag
import base64
# -*- coding: utf-8 -*-
import nltk
from nltk import RegexpParser
from nltk.tree import Tree
from nltk.tokenize import word_tokenize, sent_tokenize
import pandas as pd
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
import dateparser
import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
import spacy
nlp = spacy.load('en_core_web_sm',disable=['ner','textcat'])
from dateparser.search import search_dates

#import imperative as imp
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
CLEANR = re.compile('<.*?>') 
from regex import P
#credentials = ('1e7e79eb-87d4-47f6-ab2b-675b5523c3c0', 'Mfo7Q~B83R6E~rE3YRxYSaeaI-WX7hQA47am_')



def cleanhtml(raw_html):
  cleantext = re.sub(CLEANR, '', raw_html)
  return cleantext


#print("check ", inbox.get_messages())

def is_actionable(tagged_sent):
    if tagged_sent[-1][0] != "?":
        if tagged_sent[0][1] == "VB" or tagged_sent[0][1] == "MD":
            return True
        else:
            chunk = get_chunks(tagged_sent)
            if type(chunk[0]) is Tree and chunk[0].label() == "VB-Phrase":
                return True
    else:
        #print("It is a question")
        pls = len([w for w in tagged_sent if w[0].lower() == "please"]) > 0
        if pls or (tagged_sent[0][1] == "VB" or tagged_sent[0][1] == "MD"):
            return True

        chunk = get_chunks(tagged_sent)
        if type(chunk[-1]) is Tree and (chunk[-1].label() == "Q-Tag"):
            if (chunk[0][1] == "VB" or
                (type(chunk[0]) is Tree and chunk[0].label() == "VB-Phrase")):
                return True

    return False

def determine_tense_input(sentence):
    text = word_tokenize(sentence)
    tagged = pos_tag(text)

    tense = {}
    tense["future"] = len([word for word in tagged if word[1] in  ["MD", "VBC", "VBF"]])
    tense["present"] = len([word for word in tagged if word[1] in ["VBP", "VBZ","VBG"]])
    tense["past"] = len([word for word in tagged if word[1] in ["VBD", "VBN"]]) 
    return(tense)


''' Helper function to find Verb-Phrase '''

def get_chunks(tagged_sent):
    chunkgram = r"""VB-Phrase: {<DT><,>*<VB>}
                    VB-Phrase: {<RB><VB>}
                    VB-Phrase: {<UH><,>*<VB>}
                    VB-Phrase: {<UH><,><VBP>}
                    VB-Phrase: {<PRP><VB|VBP>}
                    VB-Phrase: {<NN.?>+<,>*<VB|MD>}
                    Q-Tag: {<,><MD><RB>*<PRP><.>*}"""  #Q-tag is not generic and hardcoded
    chunkparser = RegexpParser(chunkgram)
    return chunkparser.parse(tagged_sent)

# rule 0
def rule0(text, index):
    doc = nlp(text)
    token = doc[index]
    entity = ''
    for sub_tok in token.children:
        if (sub_tok.dep_ in ['compound','amod', 'verb']):
            entity += sub_tok.text+' '
    entity += token.text
    return entity

def rule3_mod(text):
    doc = nlp(text)
    sent = []
    for token in doc:
        if token.pos_=='ADP':
            phrase = ''
            if True:
              # if token.head.pos_=='NOUN':    
                # appended rule
              append = rule0(text, token.head.i)
              # print(append, '0')
              if len(append)!=0:
                  phrase += append
              else:  
                  phrase += token.head.text
              phrase += ' '+token.text
              for right_tok in token.rights:   
                  right_phrase = ''
                  # appended rule
                  append = rule0(text, right_tok.i)
                  # print(append, '2')
                  if len(append)!=0:
                      right_phrase += ' '+append
                  else:
                      right_phrase += ' '+right_tok.text 
                  phrase += right_phrase
              if len(phrase)>2:
                  sent.append(phrase)
    return sent

def extract_prepositions(email):
  email = re.split('[.?]', email)
  split_email = []
  for sentences in email:
    split_email.append(sentences)
  final_list = []
  for sentences in email:
    x = determine_tense_input(sentences)
    if not (x['past'] >= 1) or x['present'] >= 1:
      final_list.append(rule3_mod(sentences))
  return final_list

def preposition_approach(email):
  final_list = []
  # x = determine_tense_input(email)
  # if not x['past'] >= 1:
  email = email.replace('to','')
  # email = email.replace('on','')
  # email = email.replace('are','')
  date = search_dates(email, settings={'PREFER_DATES_FROM': 'future'})
  if date:
    x = extract_prepositions(email)
    string = ''
    for i in x:
      if len(i)!=0:
        date = search_dates(str(i), settings={'PREFER_DATES_FROM': 'future'})
        if date:
          string = string + str(i)  + ' ' +str(date)
      # print(str(date))
    # string = string + str(date)
    final_list.append(string)
    string = string.replace('[','')
    string = string.replace(']','')
    
    return string.replace('[','')
    # print(extract_prepositions(email))
      # print(date)
  return final_list




def check_iF_actionable(email):
  sentence_list = nltk.sent_tokenize(email)
  final_list = []
  for i in range(len(sentence_list)): 
      wordsList = nltk.word_tokenize(sentence_list[i])
      postag_sen = nltk.pos_tag(wordsList)
      if is_actionable(postag_sen) == True:
        string = str(sentence_list[i]) + ', '
        final_list.append(string)
  return final_list


# def getemails():
#     if os.path.exists('token.json'):
#         creds = Credentials.from_authorized_user_file('token.json', SCOPES)
#     else:
#         gmailpy.main()
#     try:
#         #Call the Gmail API
#         service = build('gmail', 'v1', credentials=creds)
#         results = service.users().messages().list(userId='me',labelIds = ['INBOX'],maxResults=5).execute()
#         labels = results.get('messages', [])

#         if not labels:
#             #print('No labels found.')
#             return
#        #print('Labels:')

#         EmailsData = []
#         for label in labels:
#             msg = service.users().messages().get(userId='me', id=label['id']).execute()
#             dataHeaders = msg['payload']['headers']
#             dataParts = msg['payload']['parts']
#             email = {"Date":' ',"To":'',"From":'',"Subject":'',"Extra":'',"BodyText":'','Imperative':'','Events':''}
#             for i in range(len(dataHeaders)):
#                 obj = dataHeaders[i]
#                 if obj['name'] == 'Date':
#                     email['Date'] = str(obj['value'])
#                 elif obj['name'] == 'To' or obj['name'] == 'Delivered To':
#                     email['To'] = str(obj['value'])
#                 elif obj['name'] == 'From':
#                     email['From'] = str(obj['value'])
#                 elif obj['name'] == 'Subject':
#                     email['Subject'] = str(obj['value'])
#                 elif obj['name'] == 'Received':
#                     email['Extra'] += ' ' + str(obj['value'])
#             for i in range(len(dataParts)):
#                 obj = dataParts[i]
#                 if obj['mimeType'] == 'text/plain':
#                     email['BodyText'] = base64.urlsafe_b64decode(str(obj['body']['data'])).decode('utf-8')
#             #print(email['BodyText'])
#             email['Imperative'] = check_iF_actionable(str(email['BodyText']))
#             email['Events'] = preposition_approach(str(email['BodyText']))
#             res = json.dumps(email)
#             EmailsData.append(res)
#         for i in range(len(EmailsData)):
#             pass #print(EmailsData[i])


#     except HttpError as error:
#         # TODO(developer) - Handle errors from gmail API.
#         print(f'An error occurred: {error}')


def GetStaticEmails():
    EmailsData = []
    file = open('sampleEmails.json')
    data = json.load(file)
    for i in data['emails']:
        i['Imperatives'] = check_iF_actionable(str(i['Body']))
        i['Events'] = preposition_approach(str(i['Body']))
        if len(i['Imperatives']) != 0 or len(i['Events']) != 0:
            res = json.dumps(i)
            EmailsData.append(res)
    for i in range(len(EmailsData)):
        print(EmailsData[i])
        
def getoutlook():
  count = 0
  credentials = ('1e7e79eb-87d4-47f6-ab2b-675b5523c3c0', 'Mfo7Q~B83R6E~rE3YRxYSaeaI-WX7hQA47am_')
  account = Account(credentials)
  # account.connection.refresh_token()
  mailbox = account.mailbox()
  inbox = mailbox.inbox_folder()
  list_of_emails = []
  email = {'Date':'' , 'To':'' , 'From':'' , 'Subject':'' ,'Body':'', 'Imperative':[] , 'Events':[]}
  #print("check ", inbox.get_messages())
  for message in inbox.get_messages(limit=10):
      # recipients = [rec.address for rec in message.to._recipients]
      email['Subject'] = str(message.subject)
      email['Date'] = str(message.received)
      email['From'] = str(message.sender)
      email['Body'] = str(cleanhtml(message.body))
      email['Imperative'] = check_iF_actionable(str(email['Body']))
      email['Events'] = preposition_approach(str(email['Body']))
      if len(email['Imperative']) != 0 or len(email['Events']) != 0:
          email['key'] = count
          res = json.dumps(email)
          list_of_emails.append(res)
          count = count + 1
  
  for i in range(len(list_of_emails)):
      print(list_of_emails[i])

getoutlook()