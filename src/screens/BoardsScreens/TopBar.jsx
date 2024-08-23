import { AppBar, Button, Stack, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import ImageEl from "../../components/utils/ImageEl";
import logoImg from "../../assets/logo.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { auth } from "../../firebase";
import { AddCircleOutline } from "@mui/icons-material";
const TopBar = ({ openModal }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <ImageEl
          sx={{
            height: "25px",
          }}
          src={logoImg}
          alt="logo"
        />
        <Stack direction="row" spacing={2}>
          <Button variant={isXs || "contained"} onClick={openModal}>
            {isXs ? <AddCircleOutline /> : "Create Board"}
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => auth.signOut()}
            color="inherit"
          >
            {isXs ? "" : "Logout"}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
