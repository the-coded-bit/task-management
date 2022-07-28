import { createSlice } from '@reduxjs/toolkit'
import { nav_options } from '../../constants';

const initialState = {
    // activeOption variable will maintain the current clicked option from navbar
    activeOption: nav_options.PROJECTS,
    // allOptions variable will maintain the list of all availaible options
    allOptions : [nav_options.OVERVIEW, nav_options.STATS, nav_options.PROJECTS, nav_options.CHAT, nav_options.CALENDAR]
}

const navSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveOption : (state, action) => {state.activeOption = action.payload}
  }
});

export const {setActiveOption} = navSlice.actions;

export default navSlice.reducer;