class DateService {
    static Now(timestamp) {
        const date = timestamp ? new Date(timestamp) : new Date();

        const year = date.getFullYear() + "";
        const month = (date.getMonth() + 1 + "").padStart(2, "0");
        const day = (date.getDate() + "").padStart(2, "0");
        const hours = (date.getHours() + "").padStart(2, "0");
        const minutes = (date.getMinutes() + "").padStart(2, "0");
        const seconds = (date.getSeconds() + "").padStart(2, "0");
        const milliseconds = (date.getMilliseconds() + "").padStart(3, "0")

        const fullDate = `${year}${month}${day}`;
        const fullTime = `${hours}${minutes}${seconds}${milliseconds}`;
        const full = `${fullDate}${fullTime}`;

        return { year, month, day, hours, minutes, seconds, milliseconds, fullDate, fullTime, timestamp: full };
    }
    static SplitTimestamp(timestamp) {
        const year = parseInt(timestamp.slice(0, 4));
        const month = parseInt(timestamp.slice(4, 6)) - 1;
        const day = parseInt(timestamp.slice(6, 8));
        const hours = parseInt(timestamp.slice(8, 10));
        const minutes = parseInt(timestamp.slice(10, 12));
        const seconds = parseInt(timestamp.slice(12, 14));
        const milliseconds = parseInt(timestamp.slice(14, 17));

        const fullDate = `${year}${month}${day}`;
        const fullTime = `${hours}${minutes}${seconds}${milliseconds}`;
        const full = `${fullDate}${fullTime}`;

        return { year, month, day, hours, minutes, seconds, milliseconds, fullDate, fullTime, timestamp: full };
    }
    static Increment(timestamp, amount, unit) {
        const date = new Date(
            parseInt(timestamp.slice(0, 4)), // year
            parseInt(timestamp.slice(4, 6)) - 1, // month
            parseInt(timestamp.slice(6, 8)), // day
            parseInt(timestamp.slice(8, 10)), // hours
            parseInt(timestamp.slice(10, 12)), // minutes
            parseInt(timestamp.slice(12, 14)), // seconds
            parseInt(timestamp.slice(14, 17)) // milliseconds
        );

        switch (unit) {
            case 'y':
                date.setFullYear(date.getFullYear() + amount);
                break;
            case 'm':
                date.setMonth(date.getMonth() + amount);
                break;
            case 'd':
                date.setDate(date.getDate() + amount);
                break;
            case 'h':
                date.setHours(date.getHours() + amount);
                break;
            case 'min':
                date.setMinutes(date.getMinutes() + amount);
                break;
            case 'sec':
                date.setSeconds(date.getSeconds() + amount);
                break;
            case 'ms':
                date.setMilliseconds(date.getMilliseconds() + amount);
                break;
        }

        return DateService.Now(date);
    }
    static Decrement(timestamp, amount, unit) {
        return DateService.Increment(timestamp, -amount, unit);
    }
}

module.exports = DateService;
