import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  loading: true,
  currentUser: null,
  isLoggedIn: false,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (uid) => {
    try {
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      console.log(docSnap.data());

      return docSnap?.data();
    } catch (error) {
      console.log(error.message);
      // throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        return {
          ...state,
          currentUser: action.payload,
          loading: false,
          isLoggedIn: true,
        };
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});

export const { changeLoginStatus } = userSlice.actions;
export default userSlice.reducer;
