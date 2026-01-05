import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "modules",
  initialState: {
    enabled: [],
  },
  reducers: {
    setEnabledModules(state, action) {
      state.enabled = action.payload;
    },
  },
});

export const { setEnabledModules } = moduleSlice.actions;
export default moduleSlice.reducer;
