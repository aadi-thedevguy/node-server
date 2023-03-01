import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
  TextField} from "@mui/material";
import React, {
  FC,
  ReactElement,
  useEffect,
  useState,
  useContext,
} from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { IUserDetails } from "./_interfaces";

export const Login: FC = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { login } = useContext(AppContext);

  const { isLoading, mutate, isSuccess, data } = useMutation(
    async (data: IUserDetails) => {
      const response = await fetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
  );

  useEffect(() => {
    if (isSuccess) {
      if (!data.errors) {
        setShowSuccess(true);
        login(data);
      } else {
        setErrMsg(
          (data.errors && Array.isArray(data.errors) && data.errors[0].msg) ||
            data.errors
        );
      }
      const timeout = setTimeout(() => {
        setErrMsg("");
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isSuccess]);

  function loginHandler() {
    // e.preventDefault()
    if (!email || !password) return;

    const obj = {
      email,
      password,
    };
    mutate(obj);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={"600px"}
      width="70%"
      mx={"auto"}
      px={4}
      my={6}
    >
      <>
        {showSuccess && (
          <Alert
            severity="success"
            sx={{ width: "100%", marginBottom: "1rem" }}
          >
            <AlertTitle>Success</AlertTitle>
            You have Logged In Successfully
          </Alert>
        )}
        {errMsg && (
          <Alert severity="error">
            <AlertTitle>Error Logging In</AlertTitle>
            {errMsg}
          </Alert>
        )}
      </>
      <Typography mb={6} variant="h3">
        Login
      </Typography>

      <Stack spacing={6}>
        <TextField
          required
          id="email"
          label="Email"
          type={"email"}
          placeholder="Your Email"
          variant="outlined"
          size="small"
          name="email"
          fullWidth
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          required
          id="password"
          label="Password"
          type={"password"}
          placeholder="Your Password"
          variant="outlined"
          size="small"
          name="password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLoading && <LinearProgress />}
        <Button
          disabled={!email || !password}
          onClick={loginHandler}
          variant="contained"
          size="medium"
        >
          Login
        </Button>
        <p>
          <Link to="/signup"> Or Signup</Link>
        </p>
      </Stack>
    </Box>
  );
};
