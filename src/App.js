import React from "react";
import 'antd/dist/antd.css';
import Header from "./components/Header";
import Cart from "./components/Cart";
import Contents from "./components/Content";



function IndexPage() {
  return (
    <>
      <Cart />
      <Header/>
      <Contents />
    </>
  );
}

export default IndexPage;
