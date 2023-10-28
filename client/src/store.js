//creating a store for redux
// Path: client/src/store.js
import { createStore, applyMiddleware , compose} from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension"; 
import rootReducer from "./components/redux/reducer/main";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);

export default store;
