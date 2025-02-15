"use client";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskWidget from "./components/TaskWidget";
import Image from "next/image";
import TaskModal from "./components/TaskModal";

export default function House() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box className="container">
      <Box className="roof">
        <Box className="triangle">
          <span className="triangle-text">
            <Box className="circle" sx={{ position: "relative", textAlign: "center" }}>
              <Image
                src="/img/images.jpeg"
                alt="Jeremy, the coolest roommate ever"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "50%" }}
              />
            </Box>
            {/* Box to accommodate the button */}
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 5, // Add spacing between the circle and the button
              }}
            >
              <Button variant="contained" onClick={handleOpen}>
                +
              </Button>
            </Box>
            <TaskModal action={"Create"} open={open} setOpen={setOpen} />
          </span>
        </Box>
      </Box>
      <Box className="base">
        <div className="grid">
          {/* Column 1 */}
          <div className="column">
            <Typography variant="body1">One of three columns</Typography>
            <TaskWidget />
          </div>

          {/* Column 2 */}
          <div className="column">
            <Typography variant="body1">One of three columns</Typography>
          </div>

          {/* Column 3 */}
          <div className="column">
            <Typography variant="body1">One of three columns</Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
}