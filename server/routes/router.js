import express from "express";
import { Router } from "express";
import bcrypt from "bcryptjs";
import Products from "../models/productsSchema.js";
import User from "../models/userSchema.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/getproducts", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//get individual product

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// register

router.post("/register", async (req, res) => {
  const { name, email, mobile, password, cpassword } = req.body;
  if (!name || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ message: "please fill all the fields" });
  }
  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      return res.status(422).json({ message: "email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ message: "password not match" });
    } else {
      const user = new User({ name, email, mobile, password, cpassword });

      const stordata = await user.save();
      console.log(stordata);
      res.status(201).json({ stordata, message: "user register successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

//login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ message: "please fill all the fields" });
  }
  try {
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      // console.log(isMatch);

      const token = await userlogin.generatAuthtoken();
      // console.log(token);
      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 1296000000), // 15 days =  ms
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "invalid credentials password" });
      } else {
        res.status(200).json(userlogin);
      }
    } else {
      res.status(400).json({ message: "invalid credentials email" });
    }
  } catch (error) {
    console.log(error);
  }
});

//add to cart

router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findById(id);
    console.log(cart + "cart");

    const userContact = await User.findOne({ _id: req.userID });
    console.log(userContact);

    if (userContact) {
      const cartData = await userContact.addcartdata(cart);
      await userContact.save();
      console.log(cartData);
      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
    console.log(error);
  }
});

//get cart data

router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await User.findOne({ _id: req.userID });
    // console.log(buyuser);
    res.status(201).json(buyuser);
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
    console.log(error);
  }
});

//valid user

router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await User.findOne({ _id: req.userID });
    // console.log(validuserone);
    res.status(201).json(validuserone);
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
    console.log(error);
  }
});

//remove item from cart

router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((e) => {
      return e._id != id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item removed");
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
    console.log(error);
  }
});

//logout

router.get("/logout", authenticate, (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("Amazonweb", { path: "/" });
    res.status(201).json(req.rootUser.tokens);
    console.log("User logout");
  } catch (error) {
    console.log(error);
  }
});

export default router;
