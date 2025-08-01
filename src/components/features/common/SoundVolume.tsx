// ai-chat-ghpages/src/components/features/common/SoundVolume.tsx
"use client";
import { FC, useState, useEffect } from "react";
import { audioService } from "@/services/audioService";

const SoundVolume: FC = () => {
  const [musicVol, setMusicVol] = useState<number>(audioService.getMusicVolume());

  useEffect(() => {
    setMusicVol(audioService.getMusicVolume());
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          {"Громкость музыки"}
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={musicVol}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setMusicVol(v);
            audioService.setMusicVolume(v);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SoundVolume;
