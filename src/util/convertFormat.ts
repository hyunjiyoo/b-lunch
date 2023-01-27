export const convertPriceFormat = (price: number) => {
  return '₩' + (+price).toLocaleString('en');
}
