import { getProductsreducer } from "./productsreducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  getProductsdata : getProductsreducer,
});

export default rootReducer;
