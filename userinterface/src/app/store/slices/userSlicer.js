import { createSlice } from "@reduxjs/toolkit";

const userSlicer=createSlice({
    name:'users',
    initialState:{
        
    },
   
    reducers:{
        addUser(state,action){
           state[action.payload[0]] = action.payload[1];
        //   console.log('dataaaa',action.payload);

        },
         updateAddress(state,action){
           state[action.payload[0]] = action.payload[1];
        //   console.log('dataaaa',action.payload);

        },
    
        
        removeUser(state,action){
            alert(action.payload)
             delete state[action.payload[0]]
        },
        clearUser(state,action){
         return {};
        }
    }
})
export default userSlicer.reducer
export const {addUser,removeUser,clearUser}=userSlicer.actions