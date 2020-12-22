import React, { useEffect, Fragment,useState } from "react";
import { Card, Popover, Button, Col, List, message, Spin, Space } from "antd";
import Header from "./Header";
import "../App.css";
import { connect } from "dva";
import {SyncOutlined} from "@ant-design/icons"
import cart from "../models/cart";


const { Meta } = Card;

const Products = ({ dispatch, products,cartData }) => {

  const [load,setLoad] = useState(0)
  useEffect(()=>{
    dispatch({
      type: "products/fetch",
      payload:{}
    });
  },[cartData])

  useEffect(async()=> {
    await setLoad(1)
    await dispatch({
      type: "products/fetch",
      payload: {page:1},
    })
    console.log('dispatchs');
    if(window.localStorage.data){
      dispatch({type:"cart/setStorage"})
    }
    await setLoad(0)

  },[])

  const shopList = (products || []).map((item,index) => {
    return (
      <Col
        xs={20}
        sm={10}
        md={7}
        lg={5}
        key={index}
        style={{ marginTop: "15px" }}
      >
        <Card
          hoverable
          cover={<img alt="ex" src={`./img/${item.sku}_1.jpg`} />}
          style={{ textAlign: "center" }}
        >
          {item.isFreeShipping?<div style={{position:'relative'}}>
            <span className="freeShip">Free Shipping</span>
          </div>:''}
          <Meta title={item.title} />
          <span className="contentLine">————</span>
          <br />
          <span className="price">$</span>
          <span className="priceInt">
            {item.price - (item.price % 1)}
          </span>
          <span className="priceFloat">
            {item.price % 1 === 0
              ? ""
              : "." + item.price.toString().split(".")[1]}
          </span>
          <br />
         
          <Popover
            content={
              <List
                size="small"
                dataSource={item.availableSizes}
                renderItem={(size) => (
                  <List.Item>
                    <Button
                      disabled={item.installments===0}
                      onClick={() => {
                        dispatch({
                          type: "cart/addCart",
                          payload: {
                            product_id: item.id,
                            quantity: item.installments > 0 ? 1 : 0,
                            product: item,
                            size: size,
                          },
                        });
                        item.installments === 0
                          ? message.error("库存不足")
                          : message.success("添加成功");
                      }}
                      block
                    >
                      {size}
                      {console.log(item.installments,'库存')}
                    </Button>   
                  </List.Item>
                )}
              />
            }
            title="选择你的尺码"
            trigger="click"
          >
            <button
              disabled={item.installments === 0}
              className="contentBtn"
            >
              Add to Car
            </button>
          </Popover>
        </Card>
      </Col>
    )
  })
  

  return (
    <Fragment>
      <Header />
     {
      load ? 
      (  <div className='loading'>
          <Spin size="large" />
         </div>) : shopList  
    } 
    </Fragment>
  );
};

const mapStateToProps = ({ products,cart }) => ({
  products: products.data,
  cartData: cart.data
});

export default connect(mapStateToProps)(Products);
