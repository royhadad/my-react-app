import React from "react";
import { omit } from "lodash";

type Props = Omit<
  React.JSX.IntrinsicElements["input"],
  "value" | "onChange" | "min" | "max"
> & {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
};

export const NumberInput: React.FC<Props> = (props) => {
  const { value, onChange, className = "", min, max } = props;

  return (
    <input
      {...omit(props, "min", "max")}
      className={className}
      type="text"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        if (newValue === "") {
          onChange(newValue);
          return;
        }
        const newValueNumerical = safeParseInt(newValue);
        if (
          isNaN(newValueNumerical) ||
          (min !== undefined && newValueNumerical < min) ||
          (max !== undefined && newValueNumerical > max)
        ) {
          return;
        }
        onChange(newValue);
      }}
    />
  );
};

function safeParseInt(str: string): number {
  // Check if the entire string consists of digits
  if (/^\d+$/.test(str)) {
    // Use parseInt only if the string is valid
    return parseInt(str, 10);
  } else {
    // Return an indication of failure (you can customize this part)
    return NaN;
  }
}
