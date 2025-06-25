// frontend/src/Components/layout/DesktopHeader.tsx
"use client";

import { FC, useEffect } from "react";
import { localizationService } from "@/services/localizationService";
import { audioService } from "@/services/audioService";
import { modelActions } from "@/reducers/modelReducer";
import { MODEL_OPTIONS } from "@/lib/ModelOptions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import Link from "next/link";

export interface DesktopHeaderProps {
  onLanguageChange: (lang: "ru" | "en") => void;
  modelType: ModelType;
  selectedModel: string;
  onModelTypeChange: (type: ModelType) => void;
  onModelChange: (model: string) => void;
}

export const DesktopHeader: FC<DesktopHeaderProps> = ({
  onLanguageChange,
  modelType,
  selectedModel,
  onModelTypeChange,
  onModelChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Фоновая музыка
  useEffect(() => {
    audioService.playMusic("/music/greensleeves.mp3");
    return () => void audioService.stopMusic();
  }, []);

  return (
    <header className="hidden md:flex sticky top-0 z-40 bg-gray-800 px-4 py-3 items-center justify-between">
      {/* Смена языка */}
      <div className="flex gap-2">
        <button
          onClick={() => onLanguageChange("en")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange("ru")}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          RU
        </button>
      </div>

      {/* Селекторы модели */}
      <div className="flex items-center space-x-4">
        <select
          value={modelType}
          onChange={e => {
            const newType = e.target.value as ModelType;
            onModelTypeChange(newType);
            dispatch(modelActions.setModelType(newType));
          }}
          className="border px-2 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          <option value="text">{localizationService.get("Texts")}</option>
          <option value="code">{localizationService.get("Codes")}</option>
          <option value="image">{localizationService.get("Images")}</option>
        </select>

        <select
          value={selectedModel}
          onChange={e => {
            const newModel = e.target.value;
            onModelChange(newModel);
            dispatch(modelActions.setModel(newModel));
          }}
          className="border px-2 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          {MODEL_OPTIONS[modelType].map(m => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-200">
          <Link href="/about" className="underline hover:text-blue-400">
            {localizationService.get("Info")}
          </Link>
        </p>
      </div>
    </header>
  );
};
