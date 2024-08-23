import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleDeleteTask } from "../../slices/boardDataSlice";
import { useCallback } from "react";
import { showMessage } from "../../slices/BoardsSlice";

const Task = ({ index, id, text, task, status, onClick }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.boardData);
  const { boardId } = useParams();
  const dispatch = useDispatch();

  const deleteTask1 = useCallback(() => {
    dispatch(
      handleDeleteTask({ id, data, boardId, uid: currentUser?.uid, status })
    );
    dispatch(showMessage("board Updated"));
  }, []);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={{
              border: "1px solid #777980",
              bgcolor: "#45474e",
              p: 1,
              width: "100%",
            }}
            {...(!!onClick ? { onClick: onClick } : {})}
          >
            {text}
          </Typography>
          <IconButton size="small" onClick={() => deleteTask1()}>
            <Delete />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;
