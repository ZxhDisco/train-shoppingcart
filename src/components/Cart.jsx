import React, { useState,useEffect } from "react";
import { Drawer, List, Image, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../App.css";
import 'antd/dist/antd.css';

import { connect } from "dva";

const Cart = ({ cart, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(true)
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const total = cart
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

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
      <div className="cartDiv">
        <Drawer
          title={
            <div>
              <div className={visible ? "countCart" : ""}>
                {cart.length}
              </div>
              <span className="titleCart">
                <ShoppingCartOutlined />
                Cart
              </span>
            </div>
          }
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          width={"35%"}
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
            <div>
              <List
                itemLayout="horizontal"
                dataSource={cart}
                renderItem={(item, index) => (
                  <List.Item key={item.sku}>
                    <Image
                      src={`./img/${item.product.sku}_1.jpg`}
                      className="cartImg"
                    />
                    <div className="detail">
                      {item.product.title}
                      <br />
                      <span>
                        {item.size} | {item.product.description}
                      </span>
                      <br />
                      <span>quantity: {item.quantity}</span>
                    </div>
                    <div>
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
                    </div>
                  </List.Item>
                )}
              />
            </div>
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
