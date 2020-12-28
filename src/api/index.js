import products from "./shopdata.json";
import axios from 'axios'

// export const getProducts = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(products), 1000);
//   });
// };

export const getProducts = async () => {
  return await axios.get('https://www.fastmock.site/mock/b3fb1711049eb284f006b4d4f1e2664b/shop/api/shop')
  .then(res=>{
    console.log(res.data);
    
    return res.data
  })
   
}
 