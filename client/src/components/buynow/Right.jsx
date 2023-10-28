import { useEffect, useState } from "react";

const Right = ({ items }) => {
  const [price, setprice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [items]);

  const totalAmount = () => {
    let price = 0;
    items.map((item) => {
      price += item.price.cost;
    });
    setprice(price);
  };

  return (
    <div className="right_buy">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="rightimg"
      />
      <div className="cost_right">
        <p>Your order is eligible for Free Delivery.</p> <br />
        <span style={{ color: "#565959" }}>
          Select this option at checkout. Details
        </span>
        <h3>
          Subtotal ({items?.length} Item) :{" "}
          <span style={{ fontWeight: "700", color: "#111" }}>${price}.00</span>
        </h3>
        <button className="rightbuy_btn">Proceed to Buy</button>
        <div className="emi">EMI available</div>
      </div>
    </div>
  );
};
export default Right;
