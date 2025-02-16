"use client";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
  const [userHouseId, setUserHouseId] = useState<number>(0);

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
        houseId: userHouseId
      })
      .then(function (response) {
        console.log(response);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setUserPhoto("");
        setUserHouseId(0);
  
        window.location.href = `/houses?id=${userHouseId}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/email", {
        params: { email: userEmail, password: userPassword },
      });
  
      // If the response contains valid user data, store it and redirect
      if (response.data) {
        setUser(response.data); // Store the user data
        window.location.href = `/houses?id=${response.data.houseId}`; // Redirect to the homepage
      } else {
        console.log("No user data received.");
      }
    } catch (error) {
      // Enhanced error handling
      if (axios.isAxiosError(error)) {
        // Axios specific error
        if (error.response) {
          // Error response from the server
          console.error("Server error:", error.response.data.error);
        } else if (error.request) {
          // Request made but no response
          console.error("No response received from the server:", error.request);
        } else {
          // Error setting up the request
          console.error("Error setting up request:", error.message);
        }
      } else {
        // Generic error handling
        console.error("Unexpected error:", error);
      }
    }
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

  const handleHouseIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserHouseId(value ? parseInt(value, 10) : 0);  // Convert to number, default to 0 if empty
  };

  return (
    <Stack sx={style} spacing={3}>
      <Typography variant="h4" gutterBottom>
        Welcome Home!
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

      {/* <TextField
        id="filled-multiline-flexible"
        label="Photo(Optional)"
        multiline
        maxRows={4}
        value={userPhoto}
        onChange={handlePhotoChange}
        variant="filled"
        sx={{ marginBottom: 2, width: "100%" }}
      /> */}

      <TextField
        id="filled-multiline-flexible"
        label="House"
        type="number"  // Input type set to number
        value={userHouseId}
        onChange={handleHouseIdChange}
        variant="filled"
        sx={{ marginBottom: 2, width: "100%" }}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          sx={{ backgroundColor: "#C9A77B", color: "#ffffff", '&:hover': { backgroundColor: '#b3926f' } }}
          onClick={createUser}
        >
          Signup
        </Button>
        <Button
          sx={{ backgroundColor: "#C9A77B", color: "#ffffff", '&:hover': { backgroundColor: '#b3926f' } }}
          onClick={getUser}
        >
          Login
        </Button>
      </Box>
    </Stack>
  );
}
