"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SelectInput from "./components/SelectInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const names = ["Katarina", "Cassie", "Kunjal", "Sarah"];

const recurrenceIntervals = ["1 week", "2 weeks", "1 month"];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [recurrenceInterval, setRecurrenceInterval] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRecurringChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsRecurring(event.target.checked);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Next Task
          </Typography>
          <TextField label="Task name" variant="outlined" fullWidth />
          <TextField
            label="Task description"
            multiline
            rows={4}
            defaultValue="Task description"
            fullWidth
          />
          <SelectInput
            allVals={names}
            inputVal={assignee}
            setVal={setAssignee}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Due date" />
          </LocalizationProvider>

          <FormControlLabel
            control={
              <Checkbox
                checked={isRecurring}
                onChange={handleRecurringChange}
              />
            }
            label="Label"
          />
          <SelectInput
            allVals={recurrenceIntervals}
            inputVal={recurrenceInterval}
            setVal={setRecurrenceInterval}
          />

          <Button variant="contained">Create task</Button>
        </Box>
      </Modal>
    </div>
  );
}
