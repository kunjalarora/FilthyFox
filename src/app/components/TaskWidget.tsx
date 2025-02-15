"use client";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Task } from "@/interfaces/interfaces.ts/interfaces";
import TaskModal from "./TaskModal";

export default function TaskWidget() {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);

  const handleOpen = (taskId: number) => {
    setOpenTaskId(taskId); // Set task ID to open the specific modal
  };

  const handleClose = () => {
    setOpenTaskId(null); // Close the modal
  };
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks?userId=1").then((res) => {
      setTasks(res.data);
			console.log(res.data);
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
          gap: 2,
          maxHeight: "95%",
          overflowY: "auto",
        }}
      >
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <Card>
              <CardActionArea onClick={() => handleOpen(task.id)}>
                <CardContent sx={{ height: "100%", textAlign: "left" }}>
                  <Typography fontWeight={600}>{task.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <TaskModal
              key={task.id}
              action={"Edit"}
              task={task}
              open={openTaskId === task.id}
              setOpen={handleClose}
            />
          </Fragment>
        ))}
      </Box>
    </>
  );
}
