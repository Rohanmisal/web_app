import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice(
    {
        name:'user',
        initialState: null,
        reducers:{
            addUser:(state, action) =>{
                return action.payload
            },
            removeUser:(state, action) =>{
                return null;
            },
            getUser: (state, action) =>{
                state.push(action.payload)
            },
    
            updateUser:(state, action) =>{
                const {id, name, email} = action.payload;
                const uu = state.find(user => user.id === id);
                if(uu){
                    uu.name = name;
                    uu.email = email;
                }
            },
            deleteUser: (state, action) =>{
                const {id} = action.payload;
                const uu = state.find(user => user.id === id);
                if (uu) {
                    return state.filter(f=> f.id !==id);
                }
            },
        }
    }
);
 
export const {addUser, removeUser, getUser,updateUser,deleteUser} = userSlice.actions;
export default userSlice.reducer