class DateService {
    static NowFull() {
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds()

        const fullDate = `${day}.${month}.${year}`;
        const fullTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
        const full = `${fullDate}-${fullTime}`;

        return { timestamp: date, year, month, day, hours, minutes, seconds, milliseconds, fullDate, fullTime, full };
    }

    static Now() {
        return new Date();
    }

    static SplitTimestamp(timestamp) {
        const temp = timestamp.split("T");

        const fullDate = temp[0].replaceAll("-", ".");
        const splittedFullDate = fullDate.split("-");

        const fullTime = temp[1].replaceAll("Z", "").replaceAll(".", ":");
        const splittedFullTime = fullTime.split(":");

        const year = splittedFullDate[0];
        const month = splittedFullDate[1];
        const day = splittedFullDate[2];
        const hours = splittedFullTime[0];
        const minutes = splittedFullTime[1];
        const seconds = splittedFullTime[2];
        const milliseconds = splittedFullTime[3];

        const full = `${fullDate}-${fullTime}`;

        return { timestamp: timestamp, year, month, day, hours, minutes, seconds, milliseconds, fullDate, fullTime, full };
    }
}

module.exports = DateService;
