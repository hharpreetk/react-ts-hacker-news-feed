import Select, { SingleValue } from "react-select";
import { TIME_OPTIONS } from "../constants/options";
import { TimeOption } from "../types/options";

interface TimeFilterProps {
  selectedTime: SingleValue<TimeOption>;
  onTimeSelect: (selectedOption: SingleValue<TimeOption>) => void;
}

const TimeFilter = ({ selectedTime, onTimeSelect }: TimeFilterProps) => {
  return (
    <div>
      <Select
        options={TIME_OPTIONS}
        value={selectedTime}
        onChange={onTimeSelect}
        required
      />
    </div>
  );
};

export default TimeFilter;
