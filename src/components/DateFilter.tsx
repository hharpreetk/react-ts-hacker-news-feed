import { Select } from "@mantine/core";
import { DATE_OPTIONS } from "../constants/options";
import { IconCalendarTime } from "@tabler/icons-react";
import classes from "../styles/Select.module.css";

interface DateFilterProps {
  selectedDate: string | null;
  onDateSelect: (selectedOption: string | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  return (
    <div>
      <Select
        maw={{ base: 180, xs: "auto" }}
        classNames={{ input: classes.input }}
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
