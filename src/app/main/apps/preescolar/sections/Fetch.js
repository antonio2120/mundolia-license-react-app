import request from 'superagent';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import moment from 'moment';
import 'moment/locale/es';
export function getEvents(callback, apiKey, idCalendar, color) {
    let GOOGLE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars/' + idCalendar.toString() +'/events?key=' + apiKey.toString();
    request.get(GOOGLE_CALENDAR_URL)
        .then(res => {
            const events = [];
            var helperResponse = JSON.parse(res.text);
            if(helperResponse.items.length > 0) {
                var rule = RRule.fromString(helperResponse.items[0].recurrence.toString())
                var datesEvent = rule.all().toString().split(',');
                events.push({
                    title: helperResponse.summary.toString(),
                    start: new Date(helperResponse.items[0].start.dateTime.toString()),
                    end: new Date(helperResponse.items[0].end.dateTime.toString()),
                    customColor: color.toString()
                });
                for (var i = 0; i < datesEvent.length; i++) {
                    var timeStringStart = moment(helperResponse.items[0].start.dateTime.toString()).format('hh:mm:ss a');
                    var timeStringEnd = moment(helperResponse.items[0].end.dateTime.toString()).format('hh:mm:ss a');
                    var dateString = moment(datesEvent[i].toString()).format('YYYY-MM-DD');
                    var initDate = dateString + ' ' + timeStringStart;
                    var endDate = dateString + ' ' + timeStringEnd;
                    events.push({
                        title: helperResponse.summary.toString(),
                        start: new Date(initDate.toString()),
                        end: new Date(endDate.toString()),
                        customColor: color.toString()
                    });
                }
                callback(events);
            }
        })
        .catch(err => {
            alert('ERROR GETTING DATA FROM GOOGLE')
        });
}