import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, productReducer, addProductReducer } from "./Reducers";

const Cart = createContext();


const Context = ({ children }) => {


  const products = JSON.parse(localStorage.getItem('productData')) || [];

  

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [product, addProductDispatch] = useReducer(addProductReducer, {
    products: products
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch, addProductDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
