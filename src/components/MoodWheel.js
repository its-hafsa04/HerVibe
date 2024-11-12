import { useState } from "react";

export default function MoodWheel({ tasks, onSpinComplete }) {
  const [spinning, setSpinning] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const spinWheel = () => {
    if (spinning) return; // Prevent multiple spins

    setSpinning(true);
    const spinDuration = 3 + Math.random() * 2; // Random spin duration for a more natural feel
    const chosenTask = tasks[Math.floor(Math.random() * tasks.length)];

    // Set timeout to simulate spin effect completion
    setTimeout(() => {
      setSelectedTask(chosenTask);
      setSpinning(false);
      onSpinComplete(chosenTask); // Callback to pass the task back to parent component
    }, spinDuration * 1000); // Duration in milliseconds
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`wheel ${spinning ? "spinning" : ""}`}
        onClick={spinWheel}
        style={{
          background: `conic-gradient(from 0deg, pink, violet, lavender, peachpuff, lightpink, #f7cdf0)`,
          height: 300,
          width: 300,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: spinning ? "not-allowed" : "pointer",
          transition: "transform 1s ease-in-out",
          transform: spinning
            ? `rotate(${Math.random() * 360 + 3600}deg)`
            : "rotate(0deg)",
        }}
      >
        <p className="text-center text-white font-semibold text-lg">
          Spin to get a task!
        </p>
      </div>
      {selectedTask && (
        <div className="mt-6 text-center text-lg text-[#5e1a6b] font-semibold">
          <p>Try this to boost your mood:</p>
          <p>{selectedTask}</p>
        </div>
      )}
    </div>
  );
}
