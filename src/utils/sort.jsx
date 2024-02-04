export const sortProduct = (products, option) => {
  let sortedProducts = ''
  switch (option) {
    case 'nameAscending':
      sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDescending':
      sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'priceAscending':
      sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/,/g, ''));
        const priceB = parseFloat(b.price.replace(/,/g, ''));
        return priceA - priceB;
      });
      break;
    case 'priceDescending':
      sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/,/g, ''));
        const priceB = parseFloat(b.price.replace(/,/g, ''));
        return priceB - priceA;
      });
      break;
    default:
      sortedProducts = [...products].sort((a, b) => {
        const idA = parseFloat(a.pID.replace(/,/g, ''));
        const idB = parseFloat(b.pID.replace(/,/g, ''));
        return idA - idB;
      });

  }

  return sortedProducts
}