import "./buynow.css";
import Option from "./Option";
import { Divider } from "@mui/material";
import Subtotal from "./Subtotal";
import Right from "./Right";
import { useEffect, useState } from "react";

const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata.carts);

  const getdatabuy = async () => {
    const res = await fetch(`/cartdetails`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status !== 201) {
      console.log("No data found");
    } else {
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);
  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all Items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartdata.map((e, k) => {
                return (
                  <>
                    <div className="item_container">
                      <img src={e.detailUrl} alt="" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="differentprice">$4049.00</h3>
                        <p className="unusuall">
                          Ususally dispatched in 8 days.
                        </p>
                        <p>Eligible for free shipping</p>
                        <img src="" alt="" />
                        <Option deleteItem = {e._id} get={getdatabuy}/>
                      </div>
                      <h3 className="item_price">${e.price.cost}.00</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

              <Subtotal items={cartdata} />
            </div>
            <Right items={cartdata} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Buynow;
