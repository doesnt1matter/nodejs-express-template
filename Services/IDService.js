class IDService {
    GenerateID() {
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    GenerateNumericID() {
        const part1 = new Date().getUTCMilliseconds();
        const part2 = new Date().valueOf();
        return `${part1}${part2}`
    }
}

module.exports = new IDService();