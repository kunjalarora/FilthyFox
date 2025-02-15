import React from "react";
import { Container, Row, Col } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap is imported
import { Box, Grid, Typography } from "@mui/material"; // Importing Material UI components
import { Button } from "@mui/material";


import Image, { StaticImageData } from "next/image";
import image from '../public/img/images.jpeg';

export default function House() {
  return (
    <Box className="container">
      <Box className="roof">
        <Box className="triangle">
          <span className="triangle-text">
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
          <Typography variant="body1">
            One of three columns
          </Typography>
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
  )
}
