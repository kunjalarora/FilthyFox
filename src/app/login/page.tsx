"use client";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

export default function MultilineTextFields() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#91BA8d";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const createUser = () => {
    axios
      .post("http://localhost:3000/api/users", {
        name: userName,
        email: userEmail,
        password: userPassword,
        photo: userPhoto,
      })
      .then(function (response) {
        console.log(response);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setUserPhoto("");

        redirect("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUser = () => {
    // Define what happens on login (similar to createUser)
    console.log("Login clicked");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPhoto(e.target.value);
  };

  return (
    <Stack sx={style} spacing={3}>
      <Typography variant="h4" gutterBottom>
        !! Hi Roomie !!
      </Typography>

      <TextField
        id="outlined-multiline-flexible"
        label="Your Name"
        multiline
        maxRows={4}
        value={userName}
        onChange={handleNameChange}
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <TextField
        id="outlined-multiline-static"
        label="Email Address"
        multiline
        maxRows={4}
        value={userEmail}
        onChange={handleEmailChange}
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <TextField
        id="filled-multiline-flexible"
        label="Password"
        multiline
        maxRows={4}
        value={userPassword}
        onChange={handlePasswordChange}
        variant="filled"
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <TextField
        id="filled-multiline-flexible"
        label="Photo"
        multiline
        rows={4}
        value={userPhoto}
        onChange={handlePhotoChange}
        variant="filled"
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
      >
        <Button onClick={createUser}>Signup</Button>
        <Button onClick={getUser}>Login</Button>
      </ButtonGroup>
    </Stack>
  );
}
