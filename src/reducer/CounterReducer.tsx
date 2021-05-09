import { createSlice } from "@reduxjs/toolkit";

export type CounterState = {
  number: number;
  diff: number;
};

const initialState: CounterState = {
  number: 1,
  diff: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increase: (state) => ({ ...state, number: state.number + 1 }),
    decrease: (state) => ({ ...state, number: state.number - 1 }),
  },
});

export default counterSlice.reducer;

export const { increase, decrease } = counterSlice.actions;
