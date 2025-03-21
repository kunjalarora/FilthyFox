"use client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  IconButton,
  FormControlLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import dayjs, { Dayjs } from "dayjs";
import SelectInput from "./SelectInput";
import { Task } from "@/interfaces/interfaces.ts/interfaces";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
};

const recurrenceIntervals = [7, 14, 30];

interface TaskModalProps {
  action: string;
  task?: Task;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskModal({
  action,
  task,
  open,
  setOpen,
}: TaskModalProps) {
  const [taskName, setTaskName] = useState(task?.name || "");
  const [taskDesc, setTaskDesc] = useState(task?.description || "");
  const [assignee, setAssignee] = useState(task?.userId || ""); // TODO
  const [dueDate, setDueDate] = useState<Dayjs | null>(
    task?.dueDate ? dayjs(task.dueDate) : null
  );
  const [recurrenceInterval, setRecurrenceInterval] = useState(
    task?.recursiveTime || ""
  );
  const [isRecurring, setIsRecurring] = useState(task?.isRecurring);
  const [isDone, setIsDone] = useState(task?.status === "Done");
  const [names, setNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the name-index object from localStorage
      const storedNameIndexPair = localStorage.getItem("nameIndexPair");

      // Check if the data exists and parse it, or use an empty object if it doesn't exist
      const parsedNames = storedNameIndexPair ? JSON.parse(storedNameIndexPair) : {};

      // Check if the data was parsed correctly
      if (Object.keys(parsedNames).length > 0) {
        console.log(parsedNames);
        setNames(parsedNames);
      } else {
        console.log("No names found in localStorage");
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleRecurringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRecurring(e.target.checked);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDone(e.target.checked);
  };

  useEffect(() => {
    if (isDone) {
      deleteTask();
    }
  }, [isDone]);

  const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const handleTaskDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(e.target.value);
  };
  const createTask = () => {
    const userId = Number(assignee);
    console.log("Creating task for userId:", userId);
    axios
      .post("http://localhost:3000/api/tasks", {
        name: taskName,
        description: taskDesc,
        status: "To-do",
        dueDate: dueDate?.toDate(),
        isRecurring: isRecurring,
        recursiveTime: isRecurring ? recurrenceInterval : null,
        isUrgent: false,
        userId: userId,
      })
      .then(function (response) {
        console.log(response);
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
      });
  };

  const patchTask = () => {
    axios
      .patch(`http://localhost:3000/api/tasks/${task?.id}`, {
        name: taskName,
        description: taskDesc,
        dueDate: dueDate?.toDate(),
        isRecurring: isRecurring,
        recursiveTime: isRecurring ? recurrenceInterval : null,
        userId: assignee,
      })
      .then(function (response) {
        console.log(response);
        setOpen(false);
      })
      .catch(function (error) {
        console.log(error);
        setOpen(false);
      });
  };

  const deleteTask = () => {
    axios
      .delete(`http://localhost:3000/api/tasks/${task?.id}`)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
        setOpen(false);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Stack sx={style} spacing={2}>
        <Typography variant="h5" fontWeight={600}>
          {action === "Edit" ? "Task" : `${action} task`}
        </Typography>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 0, right: 10 }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {action === "Edit" && (
          <FormControlLabel
            control={
              <Checkbox checked={isDone} onChange={handleStatusChange} />
            }
            label="Task Complete!"
          />
        )}

        <Stack spacing={2} width={"100%"}>
          <TextField
            label="Task name"
            variant="outlined"
            value={taskName}
            onChange={handleTaskNameChange}
            fullWidth
          />
          <TextField
            label="Task description"
            multiline
            rows={4}
            value={taskDesc}
            onChange={handleTaskDescChange}
            fullWidth
          />

          <SelectInput
            label="Assignee"
            allVals={names}
            inputVal={assignee}
            setVal={setAssignee}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due date"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
            />
          </LocalizationProvider>

          <FormControlLabel
            control={
              <Checkbox
                checked={isRecurring}
                onChange={handleRecurringChange}
              />
            }
            label="Recurring Event?"
          />

          {isRecurring && (
            <SelectInput
              label="Interval"
              allVals={recurrenceIntervals}
              inputVal={recurrenceInterval}
              setVal={setRecurrenceInterval}
            />
          )}
        </Stack>

        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            onClick={action === "Create" ? createTask : patchTask}
            sx={{ textTransform: "none" }}
          >
            {action} task
          </Button>
          {action === "Edit" && (
            <Button
              variant="contained"
              onClick={deleteTask}
              sx={{ backgroundColor: "red", textTransform: "none" }}
            >
              Delete task
            </Button>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
}
