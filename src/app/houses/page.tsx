"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
import TaskWidget from "../components/TaskWidget";
import Image from "next/image";
import TaskModal from "../components/TaskModal";
import Grid from "@mui/material/Grid2";
import { User } from "@/interfaces/interfaces.ts/interfaces";

export default function House() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/houses/members/1").then((res) => {
      setUsers(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box className="container">
          <Box className="roof">
            <Box className="triangle">
              <span className="triangle-text">
                <Box
                  className="circle"
                  sx={{ position: "relative", textAlign: "center" }}
                >
                  <Image
                    src="/img/jeremy.png"
                    alt="Jeremy, the coolest roommate ever"
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: "50%" }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ backgroundColor: "#91ba8d" }}
                  >
                    +
                  </Button>
                </Box>
                <TaskModal action={"Create"} open={open} setOpen={setOpen} />
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
                    overflow={"auto"}
                  >
                    <TaskWidget userId={user.id} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}
