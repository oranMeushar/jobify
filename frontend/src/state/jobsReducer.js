import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobsList:[]
}

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobsList = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {
    setJobs,
} = jobSlice.actions

export default jobSlice.reducer