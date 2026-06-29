import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "./Slicer";
const store = configureStore({
  reducer: {
    product: productSlicer,
  },
});

export default store;
