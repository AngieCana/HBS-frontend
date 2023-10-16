import { createContext, useReducer } from "react";

export const Store = createContext();
//need to use react context to pass data down to different parts of the React DOM tree

//this is how the cart will start out if nothing has been clicked yet
const initialState = {
  cart: {
    cartItems:localStorage.getItem('cartItems')// Attempt to retrieve 'cartItems' from localStorage
    ? JSON.parse(localStorage.getItem('cartItems'))// If it exists, parse it as JSON
    : [], // If it doesn't exist in localStorage, set it to an empty array
    //initalState is an object that represents initial state of the applications. There is an object called cart which represents a cart state.
  },
};

function reducer(state, action) {
  // a function that takes two parameters, state and action. a switch case is used to check the action type
  switch (action.type) {
    case "CART_ADD_ITEM":
      // Add to cart, keeps previous values in cart
      const newItem = action.payload; //payload property is stored inside of newItem
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id); //existItem is assigned to the state parameter and passes through cart and cartItems, which triggers the find method to pass item as a parameter to find the _id of each item and then see if it is strictly equal to newItem._id 
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];// a variable that checks existItem as a condition and then pulls the state of cartItems and maps through item to get the item_id and see if it is strictly equal to existItem_id. If will run newItem if the condition is truthy, and it will run item if the condition is falsy. 
        //if existItem is falsy, then a copy of state is created that contains cart and the cartItems and returns newItem. 
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        //this tells localStorage to run a method called setItem and then assign a string(key) called "cartItems" to it, it also turns the variable cartItems into a JSON string 
        return {...state, cart: {...state.cart, cartItems}};
        //a copy of the state is returned along with the cart object and a copy of the cart's state, along with cartItems
      case "CART_REMOVE_ITEM": {
        const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id)
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return {...state, cart: {...state.cart, cartItems}}
      }
    default:
      return state;
      //if none of the cases are correct, state is returned as a default
  }
}

export function StoreProvider(props) {
  //exporting a function called StoreProvider that passes props through it. 
  const [state, dispatch] = useReducer(reducer, initialState);
  //state is assigned as a a variable and dispatch as a function, which is used by the UseReducer function which also passes reducer and initialstate as arguments.
  const value = { state, dispatch };
  //value is assigned to an object that holds the current state and dispatch. 
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
  //returning an element "Store.Provider", which has a value of value and passes {props.children} inside of it. 
}
