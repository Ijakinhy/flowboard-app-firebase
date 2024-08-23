import { ArrowBack, Delete } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { colors } from "../../theme";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteBoard, showMessage } from "../../slices/BoardsSlice";

const BoardTopBar = ({ name, color }) => {
  const navigate = useNavigate();
  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);
  const { boards } = useSelector((state) => state.boards);
  const { lastUpdated } = useSelector((state) => state.boardData);
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const handleDeleteBoard = () => {
    if (confirm("Are you sure you want to delete this board")) {
      dispatch(deleteBoard({ boardId, boards, uid }));
      navigate("/boards");
      dispatch(showMessage("board deleted"));
    }
  };

  return (
    <AppBar
      sx={{
        borderBottom: `4px solid ${colors[color]}`,
      }}
      position="static"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <IconButton size="small" onClick={() => navigate("/boards")}>
            <ArrowBack />
          </IconButton>
          <Typography fontWeight="400" variant="h6">
            {name}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={3}>
          <Typography
            display={{
              // xs: "none",
              sm: "block",
              md: "block",
            }}
            variant="body2"
          >
            {isXs
              ? `Last updated: ${lastUpdated?.toDate().toLocaleDateString()}`
              : `Last updated: ${lastUpdated
                  ?.toDate()
                  .toLocaleString("en-US")}`}
          </Typography>
          <IconButton size="small" onClick={handleDeleteBoard}>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
