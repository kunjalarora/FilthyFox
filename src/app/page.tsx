import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TaskWidget from "./components/TaskWidget";
import Image from "next/image";

export default function House() {
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
              <Button variant="contained">+</Button>
            </div>
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
