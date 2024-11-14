import { createSlice } from "@reduxjs/toolkit";

const savedState = JSON.parse(localStorage.getItem("cartState")) || {
  cartItems: [],
  countOfAllCartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: savedState,
  reducers: {
    addItems: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (index !== -1) {
        state.countOfAllCartItems[index]++;
      } else {
        state.cartItems.push(action.payload);
        state.countOfAllCartItems.push(1);
      }
      saveStateToLocalStorage(state);
    },
    removeItems: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (index !== -1) {
        if (state.countOfAllCartItems[index] > 1) {
          state.countOfAllCartItems[index]--;
        } else {
          state.cartItems.splice(index, 1);
          state.countOfAllCartItems.splice(index, 1);
        }
        saveStateToLocalStorage(state);
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
      state.countOfAllCartItems = [];
      saveStateToLocalStorage(state);
    },
  },
});

const saveStateToLocalStorage = (state) => {
  localStorage.setItem("cartState", JSON.stringify(state));
};

export const { addItems, removeItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
