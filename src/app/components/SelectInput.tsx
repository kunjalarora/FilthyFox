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
  allVals: string[];
  inputVal: string;
  setVal: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectInput({
	label,
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
