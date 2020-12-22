import products from "./shopdata.json";
// import axios from 'axios'

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
};

// export const getProducts = () => {
//   axios.get(products).then(res=> console.log(res,'getshopping'))
// }
 