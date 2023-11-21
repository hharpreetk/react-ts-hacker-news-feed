import Select from "react-select";
import { TIME_OPTIONS } from "../constants/options";
import { SingleValueTimeOption } from "../types/options";

interface TimeFilterProps {
  selectedTime: SingleValueTimeOption;
  onTimeSelect: (selectedOption: SingleValueTimeOption) => void;
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
