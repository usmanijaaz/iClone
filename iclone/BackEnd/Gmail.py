from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

#print(SCOPES)

def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())


main()




#try:
        # Call the Gmail API
    #     service = build('gmail', 'v1', credentials=creds)
    #     results = service.users().messages().list(userId='me',labelIds = ['INBOX'],maxResults=2).execute()
    #     labels = results.get('messages', [])

    #     if not labels:
    #         #print('No labels found.')
    #         return
    #    #print('Labels:')

    #     EmailsData = []
    #     for label in labels:
    #         msg = service.users().messages().get(userId='me', id=label['id']).execute()
    #         dataHeaders = msg['payload']['headers']
    #         dataParts = msg['payload']['parts']
    #         email = {"Date":' ',"To":'',"From":'',"Subject":'',"Extra":'',"BodyText":''}
    #         for i in range(len(dataHeaders)):
    #             obj = dataHeaders[i]
    #             if obj['name'] == 'Date':
    #                 email['Date'] = str(obj['value'])
    #             elif obj['name'] == 'To' or obj['name'] == 'Delivered To':
    #                 email['To'] = str(obj['value'])
    #             elif obj['name'] == 'From':
    #                 email['From'] = str(obj['value'])
    #             elif obj['name'] == 'Subject':
    #                 email['Subject'] = str(obj['value'])
    #             elif obj['name'] == 'Received':
    #                 email['Extra'] += ' ' + str(obj['value'])
    #         for i in range(len(dataParts)):
    #             obj = dataParts[i]
    #             if obj['mimeType'] == 'text/plain':
    #                 email['BodyText'] = base64.urlsafe_b64decode(str(obj['body']['data'])).decode('utf-8')

    #         EmailsData.append(email)
    #     print(EmailsData)


    # except HttpError as error:
    #     # TODO(developer) - Handle errors from gmail API.
    #     print(f'An error occurred: {error}')
