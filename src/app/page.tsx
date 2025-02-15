"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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
  const handleAssigneeChange = (event: SelectChangeEvent<string>) => {
    setAssignee(event.target.value);
  };
  const handleRecurrenceIntervalChange = (event: SelectChangeEvent<string>) => {
    setRecurrenceInterval(event.target.value);
  };
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
          <TextField label="Task name" variant="outlined" />
          <TextField
            label="Task description"
            multiline
            rows={4}
            defaultValue="Task description"
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Assignee</InputLabel>
              <Select
                value={assignee}
                label="Assignee"
                onChange={handleAssigneeChange}
                input={<OutlinedInput id="select-single-chip" label="Chip" />}
                renderValue={(selected) =>
                  selected ? <Chip label={selected} /> : ""
                }
                MenuProps={MenuProps}
              >
                {names.map((name, idx) => (
                  <MenuItem key={idx} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Due date" />
          </LocalizationProvider>

          <FormControlLabel
            control={<Checkbox checked={isRecurring} onChange={handleRecurringChange} />}
            label="Label"
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Recurrence Interval</InputLabel>
              <Select
                value={recurrenceInterval}
                label="Reucurrence Interval"
                onChange={handleRecurrenceIntervalChange}
                input={<OutlinedInput id="select-single-chip" label="Chip" />}
                renderValue={(selected) =>
                  selected ? <Chip label={selected} /> : ""
                }
                MenuProps={MenuProps}
              >
                {recurrenceIntervals.map((interval, idx) => (
                  <MenuItem key={idx} value={interval}>
                    {interval}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button variant="contained">Create task</Button>
        </Box>
      </Modal>
    </div>
  );
}
