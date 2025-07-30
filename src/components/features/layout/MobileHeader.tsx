// ai-chat-ghpages/src/Components/layout/MobileHeader.tsx
"use client";

import { FC } from "react";

export interface MobileHeaderProps {
  onMenuToggle(): void;
  handleGoToRender: () => void;
  isTimerActive: boolean;
  timerValue: number;
  resourcePercent: number;
  shouldAnimateRubicon: boolean;
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  onMenuToggle,
  handleGoToRender,
  isTimerActive,
  timerValue,
  resourcePercent,
  shouldAnimateRubicon,
}) => {
  const barColor = isTimerActive ? "bg-red-500" : "bg-green-400";
  const timeColor = isTimerActive ? "text-red-400" : "text-green-400";
  return (
    <header className="md:hidden flex items-center justify-between bg-gray-800 px-3 py-2 shadow">
      {/* Левая кнопка: меню */}
      <button
        onClick={onMenuToggle}
        className="p-2 text-white hover:bg-gray-700 rounded"
        aria-label="Open menu"
      >
        ☰
      </button>
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
        className={`text-lg ${shouldAnimateRubicon ? "animate-pulse text-green-400" : "text-white"}`}
      >
        #📡
      </button>
    </header>
  );
};
