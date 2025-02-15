"use client";
import { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { green, lightGreen } from "@mui/material/colors";
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500, // Reduced width
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 3, // Reduced padding
};

export default function MultilineTextFields() {
  // Change background color of the body
  useEffect(() => {
    document.body.style.backgroundColor = "#91BA8d"; // Set your desired background color here
    return () => {
      document.body.style.backgroundColor = ""; // Reset when component unmounts
    };
  }, []);

  return (
    <Stack sx={style} spacing={3}> {/* Reduced spacing between elements */}
      <Typography variant="h4" gutterBottom>Hi Roomie !!</Typography>
      
      <TextField
        id="outlined-multiline-flexible"
        label="Your Name"
        multiline
        maxRows={4}
        sx={{ marginBottom: 2, width: '100%' }} // Adjusted margin and width
      />
      
      <TextField
        id="outlined-multiline-static"
        label="Email Address"
        multiline
        maxRows={4}
        sx={{ marginBottom: 2, width: '100%' }} // Adjusted margin and width
      />
      
      <TextField
        id="filled-multiline-flexible"
        label="Password"
        multiline
        maxRows={4}
        variant="filled"
        sx={{ marginBottom: 2, width: '100%' }} // Adjusted margin and width
      />
      
      <TextField
        id="filled-multiline-flexible"
        label="Photo"
        multiline
        rows={4}
        defaultValue="null"
        variant="filled"
        sx={{ marginBottom: 2, width: '100%' }} // Adjusted margin and width
      />

      <ButtonGroup disableElevation variant="contained" aria-label="Disabled button group">
        <Button>Signup</Button>
        <Button>Login</Button>
      </ButtonGroup>
    </Stack>
  );
}