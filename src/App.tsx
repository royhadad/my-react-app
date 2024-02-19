import { useState } from "react";
import "./App.css";

const MAX_PERCENTAGE = 1000;
const MIN_PERCENTAGE = 0;

function App() {
  const [value, setValue] = useState<string>("");

  const numericalValue = parseInt(value === "" ? `${MIN_PERCENTAGE}` : value);

  return (
    <div>
      <h1>Hello, Vite + React!</h1>
      <div className="flex-col items-center justify-start">
        <div className={"w-52"}>
          <input
            className={
              "mb-5 h-10 w-full rounded-md border-2 border-gray-300 p-2"
            }
            type="text"
            value={value}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "") {
                setValue(newValue);
                return;
              }
              const newValueNumerical = safeParseInt(newValue);
              if (
                isNaN(newValueNumerical) ||
                newValueNumerical < MIN_PERCENTAGE ||
                newValueNumerical > MAX_PERCENTAGE
              ) {
                return;
              }
              setValue(newValue);
            }}
          />
        </div>
        <div className={"w-96"}>
          <ProgressBar percentage={(numericalValue * 100) / MAX_PERCENTAGE} />
        </div>
      </div>
    </div>
  );
}

export default App;

const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
  // use tailwindcss to style the progress bar and the percentage
  return (
    <div className="w-full border-4">
      <div
        className="progress-bar-inner h-4 w-40 rounded-full bg-gray-200"
        style={{ width: `${percentage}%` }}
      />
    </div>
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
