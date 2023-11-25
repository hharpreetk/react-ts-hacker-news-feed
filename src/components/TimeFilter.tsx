import { Select } from "@mantine/core";
import { TIME_OPTIONS } from "../constants/options";

interface TimeFilterProps {
  selectedTime: string | null;
  onTimeSelect: (selectedOption: string | null) => void;
}

const TimeFilter = ({ selectedTime, onTimeSelect }: TimeFilterProps) => {
  return (
    <div>
      <Select
        label="Filter by Date"
        data={TIME_OPTIONS}
        value={selectedTime}
        onChange={onTimeSelect}
      />
    </div>
  );
};

export default TimeFilter;
