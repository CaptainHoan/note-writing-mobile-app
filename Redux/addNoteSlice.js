import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    note: ''
}

export const addNoteSlice = createSlice({
    name: 'ADD_NOTE',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.note = action.payload
        }   
    }
})

export const {addNote} = addNoteSlice.actions

//export select note to pull data from reducers

export const selectNote = (state) => state.ADD_NOTE.note

export default addNoteSlice.reducer