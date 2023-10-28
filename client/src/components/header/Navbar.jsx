import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  // console.log(account);

  const history = useNavigate("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);

  const { products } = useSelector((state) => state.getProductsdata);

  const [dropen, seDropen] = useState(false);

  const getAccount = async () => {
    const res = await fetch(`/validuser`, {
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
      setAccount(data);
    }
  };

  const handleOpen = () => {
    seDropen(true);
  };

  const handleDrawerClose = () => {
    seDropen(false);
  };

  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data2 = await res2.json();

    if (res2.status !== 201) {
      console.log("No data found");
    } else {
      console.log("user logout");
      toast.success("Successfully logged out", {
        position: "top-center",
      });
      setAccount(false);
      history("/");
    }
  };

  const getText = (items) => {
    setText(items);
    setLiopen(false);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Drawer open={dropen} userlog={handleDrawerClose}>
            <Rightheader logclose={handleDrawerClose} userlog={logoutuser}/>
          </Drawer>
          <div className="navlogo">
            <NavLink to={"/"}>
              <img src="./amazon_PNG25.png" about="amazon logo" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search..."
              id=""
            />
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product._id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          {account ? (
            <div className="nav_btn" style={{ display: "none" }}>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          ) : (
            <div className="nav_btn">
              <NavLink to="/login">Sign in</NavLink>
            </div>
          )}
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts?.length} color="primary">
                  <ShoppingCart id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={account.carts?.length} color="primary">
                  <ShoppingCart id="icon" />
                </Badge>
              </NavLink>
            )}

            <ToastContainer />

            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} style={{ margin: 10 }}>
              My Account
            </MenuItem>
            {account ? (
              <MenuItem
                onClick={handleClose}
                style={{ margin: 10 }}
                onClick={logoutuser}
              >
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
