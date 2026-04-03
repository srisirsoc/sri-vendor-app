const UTCDate = (date, is_time = true, hour12 = true) => {
    if (!date) return "--";
    const d = new Date(date);
    const p = { year: "numeric", month: "short", day: "numeric" };
    if (is_time) { p.hour = "numeric"; p.minute = "numeric"; };
    if (hour12) { p.hour12 = true } else { p.hour12 = false };
    const formatter = new Intl.DateTimeFormat("en-US", p);
    return formatter.format(date);
};

const ISTDate = (date, is_time = true, hour12 = true) => {
    if (!date) return "--";
    const d = new Date(date);
    const p = { timeZone: 'Asia/Kolkata', dateStyle: 'short' };
    if (is_time) { p.timeStyle = "short" };
    if (hour12) { p.hour12 = true } else { p.hour12 = false };
    return new Intl.DateTimeFormat('en-IN', p).format(d);
};
export { UTCDate, ISTDate };