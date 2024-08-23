import {
  Button,
  Chip,
  Dialog,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalHeader from "../../components/layout/ModalHeader";
import { showMessage } from "../../slices/BoardsSlice";
import { updateBoardData } from "../../slices/boardDataSlice";

const AddTaskModal = ({ tabName, setAddTaskTo, taskTab }) => {
  const [text, setText] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { loading, AreBoardDataFetched } = useSelector(
    (state) => state.boardData
  );

  const dispatch = useDispatch();
  const boardId = useParams();
  // const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
  const handleAddTask = async () => {
    if (!text.trim()) return dispatch(showMessage("task should have name"));
    try {
      // await sleep();1
      dispatch(
        updateBoardData({
          uid: currentUser?.uid,
          boardId: boardId.boardId,
          tabName: taskTab,
          text: text,
        })
      );

      dispatch(showMessage("new task added"));
    } catch (error) {
      dispatch(showMessage("error task not added"));
    }
  };

  const handleChange = useCallback((e) => setText(e.target.value), []);

  return (
    <Dialog open onClose={() => setAddTaskTo("")} fullWidth maxWidth="xs">
      <Stack p={2} spacing={2}>
        <ModalHeader title="Add Task" onClose={() => setAddTaskTo("")} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Status: </Typography>
          <Chip size="small" label={tabName} />
        </Stack>
        <OutlinedInput
          placeholder="add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button disabled={loading} onClick={handleAddTask} variant="contained">
          Add Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default memo(AddTaskModal);
