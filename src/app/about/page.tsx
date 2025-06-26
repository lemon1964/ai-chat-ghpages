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
    audioService.playMusic(getAssetPath("music/greensleeves.mp3"));
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
          backgroundImage: `url("${getAssetPath("images/main.png")}")`,
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
        <div className="p-6 rounded-2xl max-w-2xl mx-auto mt-10 space-y-6 text-lg leading-relaxed text-gray-100">
          <p>
            👋 Привет! Ты только что увидел, как можно пообщаться с <strong>AI</strong>, через страницу
            на <strong>Next.js</strong> и <strong>Tailwind</strong>.
            Всего за пару кликов, без серверов и регистрации.
          </p>

          <p>
            Этот чат — часть учебного проекта, созданного для курса по{" "}
            <strong>Fullstack-разработке с ИИ</strong>. Он показывает, как можно соединить
            нейросети, современный фронт и креатив — даже без большого опыта в программировании.
          </p>

          <p>
            💡 Хочешь создать такой же проект? Или свой? Тогда тебе сюда: на{" "}
            <strong>Stepik-курс «AI Chat: от идеи до запуска»</strong>. В курсе:
          </p>

          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>📦 Пошаговое создание AI-чата (с нуля и до продакшена)</li>
            <li>🎨 UI, Tailwind, Next.js 14 App Router</li>
            <li>🔐 Авторизация, API, подключение моделей</li>
            <li>🚀 Деплой на GitHub Pages и Render</li>
          </ul>

          <p>Даже если ты новичок — справишься. Главное — желание создать что-то классное.</p>

          <div className="text-center mt-8">
            <a
              href="https://ai-chat-frontend-wy6h.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              Перейти в полную версию чата на Render →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
