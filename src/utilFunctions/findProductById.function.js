const findProductByIdFromShopData = (shopData, id) => {
  let item = null;

  for (let i = 0; i < shopData.length; i++) {
    item = shopData[i].items.find((item) => item.id === +id);
    if (item) break;
  }

  return item;
};

export default findProductByIdFromShopData;
