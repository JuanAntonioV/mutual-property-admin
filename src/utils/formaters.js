export const textDotsFormat = (text, maxLength) => {
    if (text) {
        const textLength = text.length;

        if (textLength > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }
};
