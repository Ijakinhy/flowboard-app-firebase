import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const initialState = {
  boardData: [],
  AreBoardDataFetched: false,
  lastUpdated: null,
  loading: true,
  data: null,
  massage: "",
};
// fetching the board Data
export const fetchBoard = createAsyncThunk(
  "user/boardData",
  async (payload) => {
    const { uid, boardId } = payload;
    try {
      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const boardData = docSnap.data();

        return boardData;
      } else return null;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const updateBoardData = createAsyncThunk(
  "boardData/updateBoardData",
  async (payload) => {
    const { uid, boardId, tabName, text } = payload;
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);

    try {
      await updateDoc(docRef, {
        lastUpdated: serverTimestamp(),
        [`tabs.${tabName}`]: arrayUnion({
          id: `${text}-${Date.now()}`,
          text,
        }),
      });

      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      } else {
        throw new Error("Document does not exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// delete task

export const handleDeleteTask = createAsyncThunk(
  "boardData/deleteTask",
  async (payload) => {
    const { id, data, boardId, uid, status } = payload;
    const dClone = structuredClone(data);
    try {
      const taskIndex = dClone[status].findIndex((tb) => tb.id === id);

      dClone[status].splice(taskIndex, 1);

      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, {
        tabs: dClone,
        lastUpdated: serverTimestamp(),
      });

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
///  drag and drop
export const handleDragEnd = createAsyncThunk(
  "boardData/handleDragEnd",
  async (payload) => {
    const { source, destination, uid, boardId, data } = payload;
    try {
      const dClone = structuredClone(data);
      /// remove task from the source
      const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
      /// add the remove task to  the destination

      dClone[destination.droppableId].splice(destination.index, 0, draggedTask);

      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, {
        tabs: dClone,
        lastUpdated: serverTimestamp(),
      });
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);
/// shift task
export const shiftTask = createAsyncThunk(
  "boardData/shiftTask",
  async (payload) => {
    const { status, task, uid, boardId, data } = payload;
    try {
      if (task.status === status) return;

      const dClone = structuredClone(data);

      // / remove task from the source
      const [taskShifted] = dClone[task.status.toLowerCase()].splice(
        task.index,
        1
      );

      // // /// add the remove task to  the destination
      dClone[status].unshift(taskShifted);

      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, {
        tabs: dClone,
        lastUpdated: serverTimestamp(),
      });
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

// slice
const boardDataSlice = createSlice({
  name: "boardData",
  initialState,
  reducers: {
    handleLastUpdated: () => {
      return {
        ...state,
        lastUpdated,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        return {
          ...state,
          boardData: action.payload,
          areBoardDataFetched: true,
          loading: false,

          lastUpdated: action.payload?.lastUpdated,
          data: action.payload?.tabs,
        };
      })
      .addCase(fetchBoard.rejected, (state) => {
        return { ...state, loading: false, areBoardDataFetched: false };
      })
      .addCase(updateBoardData.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(updateBoardData.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload?.tabs,
          boardData: action.payload,
          areBoardDataFetched: false,
          lastUpdated: action.payload?.lastUpdated,
        };
      })
      .addCase(updateBoardData.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(handleDeleteTask.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(handleDeleteTask.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload.tabs,
          lastUpdated: action.payload?.lastUpdated,
        };
      })
      .addCase(handleDeleteTask.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(handleDragEnd.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(handleDragEnd.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload?.tabs,
          lastUpdated: action.payload?.lastUpdated,
          message: "board updated",
        };
      })
      .addCase(handleDragEnd.rejected, (state) => {
        return { ...state, loading: false };
      })
      .addCase(shiftTask.pending, (state) => {
        return { ...state, loading: true };
      })
      .addCase(shiftTask.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          data: action.payload?.tabs,
          lastUpdated: action.payload?.lastUpdated,
          message: "board updated",
        };
      })
      .addCase(shiftTask.rejected, (state) => {
        return { ...state, loading: false };
      });
  },
});
export const { handleLastUpdated } = boardDataSlice.actions;
export default boardDataSlice.reducer;
