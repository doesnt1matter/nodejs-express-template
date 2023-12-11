class DateService {
    Now() {
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

        return {date, year, month, day, hours, minutes, seconds, milliseconds, fullDate, fullTime, full};
    }
}

module.exports = new DateService();