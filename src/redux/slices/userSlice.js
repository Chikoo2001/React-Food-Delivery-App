import { createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase.config";

const initialState = {
  userInfo: null,
  cartItems: [],
};

async function setDatabase(state) {
  try {
    await setDoc(doc(cartsRef, state.userInfo.uid), {
      cartItems: [...state.cartItems],
    });
  } catch(error) {
    console.log(error);
  }
}

const cartsRef = collection(firestore, "carts");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (present) {
        present.qty += 1;
      } else {
        const newItem = { ...action.payload};
        state.cartItems.push(newItem);
      }
      setDatabase(state);
    },
    increaseQuantity: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload
      );
      present.qty += 1;
      setDatabase(state);
    },
    decreaseQuantity: (state, action) => {
      const present = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (present.qty > 1) {
        present.qty -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      setDatabase(state);
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartAmount = 0;
      state.cartQuantity = 0;
      setDatabase(state);
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
      state.cartItems = [];
    },
    addFromDb: (state, action) => {
      state.cartItems.push(action.payload)
    } 
  }
});

export const {
  addToCart,
  decreaseQuantity,
  emptyCart,
  increaseQuantity,
  setUser,
  removeUser,
  addFromDb
} = userSlice.actions;

export default userSlice.reducer;
