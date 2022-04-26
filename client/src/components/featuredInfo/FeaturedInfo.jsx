import "./featuredInfo.css";
import React from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Number Of Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">415</span>
          <span className="featuredMoneyRate">
            + 12 <ArrowUpward  className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Number Of Publications</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">4415</span>
          <span className="featuredMoneyRate">
            -14 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Number Of Suggestions</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">225</span>
          <span className="featuredMoneyRate">
            +24 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
