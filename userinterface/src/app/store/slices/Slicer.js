import { createSlice } from "@reduxjs/toolkit";

const productSlicer=createSlice({
    name:'product',
    initialState:{},
    reducers:{
        addProduct(state,action){
          state[action.payload[0]]=action.payload[1]
        //   console.log('dataaaa',action.payload);

        },
    
        
        removeProduct(state,action){
            alert(action.payload)
             delete state[action.payload[0]]
        },
        clearAllProducts(state,action){
         return {};
        }
    }
})
export default productSlicer.reducer
export const {addProduct,removeProduct,clearAllProducts}=productSlicer.actions