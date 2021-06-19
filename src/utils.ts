export function getWeekDates() {

    let now = new Date();
    let dayOfWeek = now.getDay();
    let numDay = now.getDate();

    let start = new Date(now);
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    let end = new Date(now);
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);

    return [start, end];
}

export function dateDiff(first: Date, second: Date) {
    // @ts-ignore
    return Math.round((second - first) / (1000*60*60*24));
}

export function beautifyDate(date: string): string {
    return date.slice(5, -3).replace('T', ' ')
}
