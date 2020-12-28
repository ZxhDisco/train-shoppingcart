import React, { useState,useEffect } from "react";
import { Drawer, List, Image, message, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../App.css";
import 'antd/dist/antd.css';

import { connect } from "dva";

const Cart = ({ cart, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(true)
  const [resize, setReSize] =useState(1000)
  
  const total = cart
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    window.addEventListener('resize',function(){
      setReSize(document.documentElement.clientWidth);
    })
  }, [document.documentElement.clientWidth])

  useEffect(()=> {
    if(window.localStorage.data){
      dispatch({type:"cart/setStorage"})
    }
  },[])

  return (
    <>
      <button className="cartBtn" onClick={showDrawer}>
        <ShoppingCartOutlined /><span className="showCount">{cart.length}</span>
      </button>
      <div >
        <Drawer
          title={
            <div >
              <div className="iconCart">
                <ShoppingCartOutlined />
                <div className={visible ? "countCart" : ""}>
                  {cart.length}
                </div>
              </div>
              
              <div className="titleCart">
                Cart
              </div>
            </div>
          }
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={resize>850 ? '35%':'75%'}
          footer={
            <div style={{ height: "100px", position: "relative" }}>
              <span className="totalTitle">Total: </span>
              <span className="totalNum">$ {total}</span>
              <br />
              <button
                onClick={() => {
                  if(check){
                    message.warn(`合计${total},再次点击即可结算`)
                    setCheck(false)
                    return
                  }else {
                    dispatch({
                      type: "cart/checkout",
                    })
                    setCheck(true)
                  }
                   
                }
                  
                }
                disabled={cart.length === 0}
                className="checkBtn"
              >
                Check Out
              </button>
            </div>
          }
          headerStyle={{ textAlign: "center", backgroundColor: "#1b1a20" }}
          bodyStyle={{ backgroundColor: "#1b1a20" }}
          footerStyle={{ backgroundColor: "#1b1a20", color: "#fff" }}
        >
          {cart.length === 0 ? (
            <h1 style={{ color: "#fff" }}>Your Shopping-Cart is empty!</h1>
          ) : (
            <Row>
              <List
                itemLayout="horizontal"
                dataSource={cart}
                renderItem={(item, index) => (                 
                  <List.Item key={item.sku}>
                    <Col xs={5}>
                      <Image
                          src={`./img/${item.product.sku}_1.jpg`}
                        />
                    </Col>
                    <Col xs={12} className="detail">
                      {item.product.title}
                      <br />
                      <span>
                        {item.size} | {item.product.description}
                      </span>
                      <br />
                      <span>quantity: {item.quantity}</span>
                    </Col>
                    <Col xs={5}>
                      <button
                        className="btnDel"
                        onClick={() => {
                          dispatch({
                            type: "cart/removeCart",
                            payload: {
                              index: index,
                              quantity:item.quantity
                            },
                          });
                        }}
                      >
                        X
                      </button>
                      <p className="goodsPrice">${item.product.price}</p>
                      <p>
                        <button
                          className="btnDecrement"
                          onClick={() => {
                            dispatch({
                              type: "cart/decreaseNum",
                              payload: {
                                id: item.id,
                                size: item.size,
                                key: -1,
                              },
                            });
                          }}
                        >
                          -
                        </button>
                        <button
                          className="btnIncrement"
                          onClick={() => {
                            dispatch({
                              type: "cart/increaseNum",
                              payload: {
                                id: item.id,
                                size: item.size,
                                key: 1,
                              },
                            });
                          }}
                        >
                          +
                        </button>
                      </p>
                    </Col>
                  </List.Item>
                )}
              />
            </Row>
          )}
        </Drawer>
      </div>
    </>
  );
};

const mapStateToProps = ({ cart }) => ({
  cart: cart.data,
});
export default connect(mapStateToProps)(Cart);
