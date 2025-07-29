// ai-chat-ghpages/src/Components/layout/DesktopHeader.tsx
"use client";
import { FC } from "react";

export interface DesktopHeaderProps {
  handleGoToRender: () => void;
}

export const DesktopHeader: FC<DesktopHeaderProps> = ({ handleGoToRender }) => {
  return (
    <header className="hidden md:flex sticky top-0 z-40 bg-gray-800 px-4 py-3 items-center justify-between">
      <button onClick={handleGoToRender} className="underline text-gray-300 hover:text-blue-400">
        Rubicon  📡
      </button>
    </header>
  );
};
