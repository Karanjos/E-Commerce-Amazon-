import Footer from "./components/footer/Footer.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Maincomp from "./components/home/Maincomp.jsx";
import Newnav from "./components/newnav/Newnav.jsx";
import Signup from "./components/signup_signin/Signup.jsx";
import Signin from "./components/signup_signin/Signin.jsx";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart.jsx";
import Buynow from "./components/buynow/Buynow.jsx";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 200);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
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
            Loding......
          </h2>
        </div>
      )}
    </>
  );
}

export default App;
