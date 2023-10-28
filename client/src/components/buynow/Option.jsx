import { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deleteItem, get }) => {
  const { account, setAccount } = useContext(LoginContext);

  const removeItem = async (req, res) => {
    try {
      const res = await fetch(`/remove/${deleteItem}`, {
        method: "DELETE",
        headers: {
          Application: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (res.status !== 201) {
        console.log("Item not deleted");
      } else {
        console.log("Item deleted");
        setAccount(data);
        toast.success("Item deleted", {
          position: "top-center",
        });
        get();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeItem(deleteItem)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: "pointer" }}>
        Save or Later
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: "pointer" }}>
        See More like this
      </p>
      <ToastContainer />
    </div>
  );
};
export default Option;
