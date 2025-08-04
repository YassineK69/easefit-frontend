import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
  },
});

export const {} = activitiesSlice.actions;
export default activitiesSlice.reducer;