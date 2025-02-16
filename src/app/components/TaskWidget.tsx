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
  IconButton,
} from "@mui/material";
import { Task } from "@/interfaces/interfaces.ts/interfaces";
import TaskModal from "./TaskModal";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface TaskWidgetProps {
  userId: number;
}

export default function TaskWidget({ userId }: TaskWidgetProps) {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatus, setTaskStatus] = useState<{ [key: string]: boolean }>({});
  const [taskUrgency, setTaskUrgency] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleOpen = (taskId: number) => {
    setOpenTaskId(taskId); // Set task ID to open the specific modal
  };

  const handleClose = () => {
    setOpenTaskId(null);
  };

  const changeStatus = (taskId: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // Toggle the status for the specific task by taskId
    setTaskStatus((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId], // Toggle the status for the taskId
    }));
  };

  const changeUrgency = (taskId: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // Toggle the urgency state for the specific task by taskId
    setTaskUrgency((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId], // Toggle the urgency state for the taskId
    }));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tasks?userId=${userId}`)
      .then((res) => {
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
            padding: 1,
          }}
        >
          {tasks.map((task) => {
            const taskDueDate = new Date(task.dueDate); // Ensure dueDate is a Date object

            const borderColor = isDueSoon(taskDueDate) ? "2px solid red" : "2px solid green";

            return (
              <Fragment key={task.id}>
                {/* Card component containing task details */}
                <Card sx={{ border: borderColor, borderRadius: "8px", backgroundColor: "#f1f1f1"}}>
                  <CardActionArea onClick={() => handleOpen(task.id)}>
                    <CardContent sx={{ height: "100%", textAlign: "left" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography fontWeight={600}>{task.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Due: {task.dueDate.toString().split("T")[0]}
                          </Typography>
                        </Box>
                        <Box>
                          {/* IconButton to toggle task status */}
                          <IconButton onClick={(e) => changeStatus(task.id, e)}>
                            {taskStatus[task.id] ? (
                              <AccessTimeRoundedIcon />
                            ) : (
                              <CloseRoundedIcon />
                            )}
                          </IconButton>
                          {/* IconButton for another action, e.g., changing urgency */}
                          <IconButton
                            onClick={(e) => changeUrgency(task.id, e)}
                            sx={{
                              color: taskUrgency[task.id] ? "red" : "inherit", // Change color to red if urgent
                            }}
                          >
                            <CampaignRoundedIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>

                {/* TaskModal for editing the task */}
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