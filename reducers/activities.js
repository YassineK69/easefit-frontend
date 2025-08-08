import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addNewActivity: (state, action) => {
        state.value.push(action.payload);
    }, 
    loadActivities : (state, action) => {
        state.value = action.payload;
    }, 
  },
});

export const {addNewActivity, loadActivities} = activitiesSlice.actions;
export default activitiesSlice.reducer;