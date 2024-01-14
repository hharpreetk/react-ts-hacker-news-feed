import { Slider } from "@mantine/core";

interface ScaleSliderProps {
  scale: number;
  handleChange: (value: number) => void;
}

const ScaleSlider: React.FC<ScaleSliderProps> = ({ scale, handleChange }) => {
  return (
    <Slider
      value={scale}
      min={70}
      max={130}
      my={8}
      maw={300}
      onChange={handleChange}
      label = {`${scale}%`}
    />
  );
};

export default ScaleSlider;
