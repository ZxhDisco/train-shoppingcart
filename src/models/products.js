import * as api from "../api/index";
import {message} from 'antd'

export default {
  namespace: "products",
  state: {
    data: [],
    shopData:[]
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(api.getProducts);
      console.log(res);
      if(res){
        yield put({ type: "saveData", payload: {res} });
        yield put({ type: "saveShopdata", payload: {res} });
      }else{
        message.error("未找到数据")
      }
      

    },
    *sortDatas({ payload: { product, key,bol } }, { put }) {
      let newData = [];
      if(bol){
        if(key) {
          product.forEach(item => {
            for(let i = 0;i < item.availableSizes.length;i++){
              if(item.availableSizes[i] === key){
                newData.push(item)
              }
            }
          })
        }
      }else{
        if (key === "asc") {
          newData = product.sort((a, b) => a["price"] - b["price"]);
        } else if (key === "desc") {
          newData = product.sort((a, b) => b["price"] - a["price"]);
        }
        else {    
          newData = product.sort((a, b) => a["id"] - b["id"]);
        }
      }
      
      yield put({
        type: "setData",
        data: [...newData],
      });
    },
  },
  reducers: {
    saveData(state, payload ) {
      console.log(payload,'12323');
      
      const {res} = payload.payload
      return {
        ...state,
        data: res,
      };
    },
    saveShopdata(state, payload ) {
      const {res} = payload.payload
      return {
        ...state,
        shopData: res,
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
