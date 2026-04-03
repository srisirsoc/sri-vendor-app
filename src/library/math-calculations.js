
function CalculateRating(n) {
    const rating = Number(n);
    if (!rating || rating === 0) { return 0; }
    const total_percentage = 100;
    const rate = total_percentage / rating;
    return Math.ceil(rate);
};

const GetFullTime = {
    GetDateDays: () => {
        const data = [];
        for (let i = 0; 31 > i; i++) { data.push({ key: i + 1, value: i + 1 }); }
        return data;
    },

    GetDateMonths: () => {
        const data = [
            { key: 1, value: "Jan" },
            { key: 2, value: "Feb" },
            { key: 3, value: "Mar" },
            { key: 4, value: "Apr" },
            { key: 5, value: "May" },
            { key: 6, value: "Jun" },
            { key: 7, value: "Jul" },
            { key: 8, value: "Aug" },
            { key: 9, value: "Sep" },
            { key: 10, value: "Oct" },
            { key: 11, value: "Nov" },
            { key: 12, value: "Dec" },
        ];
        return data;
    },
    GetDateYears: () => {
        const data = [];
        const year = new Date().getFullYear();
        for (let i = 1938; year > i; i++) { data.push({ key: i + 1, value: i + 1 }) };
        return data;
    },
    GetDateHours: () => {
        const data = [];
        for (let i = 0; 12 > i; i++) { data.push({ key: i + 1, value: i + 1 }); };
        return data;
    },
    GetDateMinutes: () => {
        const data = [];
        for (let i = 0; 60 > i; i++) { data.push({ key: i + 1, value: i + 1 }); };
        return data;
    },
    GetDateSeconds: () => {
        const data = [];
        for (let i = 0; 60 > i; i++) { data.push({ key: i + 1, value: i + 1 }); };
        return data;
    },
    ChangeDateFormate: (date) => {
        const event = new Date(date);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const new_date = event.toLocaleDateString(undefined, options);
        const h = event.getHours();
        const m = event.getMinutes();
        const s = event.getSeconds();
        return `${new_date} ${h}:${m}:${s}`;
    },
    ChangeHours24: (merediam, hours) => {
        let hrs24 = 0;

        if (!merediam || !hours) {
            throw new Error("Pass required parameters!");
        }

        if (merediam === 'PM') {
            if (hours < 12) {
                hrs24 = parseInt(hours) + 12;
            } else if (hours === 12) {
                hrs24 = 0;
            };

        } else if (merediam === "AM") {
            hrs24 = hours;
        };
        return hrs24;
    },
    GetFormatedDate: (date) => {
        const newdate = new Date(date);
        const formatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true });
        return formatter.format(newdate);
    },
    GetSecToTime: (duration) => {
        let minutes = Math.floor(duration / 60);
        let seconds = duration % 60;
        return `${minutes} mins ${seconds} secs`;
    },
};




export { CalculateRating, GetFullTime };