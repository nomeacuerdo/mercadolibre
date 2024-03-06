const getData = async (endpoint: string, query: string | null) => 
  fetch(`http://localhost:3333/api/${endpoint}${encodeURI(query || '')}`)
    .then((response) => response.json());


const getCategoryData = async (query: string | null) => getData('categories/', query);
const getItemsData = async (query: string | null) => getData('items?search=', query);
const getItemDetails = async (query: string | null) => getData('items/', query);

export { getItemsData, getCategoryData, getItemDetails };
