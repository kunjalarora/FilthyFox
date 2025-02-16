"use client";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import { Task } from "@/interfaces/interfaces.ts/interfaces";
import TaskModal from "./TaskModal";

export default function TaskWidget() {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleOpen = (taskId: number) => {
    setOpenTaskId(taskId); // Set task ID to open the specific modal
  };

  const handleClose = () => {
    setOpenTaskId(null);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks?userId=1").then((res) => {
      setTasks(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, [openTaskId]);

  const isDueSoon = (dueDate: Date) => {
    const currentDate = new Date();
    const timeDifference: number = dueDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

    return daysDifference >= 0 && daysDifference <= 7; // Check if due date is within the next 7 days
  };

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 2,
            height: "95%",
            overflowY: "auto",
            padding: 1
          }}
        >
          {tasks.map((task) => {
            const taskDueDate = new Date(task.dueDate); // Ensure dueDate is a Date object

            const borderColor = isDueSoon(taskDueDate) ? "2px solid red" : "2px solid green";

            const backgroundColor = task.isUrgent ? "#FAD1D0" : "light-grey";

            return (
              <Fragment key={task.id}>
                <Card sx={{ border: borderColor, borderRadius: "8px", backgroundColor}}>
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
            );
          })}
        </Box>
      )}
    </Box>
  );
}
