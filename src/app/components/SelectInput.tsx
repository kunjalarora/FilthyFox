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
	label: string;
  allVals: number[];
  inputVal: number | null;
  setVal: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function SelectInput({
	label,
  allVals,
  inputVal,
  setVal,
}: SelectInputProps) {
  const handleInputChange = (event: SelectChangeEvent<any>) => {
    // Convert the value to a number
    const value = Number(event.target.value);
    
    // Ensure the value is a valid number
    setVal(isNaN(value) ? null : value);
  };
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={inputVal}
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
