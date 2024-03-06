export const formatPrice = (oldPrice: any, decimalUnits: number) => {
  const formattedPrice = new Intl.NumberFormat('en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: decimalUnits
    }).format(oldPrice.amount);

    const [price, decimals] = formattedPrice.split('.');

    return { price, decimals };
};