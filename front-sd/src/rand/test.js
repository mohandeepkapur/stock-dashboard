function getDateRange(option) {
    const today = new Date();
    let startDate;
    let endDate = new Date(today); // default end date is today

    switch (option) {
        case 'yesterday':
            startDate = new Date();
            startDate.setDate(today.getDate() - 1);
            break;
        case 'week':
            startDate = new Date();
            startDate.setDate(today.getDate() - 7);
            break;
        case 'month':
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 1);
            break;
        case 'year':
            startDate = new Date();
            startDate.setFullYear(today.getFullYear() - 1);
            break;
        case '5year':
            startDate = new Date();
            startDate.setFullYear(today.getFullYear() - 5);
            break;
        default:
            throw new Error('Invalid option');
    }

    const format = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return {
        start: format(startDate),
        end: format(endDate),
    };
}

console.log(getDateRange('yesterday')); // Example usage
console.log(getDateRange('week'));
console.log(getDateRange('month'));
console.log(getDateRange('year'));
console.log(getDateRange('5year'));
