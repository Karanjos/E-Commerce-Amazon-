import { NavLink } from "react-router-dom";
import "./signup.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [udata, setUdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, cpassword } = udata;

    if (!name || !email || !mobile || !password || !cpassword) {
      toast.warn("please fill all the fields", {
        position: "top-center",
      });
      
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, password, cpassword }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.warn("Invalid Registration", {
        position: "top-center",
      });
      console.log("Invalid Registration");
    } else {
      toast.success("Registration Successfull", {
        position: "top-center",
      });
      console.log("Registration Successfull");

      setUdata({
        ...udata,
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
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
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label htmlFor="name">Your Name</label>
              <input
                onChange={adddata}
                value={udata.name}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                onChange={adddata}
                value={udata.email}
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                onChange={adddata}
                value={udata.mobile}
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter your number"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                onChange={adddata}
                value={udata.password}
                type="password"
                id="password"
                name="password"
                placeholder="Atleast 6 characters"
              />
            </div>
            <div className="form_data">
              <label htmlFor="passwordAgain">Password Again</label>
              <input
                onChange={adddata}
                value={udata.passwordAgain}
                type="cpassword"
                id="cpassword"
                name="cpassword"
                placeholder="Enter your password again"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
            <div className="signin_info">
              <p>Already have an account</p>
              <NavLink to="/login">Signin</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};
export default Signup;
