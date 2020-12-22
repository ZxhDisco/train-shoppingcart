import * as api from "../api/index";

export default {
  namespace: "products",
  state: {
    data: [],
  },
  effects: {
    *fetch({ payload: {} }, { call, put }) {
      const data = yield call(api.getProducts, {});
      yield put({ type: "save", payload: { data } });
    },
    *sortDatas({ payload: { product, key } }, { put }) {
      let newData = [];
      if (key === "asc") {
        newData = product.sort((a, b) => a["price"] - b["price"]);
      } else if (key === "desc") {
        newData = product.sort((a, b) => b["price"] - a["price"]);
      } else {    
       // product.map((item) => console.log(item["price"]))
        // newData = product.filter((item) => {
        //   return item.availableSizes.includes("XL")
        // });
        // console.log(newData);
  
        newData = product.sort((a, b) => a["id"] - b["id"]);
      }
      yield put({
        type: "setData",
        data: [...newData],
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        data: payload.data,
      };
    },
    addOne(state,{payload}){
      const {data} = state
      const newData = JSON.parse(JSON.stringify(data))
      newData.map((item)=>{
        if(item.id = payload.product_id){
          ++item.installments
        }
      })
      return {
        data:newData
      }
    },
    addCart(state, { payload }) {
      const newData = state.data.map((item) => {
        if (item.id === payload.product_id && item.installments > 0) {
          item.installments--;
          return item;
        }
        return item;
      });
      return {
        data: newData,
      };
    },
    setData(state, payload) {
      return {
        ...state,
        data: [...payload.data],
      };
    },
  },
};
