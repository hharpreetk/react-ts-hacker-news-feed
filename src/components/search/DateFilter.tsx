import { Select } from "@mantine/core";
import { DATE_OPTIONS } from "../../constants/filters";
import { useSearch } from "../../contexts/SearchContext";
import { IconCalendarTime } from "@tabler/icons-react";
import classes from "../../styles/Select.module.css";

const DateFilter: React.FC = () => {
  const { selectedDate, handleDateSelect } = useSearch();
  return (
    <div>
      <Select
        classNames={classes}
        data={DATE_OPTIONS}
        value={selectedDate}
        onChange={handleDateSelect}
        leftSection={<IconCalendarTime size={17} stroke={1.5} />}
        leftSectionWidth={36}
        allowDeselect={false}
        required
      />
    </div>
  );
};

export default DateFilter;
