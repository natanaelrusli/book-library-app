import React from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
      <div className="mb-4 flex flex-row items-center justify-center text-lg">
        <p className="mr-2 font-bold">#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input pb-0.5 font-ibm-plex-sans"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
