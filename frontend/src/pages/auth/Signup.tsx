import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
  TextField,
} from "@mui/material";
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
import { SignupDetails } from "./_interfaces";

export const Signup: FC = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { login } = useContext(AppContext);

  const { isLoading, mutate, isSuccess,data } = useMutation(
    async (data: SignupDetails) => {
      const response = await fetch(`${window.location.origin}/auth/signup`, {
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
        login(data)
      }
      else {
        setErrMsg(
          (data.errors && Array.isArray(data.errors) && data.errors[0].msg) || data.errors
        )
      }
      const timeout = setTimeout(() => {
        setErrMsg('')
      }, 3000);
      
      return () => {
        clearTimeout(timeout)
      }
      
    }
  }, [isSuccess]);

  function signupHandler() {
    if (!email || !name || !confirmPass) return;
    if (password !== confirmPass) return
    const obj = {
      name,
      email,
      password : confirmPass,
    };
    mutate(obj);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="70%"
      maxWidth={'600px'}
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
            You have Signed Up Successfully
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
        Signup
      </Typography>

      <Stack spacing={6}>
        <TextField
   required
          id="name"
          label="Name"
          type={"text"}
          placeholder="Your Name"
          variant="outlined"
          size="small"
          name="name"
          fullWidth
          disabled={isLoading}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          id="password"
          label="Password"
          required
          type={"password"}
          placeholder="Your Password"
          variant="outlined"
          size="small"
          name="password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
        required
          id="confirm-password"
          label="Confirm Password"
          type={"password"}
          placeholder="Confirm Password"
          variant="outlined"
          size="small"
          name="confirm-password"
          disabled={isLoading}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        {isLoading && <LinearProgress />}
        <Button
          disabled={!email || !password || !name || !confirmPass || password.length < 7 || email.length < 7 || (confirmPass !== password)}
          onClick={signupHandler}
          variant="contained"
          size="medium"
        >
          Signup
        </Button>
        <p>
          <Link to="/login"> Or Login</Link>
        </p>
      </Stack>
    </Box>
  );
};
