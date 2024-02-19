import { useState } from "react";
import { ProgressBar } from "./ProgressBar.tsx";
import { NumberInput } from "./NumberInput.tsx";

export const ProgressBarPage: React.FC = () => {
  const MAX_PERCENTAGE = 100;
  const MIN_PERCENTAGE = 0;
  const AUTO_INCREMENT_INTERVAL_MS = 100;
  const AUTO_INCREMENT_STEP = 1;

  const [value, setValue] = useState<string>("");
  const [autoIncrementIntervalID, setAutoIncrementIntervalID] = useState<
    number | null
  >(null);
  const isAutoIncrementActive = autoIncrementIntervalID !== null;

  const toggleAutoIncrement = (): void => {
    if (isAutoIncrementActive) {
      clearInterval(autoIncrementIntervalID);
      setAutoIncrementIntervalID(null);
    } else {
      let timeoutBeforeStartingInterval = 0;
      if (value === `${MAX_PERCENTAGE}`) {
        setValue(`${MIN_PERCENTAGE}`);
        timeoutBeforeStartingInterval = 500;
      }
      setTimeout(() => {
        const intervalID = setInterval(() => {
          setValue((previousValue) => {
            const previousNumericalValue = parseInt(
              previousValue === "" ? `${MIN_PERCENTAGE}` : previousValue,
            );
            const newValue = previousNumericalValue + AUTO_INCREMENT_STEP;
            if (newValue > MAX_PERCENTAGE) {
              clearInterval(intervalID);
              setAutoIncrementIntervalID(null);
              return previousValue;
            }
            return `${newValue}`;
          });
        }, AUTO_INCREMENT_INTERVAL_MS);
        setAutoIncrementIntervalID(intervalID);
      }, timeoutBeforeStartingInterval);
    }
  };

  const numericalValue = parseInt(value === "" ? `${MIN_PERCENTAGE}` : value);
  if (isNaN(numericalValue)) {
    // report error to Sentry
    throw new Error("Value is not a number");
  }
  const progressBarPercentage = (numericalValue * 100) / MAX_PERCENTAGE;

  return (
    <div>
      <h1>This is a progress bar!</h1>
      <div className="flex-col items-center justify-start">
        <button
          onClick={toggleAutoIncrement}
          className={`mb-5 rounded px-4 py-2 font-bold text-white ${isAutoIncrementActive ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"}`}
        >
          {isAutoIncrementActive ? "Stop" : "Start"} auto increment
        </button>
        <div className={"w-52"}>
          <NumberInput
            value={value}
            onChange={setValue}
            max={MAX_PERCENTAGE}
            min={MIN_PERCENTAGE}
            className="mb-5 h-10 w-full rounded-md border-2 border-gray-300 p-2"
            disabled={isAutoIncrementActive}
          />
        </div>
        <div className={"w-96"}>
          <ProgressBar percentage={progressBarPercentage} />
        </div>
      </div>
    </div>
  );
};
