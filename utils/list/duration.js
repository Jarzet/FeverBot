const moment = require('moment');

module.exports = class Duration
{
    constructor(timestamp)
    {
        this.duration = f_duration(timestamp)
    }

    get years() 
    {
        return this.duration._data.years;
    }

    get months() 
    {
        return this.duration._data.months;
    }

    get days() 
    {
        return this.duration._data.days;
    }

    get hours() 
    {
        return this.duration._data.hours;
    }

    get minutes() 
    {
        return this.duration._data.minutes;
    }

    get seconds() 
    {
        return this.duration._data.seconds;
    }

    toString()
    {
        var msg = (this.duration._data.years == 0) ? "": ((this.duration._data.years == 1) ? `${this.duration._data.years } year ` : `${this.duration._data.years } years `);
        msg += (this.duration._data.months == 0) ? "": ((this.duration._data.months == 1) ? `${this.duration._data.months } month ` : `${this.duration._data.months } months `);
        msg += (this.duration._data.days == 0) ? "": ((this.duration._data.days == 1) ? `${this.duration._data.days } day ` : `${this.duration._data.days } days `);
        msg += (this.duration._data.hours == 0) ? "": ((this.duration._data.hours == 1) ? `${this.duration._data.hours } hour ` : `${this.duration._data.hours } hours `);
        msg += (this.duration._data.minutes == 0) ? "": ((this.duration._data.minutes == 1) ? `${this.duration._data.minutes } minute ` : `${this.duration._data.minutes } minutes `);
        msg += (this.duration._data.seconds == 0) ? "": ((this.duration._data.seconds == 1) ? `${this.duration._data.seconds } second ` : `${this.duration._data.seconds } seconds `);
        return msg;
    }

    static getYears(timestamp) 
    {
        return f_duration(timestamp)(timestamp)._data.years;
    }

    static getMonths(timestamp) 
    {
        return f_duration(timestamp)._data.months;
    }

    static getDays(timestamp) 
    {
        return f_duration(timestamp)._data.days;
    }

    static getHours(timestamp) 
    {
        return f_duration(timestamp)._data.hours;
    }

    static getMinutes(timestamp) 
    {
        return f_duration(timestamp)._data.minutes;
    }

    static getSeconds(timestamp) 
    {
        return f_duration(timestamp)._data.seconds;
    }

    static toString(timestamp)
    {
        var duration = f_duration(timestamp);
        var msg = (duration._data.years == 0) ? "": ((duration._data.years == 1) ? `${duration._data.years } year ` : `${duration._data.years } years `);
        msg += (duration._data.months == 0) ? "": ((duration._data.months == 1) ? `${duration._data.months } month ` : `${duration._data.months } months `);
        msg += (duration._data.days == 0) ? "": ((duration._data.days == 1) ? `${duration._data.days } day ` : `${duration._data.days } days `);
        msg += (duration._data.hours == 0) ? "": ((duration._data.hours == 1) ? `${duration._data.hours } hour ` : `${duration._data.hours } hours `);
        msg += (duration._data.minutes == 0) ? "": ((duration._data.minutes == 1) ? `${duration._data.minutes } minute ` : `${duration._data.minutes } minutes `);
        msg += (duration._data.seconds == 0) ? "": ((duration._data.seconds == 1) ? `${duration._data.seconds } second ` : `${duration._data.seconds } seconds `);
        return msg;
    }

    
}

function f_duration(timestamp)
{
    var current = moment(Date.now());
    var previous = moment(timestamp);
    return moment.duration(current.diff(previous))
}