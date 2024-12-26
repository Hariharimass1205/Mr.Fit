export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return new Date(dateString).toLocaleString(undefined, options);
};