import React, { Component } from "react";
import FeatureProduct from "../components/FeatureProduct";
import HeroSlide from "../components/HeroSlide";
// import TopCollection from "../components/TopCollection";
import "../stylesheet/index.css";

export default class Index extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeroSlide />
        {/* <TopCollection /> */}
        <FeatureProduct />
      </div>
    );
  }
}
