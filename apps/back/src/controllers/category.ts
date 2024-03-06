const getCategoryInfo = async(req, res) => {
  const id = req.params;

  const data = await fetch(`https://api.mercadolibre.com/categories/${id.item}`)
    .then(response => response.json());

  return await res.json(data);
};

export {
  getCategoryInfo,
};
