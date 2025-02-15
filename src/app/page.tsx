"use client";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import TaskWidget from "./components/TaskWidget";
import Image from "next/image";
import TaskModal from "./components/TaskModal";
import Grid from "@mui/material/Grid2";

const users = [1, 2, 3, 4, 5];

export default function House() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box className="container">
      <Box className="roof">
        <Box className="triangle">
          <span className="triangle-text">
            <Box className="circle">
              <Image
                src="/img/images.jpeg"
                alt="Jeremy, the coolest roommate ever"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "50%" }}
              />
            </Box>
            <div>
              <Button variant="contained" onClick={handleOpen}>
                +
              </Button>
              <TaskModal action={"Create"} open={open} setOpen={setOpen} />
            </div>
          </span>
        </Box>
      </Box>
      <Box sx={{ padding: "5px" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {users.map((user, idx) => {
            return (
              <Grid
                key={idx}
                size={4}
                height={"50vh"}
                sx={{
                  backgroundColor: "#91ba8d",
                  border: "10px solid #658a6e",
                }}
              >
                <TaskWidget />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
