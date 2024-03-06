const countOccurrences = (arr, val) => {
  const instances = arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  return { category: val, instances };
};

const getCategoriesFromData = (data) => {
  const allCategories = data.results.map((item) => item.category_id);
  const categoryOccurrences = allCategories.map(item => countOccurrences(allCategories, item));
  
  const unique = [];
  categoryOccurrences.map((x) =>
    unique.filter(
      (a) => (a.category == x.category && a.instances == x.instances)
    ).length > 0
    ? null
    : unique.push(x)
  );

  return unique.sort((item, b) => (item.instances < b.instances) ? 1 : -1);
};

const getAllItemsData = async(req, res) => {
  const { q } = req.query;

  const data = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
    .then(response => response.json());
  
  const categories = getCategoriesFromData(data);

  const mappedItems = data.results.map((item) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    freeShipping: item.shipping.free_shipping,
    seller: item.seller.nickname
  }));

  return res.json({
    author: {
      name: 'Nicolas',
      lastname: 'Arteaga'
    },
    categories,
    items: mappedItems.slice(0, 4) // Only return the first 4 items
  });
};

const getSingleItemData = async(req, res) => {
  const id = req.params;


  const itemData = await fetch(`https://api.mercadolibre.com/items/${id.item}`)
    .then(response => response.json());

  const descriptionData = await fetch(`https://api.mercadolibre.com/items/${id.item}/description`)
    .then(response => response.json());

  const returnObject = {
    author: {
      name: 'Nicolas',
      lastname: 'Arteaga'
    },
    item: {
      id: itemData?.id,
      category_id: itemData?.category_id,
      title: itemData?.title,
      price: {
        currency: itemData?.currency_id,
        amount: itemData?.price,
        decimals: 0,
      },
      picture: itemData?.pictures[0].url,
      condition: itemData?.condition,
      free_shipping: itemData?.shipping?.free_shipping,
      sold_quantity: itemData?.sold_quantity,
      description: descriptionData?.plain_text
    }
  };

  return res.json(returnObject);
};

export {
  getAllItemsData,
  getSingleItemData,
};
