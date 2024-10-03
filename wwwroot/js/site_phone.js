function money_2(number) {
    const formattedAmount = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
    return formattedAmount;
}