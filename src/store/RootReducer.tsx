// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import counter, { CounterState } from "../reducer/CounterReducer";

export type RootReducerType = {
  counter: CounterState;
};
const rootReducer = combineReducers<RootReducerType>({ counter });

// 컴포넌트에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
