"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Task } from "@/interfaces/interfaces.ts/interfaces";

export default function TaskWidget() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks?userId=1").then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
        maxHeight: "95%",
        overflowY: "auto",
      }}
    >
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardActionArea onClick={() => console.log("Boo!")}>
            <CardContent sx={{ height: "100%", textAlign: "left" }}>
              <Typography fontWeight={600}>{task.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
