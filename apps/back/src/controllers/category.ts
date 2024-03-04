import axios from 'axios';

const getCategoryInfo = async(req, res) => {
  const id = req.params;

  const data = await axios
    .get(`https://api.mercadolibre.com/categories/${id.item}`)
    .then((response) => response.data)
    .catch((e) => { console.log(e); });

  return res.json(data);
};

export {
  getCategoryInfo,
};
