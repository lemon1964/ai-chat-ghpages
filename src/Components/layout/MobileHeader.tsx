// frontend/src/Components/layout/MobileHeader.tsx
"use client";

import { FC } from "react";
import { localizationService } from "@/services/localizationService";
import { MODEL_OPTIONS } from "@/lib/ModelOptions";
import Link from "next/link";

export interface MobileHeaderProps {
  onMenuToggle(): void;
  onLanguageChange(lang: "ru" | "en"): void;
  modelType: ModelType;
  selectedModel: string;
  onModelTypeChange(type: ModelType): void;
  onModelChange(model: string): void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  onMenuToggle,
  onLanguageChange,
  modelType,
  selectedModel,
  onModelTypeChange,
  onModelChange,
}) => {
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

      {/* Центр: язык и модель */}
      <div className="flex-1 mx-2 space-y-1">
        <div className="flex justify-center space-x-1">
          <button
            onClick={() => onLanguageChange("en")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange("ru")}
            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
          >
            RU
          </button>
        </div>
        <div className="flex justify-center space-x-1">
          <select
            value={modelType}
            onChange={e => onModelTypeChange(e.target.value as ModelType)}
            className="bg-gray-700 text-white text-xs rounded px-1 py-0.5"
          >
            <option value="text">{localizationService.get("Texts")}</option>
            <option value="code">{localizationService.get("Codes")}</option>
            <option value="image">{localizationService.get("Images")}</option>
          </select>
          <select
            value={selectedModel}
            onChange={e => onModelChange(e.target.value)}
            className="bg-gray-700 text-white text-xs rounded px-1 py-0.5"
          >
            {MODEL_OPTIONS[modelType].map(m => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-200">
          <Link href="/about" className="underline hover:text-blue-400">
            📜
          </Link>
        </p>
      </div>
    </header>
  );
};
