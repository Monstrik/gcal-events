const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version: "v3"});

const auth = new google.auth.JWT(CREDENTIALS.client_email, null, CREDENTIALS.private_key, SCOPES);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '-04:00';
// console.log(new Date().getTimezoneOffset());

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth, calendarId: calendarId, timeMin: dateTimeStart, timeMax: dateTimeEnd, timeZone: 'Asia/Kolkata'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

let start = '2023-09-07T00:00:00.000Z';
let end = '2023-10-04T00:00:00.000Z';

getEvents(start, end)
    .then((res) => {
        console.log(res);
        const fs = require('fs');
        fs.writeFile('data.json', JSON.stringify(res), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File written successfully');
            }
        });
    })
    .catch((err) => {
        console.log(err);
    });
