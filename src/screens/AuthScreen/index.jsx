import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { auth, db } from "../../firebase";
import { fetchBoards, showMessage } from "../../slices/BoardsSlice";
import FormEl from "../../components/utils/FormEl";
import { collection, doc, setDoc } from "firebase/firestore";
const initForm = {
  username: "",
  email: "",
  password: "",
};

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initForm);
  const btn = useRef();

  const { boards } = useSelector((state) => state.boards);
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);
  const authText = isLogin ? "Do not have account" : "Already  have account";
  const dispatch = useDispatch();
  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      if (btn.current.name === "register") {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "user", res.user.uid), {
          username,
          email,
          uid: res.user.uid,
        });

        // await setDoc(doc(db, "boards", res.user.uid), {
        //   boards: [],
        // });
      } else if (btn.current.name === "login") {
        const res = await signInWithEmailAndPassword(auth, email, password);

        dispatch(fetchBoards(res.user.uid));
      }
    } catch (error) {
      const msg = error.code?.split("auth/")[1].split("-").join(" ");
      dispatch(showMessage(msg));
    } finally {
      setForm(initForm);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isLoggedIn) dispatch(fetchBoards(currentUser?.uid));
  }, []);
  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl src={logoImg} alt="logo" />
        <Typography color="rgba(255,255,255,0.6)">
          Visualize Your Workflow for Increased Productivity. <br /> Access Your
          Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <FormEl
          onSubmit={handleAuth}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            value={form.username}
            onChange={handleChange}
            name="username"
            label="Username"
            type="text"
          />
          <TextField
            value={form.email}
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            type="password"
            onChange={handleChange}
            value={form.password}
            name="password"
            label="Password"
          />
          <Button
            type="submit"
            disabled={isLoading || !form.email.trim() || !form.password.trim()}
            size="large"
            name={isLogin ? "login" : "register"}
            variant="contained"
            ref={btn}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </FormEl>
      </Stack>
      <Typography
        onClick={() => setIsLogin((state) => !state)}
        textAlign="center"
        mt={3}
        sx={{ cursor: "pointer" }}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
