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
import { User } from "@/interfaces/interfaces.ts/interfaces";

interface TaskWidgetProps {
  user: User;
}

export default function TaskWidget({ user }: TaskWidgetProps) {
  const [openTaskId, setOpenTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatus, setTaskStatus] = useState<{ [key: number]: boolean }>({});
  const [taskUrgency, setTaskUrgency] = useState<{ [key: number]: boolean }>(
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

    // Determine the new status based on the current status
    const currentTask = tasks.find((task) => task.id === taskId);
    const newStatus = currentTask?.status === "In Progress" ? "To-do" : "In Progress";

    // Send PATCH request to update the status of the task
    axios
      .patch(`http://localhost:3000/api/tasks/${taskId}`, {
        status: newStatus
      })
      .then((response) => {
        console.log(response);
        // Update the status state based on the server response
        setTasks((prevState) =>
          prevState.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
        setTaskStatus((prevState) => ({
          ...prevState,
          [taskId]: newStatus === "In Progress"
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeUrgency = (taskId: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    // Determine the new urgency state
    const currentTask = tasks.find((task) => task.id === taskId);
    const newUrgency = !currentTask?.isUrgent;

    // Send PATCH request to update the urgency of the task
    axios
      .patch(`http://localhost:3000/api/tasks/${taskId}`, {
        isUrgent: newUrgency
      })
      .then((response) => {
        console.log(response);
        // Update the urgency state based on the server response
        setTasks((prevState) =>
          prevState.map((task) =>
            task.id === taskId ? { ...task, isUrgent: newUrgency } : task
          )
        );
        setTaskUrgency((prevState) => ({
          ...prevState,
          [taskId]: newUrgency
        }));
        // Refresh the tasks to update the order
        fetchTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTasks = () => {
    axios
      .get(`http://localhost:3000/api/tasks?userId=${user.id}`)
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
        // Initialize taskStatus and taskUrgency states based on the fetched tasks
        const initialTaskStatus: { [key: number]: boolean } = {};
        const initialTaskUrgency: { [key: number]: boolean } = {};
        res.data.forEach((task: Task) => {
          initialTaskStatus[task.id] = task.status === "In Progress";
          initialTaskUrgency[task.id] = task.isUrgent;
        });
        setTaskStatus(initialTaskStatus);
        setTaskUrgency(initialTaskUrgency);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
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

            const borderColor = isDueSoon(taskDueDate)
              ? "2px solid red"
              : "2px solid green";

            return (
              <Fragment key={task.id}>
                {/* Card component containing task details */}
                <Card
                  sx={{
                    border: borderColor,
                    borderRadius: "8px",
                    backgroundColor: "#f1f1f1",
                  }}
                >
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
