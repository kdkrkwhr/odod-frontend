// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import counter, { CounterState } from "../reducer/CounterReducer";
import userInfo, { UserInfoState } from "../reducer/UserInfoReducer";

export type RootReducerType = {
  counter: CounterState;
  userInfo: UserInfoState;
};
const rootReducer = combineReducers<RootReducerType>({ counter, userInfo });

// 컴포넌트에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
