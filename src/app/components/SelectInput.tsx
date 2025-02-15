import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
	Select,
	SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";

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

interface SelectInputProps {
  allVals: string[];
  inputVal: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectInput({
  allVals,
  inputVal,
  setVal,
}: SelectInputProps) {
  const handleInputChange = (event: SelectChangeEvent<string>) => {
    setVal(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>Assignee</InputLabel>
        <Select
          value={inputVal}
          label="Assignee"
          onChange={handleInputChange}
          input={<OutlinedInput id="select-single-chip" label="Chip" />}
          renderValue={(selected) =>
            selected ? <Chip label={selected} /> : ""
          }
          MenuProps={MenuProps}
        >
          {allVals.map((val, idx) => (
            <MenuItem key={idx} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
