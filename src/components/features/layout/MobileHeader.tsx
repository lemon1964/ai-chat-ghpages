// ai-chat-ghpages/src/Components/layout/MobileHeader.tsx
"use client";

import { FC } from "react";

export interface MobileHeaderProps {
  onMenuToggle(): void;
  handleGoToRender: () => void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ onMenuToggle, handleGoToRender }) => {
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
      <button onClick={handleGoToRender} className="text-white text-lg">
        📡
      </button>
    </header>
  );
};
