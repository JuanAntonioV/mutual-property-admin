export const textDotsFormat = (text, maxLength) => {
    if (text) {
        const textLength = text.length;

        if (textLength > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }
};

export const dateFormater = (date, type) => {
    if (date) {
        const newDate = new Date(date);
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const year = newDate.getFullYear();

        const monthName = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember',
        ];
        const monthNameShort = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Mei',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Okt',
            'Nov',
            'Des',
        ];

        if (type === 'short') {
            return `${day} ${monthNameShort[month - 1]} ${year}`;
        }

        return `${day} ${monthName[month - 1]} ${year}`;
    }
};
