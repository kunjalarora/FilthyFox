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
  allVals: number[] | { [key: string]: string };
  inputVal: number | string;
  setVal: React.Dispatch<React.SetStateAction<number | string>>;
}

export default function SelectInput({
  label,
  allVals,
  inputVal,
  setVal,
}: SelectInputProps) {
  const handleInputChange = (event: SelectChangeEvent<any>) => {
    const value = event.target.value;
    setVal(value);
  };

  console.log(allVals);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={inputVal}
          onChange={handleInputChange}
          input={<OutlinedInput id="select-single-chip" label="Chip" />}
          renderValue={(selected) =>
            selected ? (
              label === "Interval" ? (
                <Chip label={`${selected} days`} />
              ) : (
                <Chip label={(allVals as { [key: string]: string })[selected]} />
              )
            ) : (
              ""
            )
          }
          MenuProps={MenuProps}
        >
          {label === "Interval"
            ? (allVals as number[]).map((val, idx) => (
                <MenuItem key={idx} value={val}>
                  {`${val} days`}
                </MenuItem>
              ))
            : Object.entries(allVals as { [key: string]: string }).map(([key, value], idx) => (
                <MenuItem key={idx} value={key}>
                  {value}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
  );
}
