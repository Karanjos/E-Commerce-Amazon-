import { useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import { CircularProgress, Divider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/ContextProvider.jsx";

const Cart = () => {
  const { id } = useParams("");
  const history = useNavigate("");

  const { account, setAccount } = useContext(LoginContext);

  const [inddata, setIndedata] = useState("");
  console.log(inddata);

  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      console.log("No data found");
    } else {
      setIndedata(data);
    }
  };

  useEffect(() => {
    setTimeout(getinddata, 200);
  }, [id]);

  //add cart function

  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inddata,
      }),
      credentials: "include",
    });

    const data1 = await checkres.json();
    console.log(data1);

    if (checkres.status === 401 || !data1) {
      console.log("user Invalid");
      alert("user invalid");
    } else {
      history("/buynow");
      setAccount(data1);
    }
  };

  return (
    <div className="cart_section">
      {/* <div className="cart_container">
        <div className="left_cart">
          <img
            src="https://m.media-amazon.com/images/I/51DGcy8eBCL._AC_UY327_FMwebp_QL65_.jpg"
            alt="cartimage"
          />
          <div className="cart_btn">
            <button className="cart_btn1">Add to Cart</button>
            <button className="cart_btn2"> Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>Fitness Gear</h3>
          <h4>Pigeon favourite electric kettle(1.5L, silver, Black)</h4>
          <Divider />
          <p className="mrp">M.R.P. : $1195.00</p>
          <p>
            Deal of the day : <span style={{ color: "#B12704" }}>$625.00</span>
          </p>
          <p>
            You save : <span style={{ color: "#B12704" }}>$570.00(47%)</span>
          </p>
          <div className="discount_box">
            <h5>
              discount : <span style={{ color: "#111" }}>Extra 10% Off</span>
            </h5>
            <h4>
              Free Delivery :{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>
                Nov 8 - 23
              </span>{" "}
              Details
            </h4>
            <p>
              Fastest Delivery :{" "}
              <span style={{ color: "#111", fontWeight: "600" }}>
                Tomorrow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the Item :{" "}
            <span
              style={{
                color: "#565959",
                fontSize: "14",
                fontWeight: "600",
                letterSpacing: "0.4px",
              }}
            >
              Recommended date formats are given below, but these can be varied
              if there is contrary consensus on the talk page. In biographies,
              distinguish between dates defining a lifespan
              "(birthyear–deathyear)" and those defining a period in office
              "from startyear to endyear".
            </span>
          </p>
        </div>
      </div> */}
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="cart" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata._id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>₹{inddata.price.cost}.00</span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount}){" "}
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>{" "}
              </h5>
              <h4>
                FREE Delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>{" "}
                Details
              </h4>
              <p style={{ color: "#111" }}>
                Fastest delivery:{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  {" "}
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Iteam :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      )}
      {!inddata ? (
        <div
          style={{
            fontWeight: "700",
            fontSize: "2rem",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <h2
            style={{
              marginLeft: "25px",
              fontWeight: "700",
              fontFamily: "sans-serif",
            }}
          >
            Loding...
          </h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Cart;
