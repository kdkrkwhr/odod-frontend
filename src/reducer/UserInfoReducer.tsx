import { createSlice } from "@reduxjs/toolkit";

export type UserInfoState = {
  token: string | null;
};

const initialState: UserInfoState = {
  token: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
  },
});

export default userInfoSlice.reducer;

export const { updateUserInfo } = userInfoSlice.actions;
