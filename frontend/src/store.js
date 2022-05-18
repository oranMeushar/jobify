import { configureStore } from '@reduxjs/toolkit'
import authReducer from './state/authReducer';
import jobsReducer from './state/jobsReducer';
export const store = configureStore({
  reducer: {
    auth:authReducer,
    jobs:jobsReducer
  },
})