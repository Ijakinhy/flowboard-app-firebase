import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  boards: [],
  areBoardsFetch: false,
  loading: true,
  massage: "",
  boardData: [],
  areBoardDataFetch: false,
  // createdAt: null,
};
// create Board
export const createBoard = createAsyncThunk(
  "user/createBoard`",

  async (payload) => {
    const { name, color, uid } = payload;
    const colRef = collection(db, `users/${uid}/boards`);
    try {
      const res = await addDoc(colRef, {
        id: `${name}-${Date.now()}`,
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
      });

      const docRef = doc(db, `users/${uid}/boards/${res.id}`);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return { ...docSnapshot.data(), id: res.id };
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);
// fetch Boards
export const fetchBoards = createAsyncThunk(
  "users/fetchBoards",
  async (uid) => {
    const boardsColRef = collection(db, `users/${uid}/boards`);

    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));

      const docSnap = await getDocs(q);

      const boards = docSnap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

      boards.sort((a, b) => b.createdAt - a.createdAt);
      const sortedBoards = boards.map((board) => ({
        ...board,
        createdAt: new Date(board.createdAt)?.toLocaleString(),
      }));

      return sortedBoards;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

// delete board

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (payload) => {
    try {
      const { boardId, boards, uid } = payload;
      const boardRef = doc(db, `users/${uid}/boards/${boardId}`);

      await deleteDoc(boardRef);
      const newBoards = boards.filter((board) => board.id !== boardId);

      return newBoards;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

// boardListSlice
export const boardListSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        return {
          ...state,
          boards: action.payload,
          areBoardsFetch: true,
          loading: false,
        };
      })
      .addCase(fetchBoards.rejected, (state) => {
        return {
          ...state,
          areBoardsFetch: false,
          loading: false,
        };
      })
      .addCase(createBoard.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          massage: "New Board Created",
          boards: [action.payload, ...state.boards],
        };
      })
      .addCase(createBoard.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(deleteBoard.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        return { ...state, loading: false, boards: action.payload };
      })
      .addCase(deleteBoard.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});

export const { showMessage } = boardListSlice.actions;

export default boardListSlice.reducer;
