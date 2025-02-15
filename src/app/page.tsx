"use client";
import { useState, ChangeEvent } from "react";
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
import SelectInput from "./components/SelectInput";

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

const names = ["Katarina", "Cassie", "Kunjal", "Sarah"];
const recurrenceIntervals = ["1 week", "2 weeks", "1 month"];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [recurrenceInterval, setRecurrenceInterval] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRecurringChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRecurring(e.target.checked);
  };
  const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  const handleTaskDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDesc(e.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} spacing={2}>
          <Typography variant="h5" fontWeight={600}>
            New Task
          </Typography>

          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 0, right: 10 }}
          >
            <CloseRoundedIcon />
          </IconButton>

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

          <Button variant="contained" sx={{ textTransform: "none" }}>
            Create task
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
