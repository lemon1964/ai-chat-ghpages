// ai-chat-ghpages/src/app/about/page.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import "@/styles/starry_sky_styles.css";
import { audioService } from "@/services/audioService";
import Notification from "@/Components/common/Notification";
import { localizationService } from "@/services/localizationService";
import { getAssetPath } from "@/utils/getAssetPath";


export default function UserProfilePage() {

  useEffect(() => {
    audioService.playMusic(getAssetPath('music/greensleeves.mp3'));
    return () => {
      audioService.stopMusic();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 1) Слой звёзд — CSS-анимация из starry_sky_styles.css */}
      <div id="stars" className="absolute inset-0"></div>
      <div id="stars2" className="absolute inset-0"></div>
      <div id="stars3" className="absolute inset-0"></div>

      {/* 2) Слой с полупрозрачным main.png */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${getAssetPath('images/main.png')}")`,
          opacity: 0.05, // регулируйте прозрачность
        }}
      />
      {/* 3) Контент страницы поверх обоих слоёв */}
      <div className="relative z-10 px-4 py-6 text-gray-200">
        <Notification />

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-indigo-600 bg-opacity-80 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {localizationService.get("ToHome")}
          </Link>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg">
          {localizationService.get("YourProfile")}
        </h1>
      </div>
    </div>
  );
}
