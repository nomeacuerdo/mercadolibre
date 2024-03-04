import axios from 'axios';

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

  const data = await axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
    .then((response) => response.data)
    .catch((e) => { console.log(e); });

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
    freeShipping: item.shipping.free_shipping
  }));

  return res.json({
    author: {
      name: 'Nicolas',
      lastname: 'Arteaga'
    },
    categories,
    items: mappedItems
  });
};

const getSingleItemData = async(req, res) => {
  const id = req.params;

  const data = await axios
    .all([
      axios({
        method: 'get',
        url:`https://api.mercadolibre.com/items/${id.item}`
      }),
      axios({
        method: 'get',
        url:`https://api.mercadolibre.com/items/${id.item}/description`
      }),
    ])
    .then((response) => {
      const [itemReq, descriptionReq] = response || [];

      return {
        author: {
          name: 'Nicolas',
          lastname: 'Arteaga'
        },
        item: {
          id: itemReq.data.id,
          title: itemReq.data.title,
          price: {
            currency: itemReq.data.currency_id,
            amount: itemReq.data.price,
            decimals: 0,
          },
          picture: itemReq.data.thumbnail,
          condition: itemReq.data.condition,
          free_shipping: itemReq.data.shipping.free_shipping,
          sold_quantity: itemReq.data.sold_quantity,
          description: descriptionReq.data.plain_text
        }
      }
    })
    .catch((e) => { console.log(e.message); });

  return res.json(data);
};

export {
  getAllItemsData,
  getSingleItemData,
};
