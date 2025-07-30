// ai-chat-ghpages/src/components/features/layout/DesktopHeader.tsx
"use client";

import { FC } from "react";

export interface DesktopHeaderProps {
  handleGoToRender: () => void;
  isTimerActive: boolean;
  timerValue: number;
  resourcePercent: number;
  shouldAnimateRubicon: boolean;
}

export const DesktopHeader: FC<DesktopHeaderProps> = ({
  handleGoToRender,
  isTimerActive,
  timerValue,
  resourcePercent,
  shouldAnimateRubicon,
}) => {
  const barColor = isTimerActive ? "bg-red-500" : "bg-green-400";
  const timeColor = isTimerActive ? "text-red-400" : "text-green-400";

  return (
    <header className="hidden md:flex sticky top-0 z-40 bg-gray-800 px-4 py-3 items-center justify-between">
      <div
        className={`text-xl animate-pulse ${isTimerActive ? "text-red-500" : "text-green-400"}`}
        title={isTimerActive ? "Энергия иссякает" : "Энергия активна"}
      >
        @
      </div>
      <div className="flex items-center gap-4">
        <div className="w-24 h-3 bg-gray-600 rounded overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500`}
            style={{ width: `${resourcePercent}%` }}
          ></div>
        </div>
        <div className={`font-mono text-lg ${timeColor}`}>{timerValue}</div>
      </div>
      <button
        onClick={handleGoToRender}
        className={`underline hover:text-blue-400 ${
          shouldAnimateRubicon ? "animate-pulse text-green-400" : "text-gray-300"
        }`}
      >
        Rubicon 📡
      </button>
      {/* <button onClick={handleGoToRender} className="underline text-gray-300 hover:text-blue-400">
        Rubicon 📡
      </button> */}
    </header>
  );
};
