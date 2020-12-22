import React from "react";
import { Row } from "antd";
import 'antd/dist/antd.css';
import Cart from "./components/Cart";
import Contents from "./components/Content";



function IndexPage() {
  return (
    <>
      <Cart />
      <Row type="flex" justify="space-around" style={{ margin: "90px 45px 0" }}>
        <Contents />
      </Row>
    </>
  );
}

export default IndexPage;
