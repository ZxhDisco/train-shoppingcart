import React from "react";
import { connect } from "dva";
import { Menu } from "antd";
import { ProjectOutlined } from "@ant-design/icons";
import  "../App.css";


const { SubMenu } = Menu;

const Header = ({ count, dispatch, products }) => {
  const sortGoods = async (key) => {
    await dispatch({
      type: "products/sortDatas",
      payload: {
        product: products,
        key,
      },
    });
  };
  return (
    <div className="header">
      <span className="headerLeft">{count} Products found</span>

      <span className="headerRight">
        <Menu theme="light" mode="horizontal">
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
});

export default connect(mapStateToProps)(Header);
