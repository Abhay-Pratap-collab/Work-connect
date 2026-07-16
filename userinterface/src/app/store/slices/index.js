import { configureStore } from "@reduxjs/toolkit";
import productSlicer from "./Slicer";
import userSlicer from "./userSlicer"
const store = configureStore({
  reducer: {
    product: productSlicer,
    users:userSlicer,
  },
});

export default store;
