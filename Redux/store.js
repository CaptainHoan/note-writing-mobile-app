import { configureStore } from '@reduxjs/toolkit'
import addUserReducer from './addUserSlice'
import addNoteReducer from './addNoteSlice'

export default configureStore({
  reducer: {
    ADD_USER: addUserReducer,
    ADD_NOTE: addNoteReducer
  },
})