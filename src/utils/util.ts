export const getDiscountPercentage = (price: number, priceAfterDiscount: number) => { 
    if (price === 0) {
        return '0.00'
    }
    return ((100 * (price - priceAfterDiscount)) / price).toFixed(2) }
