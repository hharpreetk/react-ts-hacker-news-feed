import { Select } from "@mantine/core";
import { DATE_OPTIONS } from "../constants/options";

interface DateFilterProps {
  selectedDate: string | null;
  onDateSelect: (selectedOption: string | null) => void;
}

const DateFilter = ({ selectedDate, onDateSelect }: DateFilterProps) => {
  return (
    <div>
      <Select
        label="Filter by Date"
        data={DATE_OPTIONS}
        value={selectedDate}
        onChange={onDateSelect}
      />
    </div>
  );
};

export default DateFilter;
