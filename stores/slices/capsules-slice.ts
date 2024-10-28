import { Capsule } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CapsulesState {
  capsules: Array<Capsule>;
}

const initialState: CapsulesState = {
  capsules: [],
};

const capsulesSlice = createSlice({
  name: "capsules",
  initialState,
  reducers: {
    setCapsules(state: CapsulesState, action: PayloadAction<Capsule[]>) {
      state.capsules = action.payload;
    },
    addCapsule(state: CapsulesState, action: PayloadAction<Capsule>) {
      state.capsules.unshift(action.payload);
    },
    updateCapsule(state: CapsulesState, action: PayloadAction<Capsule>) {
      state.capsules = state.capsules.map((capsule) => {
        if (capsule.id === action.payload.id) return action.payload;
        return capsule;
      });
    },
  },
});

export const { setCapsules, addCapsule, updateCapsule } = capsulesSlice.actions;
export default capsulesSlice.reducer;
