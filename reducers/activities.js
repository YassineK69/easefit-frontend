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
    addPicture :(state,action) =>{
      const i = state.value.findIndex(obj=>obj._id === action.payload.idActivity);
      state.value[i].activitiesPic.push(action.payload.activityPic);
    }
  },
});

export const {addNewActivity, loadActivities, addPicture } = activitiesSlice.actions;
export default activitiesSlice.reducer;