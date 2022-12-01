import { createSlice } from '@reduxjs/toolkit'

//initialize initialState of addUserReducer is an object
//including:
//{userId: "", userToken: "", username: "", userEmail: "", userPassword: '', userProfilePicture: uri:""}
const initialState = {
    user: {}
};

export const addUserSlice = createSlice({
    name: 'ADD_USER',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = {...state.user, ...action.payload}
            console.log("user who has logged in is",state.user)
        }
    }
})

export const { addUser } = addUserSlice.actions

//export userInformationSelector
export const selectUser = (state) => state.ADD_USER.user

export default addUserSlice.reducer




