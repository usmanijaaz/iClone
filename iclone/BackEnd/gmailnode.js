const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var opn = require('opn');
'use strict';
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
var retrievedMessage = {};
// Load client secrets from a local file.
function start(){
  fs.readFile('credentials.json', async (err, content) => {
  if (err)
  { 
    return console.log('Error loading client secret file:', err);
  }
  authorize(JSON.parse(content), listLabels);
  //console.log('here',retrievedMessage);
});}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      return getNewToken(oAuth2Client, callback);
    }
    else{
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
    }
  });
  //var a = listLabels(oAuth2Client,retrievedMessage);
  //console.log(a);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  opn(authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout, 
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
      //console.log(retrievedMessage);
    });
  });
}

var Emails = []
/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  var results = gmail.users.messages.list({
    auth: auth, userId:'me',labelIds : ['INBOX'],maxResults:2
  },(err,res) => {
    if(err){
      console.log(err);
    }
    else{
      const msgs = res.data.messages;
      //console.log(msgs[0]['id']);
      msgs.forEach( (msg)=>{
        //console.log(msg['id']);
        gmail.users.messages.get({auth: auth, userId: 'me', 'id': msg['id']},async function(err, response) {
          if(err){
            console.log('cannot retrieve the msg');
          }
          else{
            retrievedMessage = response['data'];
            let email = {"Date":' ',"To":'',"From":'',"Subject":'',"Extra":'',"BodyText":''}
            await generateEmailDict(retrievedMessage,email);

          }
        })
      })
      console.log(Emails);
    }
  })
}
//let Emails = []
async function generateEmailDict(msg,email){
  var dataHeaders = msg['payload']['headers']
  var dataParts = msg['payload']['parts']
 // console.log(dataParts);
 // console.log(email);
  dataHeaders.forEach(
    (obj) =>
    {
      if (obj['name'] == 'Date')
      {
        email['Date'] = String(obj['value'])
      }
      else if(obj['name'] == 'To' || obj['name'] == 'Delivered To')
      {
        email['To'] = String(obj['value'])
      }
      else if(obj['name'] == 'From')
      {
        email['From'] = String(obj['value'])
      }
      else if(obj['name'] == 'Subject')
      {
        email['Subject'] = String(obj['value'])
      }
      else if(obj['name'] == 'Received')
      {
        email['Extra'] += ' ' + String(obj['value'])
      }
    }
  )
  dataParts.forEach(
    (obj) => {
       if(obj['partId'] == '1')
         var data = obj['body']['data'];
         var buff = Buffer.from(obj['body']['data'],"base64");
         email['BodyText'] = buff.toString();
     }
   )
  //console.log(email);
  Emails.push(email);
  //console.log(Emails);

}

// while(Emails.length !=2)
// {
//console.log('EMails:', Emails);
// }

module.exports.getEmails = start;