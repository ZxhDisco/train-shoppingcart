import React from "react";
import { connect } from "dva";
import { Menu } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import  "../App.css";


const { SubMenu } = Menu;

const Header = ({ dispatch, products,staticData }) => {
  const sizeList = ['S','M','L','XL','XXL']
  const sortGoods = async (key) => {
    await dispatch({
      type: "products/sortDatas",
      payload: {
        product: products,
        key,
        bol:false
      },
    });
  };
  const sortBySize = async(key) => {
    await dispatch({
      type: "products/sortDatas",
      payload: {
        product: staticData,
        key,
        bol:true
      },
    })
  }
  return (
    <div className="header">
      <span className="headerLeft">
        <span style={{color:"red",fontWeight:"500"}}>{products.length}</span> Products found
        </span>

      <span className="headerRight">
        <Menu theme="light" mode="horizontal">
          <SubMenu 
            title="Specified Size"
            style={{ color: "#000", fontSize: "18px" }}
          >
            {sizeList.map((item) => (<Menu.Item key={item + '*'} onClick={() => sortBySize(`${item}`)} >{item}</Menu.Item>))}
          </SubMenu>
          <SubMenu
            icon={<ProjectOutlined />}
            style={{ color: "#000", fontSize: "18px" }}
            title="Order by"
          >
            <Menu.Item key="setting:1" onClick={() => sortGoods("")}>
              默认
            </Menu.Item>
            <Menu.Item key="setting:2" onClick={() => sortGoods("asc")}>
              价格升序
            </Menu.Item>
            <Menu.Item key="setting:3" onClick={() => sortGoods("desc")}>
              价格降序
            </Menu.Item>
          </SubMenu>
        </Menu>
      </span>
    </div>
  );
};

const mapStateToProps = ({ products }) => ({
  products: products.data,
  staticData: products.shopData
});

export default connect(mapStateToProps)(Header);
