import "./ProgressBar.css";

export const ProgressBar: React.FC<{
  percentage: number;
}> = ({ percentage }) => {
  const borderRightStyle = percentage === 100 ? "" : "rounded-r-md";
  return (
    <div className="w-full border-4">
      <div
        className={`progress-bar-inner h-4 w-40 ${borderRightStyle} bg-amber-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
