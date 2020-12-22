import { message } from "antd";
export default {
  namespace: "cart",
  state: {
    data: [],
  },
  effects: {
    *addCart({ payload }, { put }) {
      yield put({ type: "products/addCart", payload });
      yield put({ type: "saveItem", payload });
    },
    *setStorage({payload},{put }){
      yield put ({
        type:"storageData",
        cdata:{
          _data: JSON.parse(window.localStorage.data)
        }
      })
    },
    *settlementData({payload},{put}){
      yield put({type:"settlement"})
    },
    *decreaseNum({ payload },{put}) {
      yield put({
        type:'cutOne',
        payload
      })
      yield put({
        type:'products/addOne',
        payload
      })
    },*increaseNum({payload}, {put}){
      yield put ({
        type:"increment",
        payload
      })
    },*removeCart({payload}, {put}){
      yield put ({
        type:"removeGood",
        payload
      })
    }
  },
  reducers: {
    saveItem(state, { payload }) {
      const {data} = state
      let newData = [];
      const finded = data.find(
        (item) =>
          item.product_id === payload.product_id && item.size === payload.size
      );
      if (finded) {
        finded.quantity += payload.quantity;
        newData = data.map((item) =>
          item.product_id === finded.product_id && item.size === finded.size
            ? finded
            : item
        );
      } else {
        newData = [...data, payload];
      }
      
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)
      return {
        data: newData,
      };
    },
    removeGood(state, { payload }) {
      const {data} = state
      data[payload.index].product.installments += payload.quantity
      data.splice(payload.index, 1);
      console.log(data);
      
      
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)
      return { 
        ...state,
        data: [...data] };
    },
    increment(state, { payload }) {
      const { data } = state;
      const index = data.findIndex(
        (item) => item.id === payload.id && item.size === payload.size
      );
      if (data[index].product.installments === 0) {
        message.error("库存不足");
      } else {
        data[index].quantity += payload.key;
        data[index].product.installments -= payload.key;
      }
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)

      return { data: [...data] };
    },
    
    storageData(state,{cdata}){
      return {
        data:cdata._data
      }
    },
    settlement(state,{data}){
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)

      return{
        ...state,
        data:data._data
      }
    },
    checkout(state) {
      const {data} = state
      data.splice(0,data.length)
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)
      return {
        data: [...data],
      };
    },
    cutOne(state,{payload}){
      const { data } = state;
      const index = data.findIndex(
        (item) => item.id === payload.id && item.size === payload.size
      );
      if (data[index].quantity === 1) {
        message.error("库存只有一件啦，不能再减了");
      } else {
        data[index].quantity += payload.key;
        data[index].product.installments -= payload.key;
        console.log(data[index].product.installments);
      }
      const storage = window.localStorage
      let _data = JSON.stringify(data)
      storage.setItem("data",_data)

      return { data: [...data] };
    }
  },
};
