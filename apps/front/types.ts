export type ResultItemType = {
  id: string;
  category_id: string | null;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  },
  picture: string;
  condition: string;
  freeShipping: boolean;
  seller?: string;
};

export type CategoryType = {
  catecory: string;
  instances: number;
};

export type SearchResultType = {
  author: {
    name: string;
    lastname: string;
  }
  categories: CategoryType[];
  items: ResultItemType[];
};

export type ItemDetailsType = {
  author: {
    name: string;
    lastname: string;
  }
  item: {
    id: string;
    category_id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: 0,
    },
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  }
};

export type ConditionType = {
  new: string;
  used: string;
  not_specified: string;
};