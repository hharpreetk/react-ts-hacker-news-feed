import { Select, rem } from "@mantine/core";
import { DATE_RANGE_OPTIONS } from "../../constants/options";
import { useSearch } from "../../contexts/SearchContext";
import { IconCalendarTime } from "@tabler/icons-react";
import classes from "../../styles/Select.module.css";

const DateFilter: React.FC = () => {
  const { selectedDate, handleDateSelect } = useSearch();
  return (
    <div>
      <Select
        classNames={classes}
        data={DATE_RANGE_OPTIONS}
        value={selectedDate}
        onChange={handleDateSelect}
        leftSection={
          <IconCalendarTime
            style={{ height: rem(15), width: rem(15) }}
            stroke={1.5}
          />
        }
        leftSectionWidth={35}
        allowDeselect={false}
        required
      />
    </div>
  );
};

export default DateFilter;
