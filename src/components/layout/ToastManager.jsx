import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../slices/BoardsSlice";

const ToastManager = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.boards);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message}
      onClose={() => dispatch(showMessage(""))}
      message={message}
      autoHideDuration={3000}
    />
  );
};

export default ToastManager;
