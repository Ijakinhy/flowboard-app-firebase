import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Chip, Dialog, Stack, Typography } from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { shiftTask } from "../../slices/boardDataSlice";
import { showMessage } from "../../slices/BoardsSlice";

const statusMap = {
  toDos: "ToDos",
  inProgress: "In Progress",
  completed: "Completed",
};

const ShiftTaskModal = ({ close, task }) => {
  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.boardData);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const handleShiftTask = () => {
    if (taskStatus == task.status) {
      dispatch(showMessage("No change in status"));
      return;
    } else {
      dispatch(
        shiftTask({
          status: taskStatus.toLowerCase(),
          task,
          uid,
          boardId,
          data,
        })
      );
      close();
      dispatch(showMessage("Board Updated"));
    }
  };

  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift task" onClose={close} />
        <Stack spacing={1}>
          <Typography>Task :</Typography>
          <Typography sx={{ bgcolor: "#45474e", p: 1 }}>{task.text}</Typography>
        </Stack>

        <Stack spacing={2} my={2}>
          <Typography>Status :</Typography>
          <Stack direction="row" spacing={1}>
            {Object.keys(statusMap).map((status) => (
              <Chip
                onClick={() => setTaskStatus(status)}
                variant={taskStatus === status ? "filled" : "outlined"}
                label={statusMap[status]}
                key={status}
              />
            ))}
          </Stack>
        </Stack>
        <Button variant="contained" onClick={handleShiftTask}>
          Shift Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;
