import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/utils/PrivateRoute";
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import { auth } from "./firebase";
import AuthScreen from "./screens/AuthScreen";
import BoardScreen from "./screens/BoardScreen";
import BoardsScreen from "./screens/BoardsScreens";
import { fetchBoards } from "./slices/BoardsSlice";
import { fetchUserInfo } from "./slices/userSlice";
import AppLoader from "./components/layout/AppLoader";

export default function App() {
  const dispatch = useDispatch();
  const { loading, boards, areBoardsFetch } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(fetchUserInfo(user?.uid));
      if (!areBoardsFetch) {
        dispatch(fetchBoards(user?.uid));
      }
    });

    return () => unSub();
  }, []);

  if (loading) return <AppLoader />;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<PublicOnlyRoute Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateRoute Component={BoardsScreen} />}
          />
          <Route
            path="/:boardId"
            element={<PrivateRoute Component={BoardScreen} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
