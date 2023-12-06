import { Select } from "@mantine/core";
import { DATE_OPTIONS } from "../constants/options";
import { IconCalendarTime } from "@tabler/icons-react";

interface DateFilterProps {
  selectedDate: string | null;
  onDateSelect: (selectedOption: string | null) => void;
}

const DateFilter = ({ selectedDate, onDateSelect }: DateFilterProps) => {
  return (
    <div>
      <Select
        maw={{ base: 180, xs: "auto" }}
        styles={{input: {height: 38}}}
        data={DATE_OPTIONS}
        value={selectedDate}
        onChange={onDateSelect}
        leftSection={<IconCalendarTime size={17} stroke={1.5} />}
        leftSectionWidth={36}
        allowDeselect={false}
        required
      />
    </div>
  );
};

export default DateFilter;
