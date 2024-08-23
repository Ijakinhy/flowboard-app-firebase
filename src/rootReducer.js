import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import boardListSlice from "./slices/BoardsSlice";
import boardDataSlice from "./slices/boardDataSlice";

const rootReducer = combineReducers({
  user: userSlice,
  boards: boardListSlice,
  boardData: boardDataSlice,
});

export default rootReducer;
