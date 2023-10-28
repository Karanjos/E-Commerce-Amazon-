import { NavLink } from "react-router-dom";
import "./signup.css";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const Signin = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useContext(LoginContext);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      toast.warn("Invalid Credentials", {
        position: "top-center",
      });
      console.log("Invalid Credentials");
    } else {
      toast.success("Login Successfull", {
        position: "top-center",
      });

      setAccount(data);
      console.log("Login Successfull");
      setData({ ...logdata, email: "", password: "" });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="logo" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={adddata}
                value={logdata.email}
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={adddata}
                value={logdata.password}
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New To Amazon</p>
          <NavLink to="/register">
            <button className="create_btn">Create Your Amazon Account</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};
export default Signin;
