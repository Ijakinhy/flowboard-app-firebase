import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalHeader from "../../components/layout/ModalHeader";
import { createBoard, showMessage } from "../../slices/BoardsSlice";
import { colors } from "../../theme";
const CreateBoardMode = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.boards);

  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);
  const handleCreateBoard = async () => {
    try {
      if (!name.trim()) {
        dispatch(showMessage("Board name is required"));
      } else {
        dispatch(createBoard({ name, color, uid }));
        dispatch(showMessage("New Board created"));
        closeModal();
      }
    } catch (error) {
      dispatch(showMessage("error happens "));
      throw error;
    }
  };
  if (loading) return <AppLoader />;

  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Create Board" onClose={closeModal} />
        <Stack my={5} spacing={3}>
          <TextField
            label="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stack direction="row" spacing={1}>
            <Typography>Color: </Typography>
            {colors.map((clr, index) => (
              <Box
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
                onClick={() => setColor(index)}
                height="25px"
                width="25px"
                borderRadius="50% "
                bgcolor={clr}
                key={clr}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          onClick={() => handleCreateBoard()}
          variant="contained"
          size="large"
          disabled={loading}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardMode;
