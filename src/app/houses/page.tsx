"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
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
    axios
      .get("http://localhost:3000/api/houses/members/1")
      .then((res) => {
        setUsers(res.data); // Set the users data
        console.log(res.data); // Check the fetched data
        setLoading(false); // Set loading state to false after fetching data

        if (typeof window !== "undefined") {
          // Generate the name-index pair
          const nameIndexPair = res.data.reduce(
            (acc: any, user: User, index: number) => {
              acc[index] = user.name; // Use user.name for the name
              return acc;
            },
            {}
          );

          // Store the name-index pair in localStorage
          localStorage.setItem("nameIndexPair", JSON.stringify(nameIndexPair));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  return (
    <Box sx={{width: "100vw", backgroundColor: "#f7eca8"}}>
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
            <Box className="large-triangle" />
            <Box className="triangle">
              <span className="triangle-text">
                <Box
                  className="circle"
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src="/img/jeremy.png"
                    alt="Jeremy, the coolest roommate ever"
                    layout="fill"
                    objectFit="cover"
                    style={{
                      borderRadius: "50%",
                      boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
                    }}
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
          <Box
            sx={{
              width: "100%",
              padding: "20px",
              marginTop: "1rem",
              backgroundColor: "#c9a77b",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingTop: 1,
                      boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
                    }}
                    overflow={"auto"}
                  >
                    <Typography variant="h5" fontWeight={600}>
                      {user.name}
                    </Typography>
                    <TaskWidget user={user} />
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
