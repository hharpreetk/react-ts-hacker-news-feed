import { Slider } from "@mantine/core";

const ScaleSlider = () => {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      my={8}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
};

export default ScaleSlider;
