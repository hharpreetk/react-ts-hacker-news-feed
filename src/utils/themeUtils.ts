import {
  DEFAULT_DISPLAY_SETTINGS,
  DisplaySettings,
} from "../constants/settings";
import { Scale } from "../types/settings";

export const calculateMantineScale = (scale: Scale): number => {
  return isNaN(scale)
    ? calculateMantineScale(DEFAULT_DISPLAY_SETTINGS[DisplaySettings.Scale])
    : scale / 100;
};
