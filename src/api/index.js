import products from "./shopdata.json";

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
};
