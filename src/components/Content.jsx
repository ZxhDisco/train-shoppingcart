import React, { useEffect, Fragment } from "react";
import { Card, Popover, Button, Col, List, message } from "antd";
import Header from "./Header";
import "../App.css";
import { connect } from "dva";
import cart from "../models/cart";


const { Meta } = Card;

const Products = ({ dispatch, products }) => {
  useEffect(() => {
    dispatch({
      type: "products/fetch",
      payload: {},
    });
  }, []);

  useEffect(()=>{
    dispatch({
      type: "products/fetch",
      payload:{}
    });
  },[cart])

  useEffect(()=> {
    if(window.localStorage.data){
      dispatch({type:"cart/setStorage"})
    }else{
      return null
    }
  },[])

  return (
    <Fragment>
      <Header count={products.length} />
      {products.map((item, index) => {
        return (
          <Col
            xs={20}
            sm={10}
            md={7}
            lg={5}
            key={item.id}
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
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = ({ products }) => ({
  products: products.data,
});

export default connect(mapStateToProps)(Products);
