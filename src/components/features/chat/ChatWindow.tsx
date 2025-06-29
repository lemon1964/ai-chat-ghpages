// frontend/src/Components/chat/ChatWindow.tsx
"use client";

import { FC, useState, useEffect, useRef } from "react";
import { ImageOutput } from "../../ui/chat/ImageOutput";
import { localizationService } from "@/services/localizationService";
import SoundVolume from "@/components/features/common/SoundVolume";
import ModalAudio from "@/components/ui/common/ModalAudio";
import { demoMessages } from "@/data/demoChat";
import dynamic from "next/dynamic";

// Импорт без SSR
const MarkdownRenderer = dynamic(
  () => import("../common/MarkdownRenderer").then(mod => mod.MarkdownRenderer),
  { ssr: false }
);

export const ChatWindow: FC<ChatWindowProps> = ({ categoryId, categoryName }) => {
  const messages = demoMessages[categoryId] || [];
  const [audioModalOpen, setAudioModalOpen] = useState(false);

  // PAGE_SIZE и infinite scroll
  const PAGE_SIZE = 20;
  const [limit, setLimit] = useState(PAGE_SIZE);

  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [categoryId]);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [categoryId]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.scrollTop < 50 && messages && limit < messages.length) {
      setLimit(prev => Math.min(prev + PAGE_SIZE, messages.length));
    }
  };

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Заголовок рубрики + кнопка Audio Settings */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-2xl font-bold">{categoryName}</h2>
        <button
          className="px-3 py-1  bg-gray-500 text-white rounded hover:bg-blue-600"
          onClick={() => setAudioModalOpen(true)}
        >
          🔊 {localizationService.get("AudioSettings")}
        </button>
      </div>
      {/* Audio Settings Modal */}
      {audioModalOpen && (
        <ModalAudio
          title={localizationService.get("AudioSettings")}
          onClose={() => setAudioModalOpen(false)}
        >
          <SoundVolume />
        </ModalAudio>
      )}
      <div className="relative flex-1 overflow-hidden">
        <button
          onClick={scrollToBottom}
          className="absolute top-2 right-4 z-10 hover:bg-gray-300 rounded-full p-1 shadow"
          title="Go to latest message"
        >
          ▼
        </button>

        <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4" onScroll={handleScroll}>
          <div ref={topRef} />
          {messages.map((msg: Message) => (
            <div key={msg.id} className="space-y-1">
              <div className="ml-4 text-gray-400">{msg.prompt}</div>
              {msg.answers.map(ans =>
                /\.(png|jpe?g|gif)$/i.test(ans.content) ? (
                  <ImageOutput key={ans.id} url={ans.content} />
                ) : (
                  <div
                    key={ans.id}
                    className="mt-2 ml-8 bg-gray-800 text-white border border-gray-700 rounded-md p-3 flex items-start"
                  >
                    <div className="flex-1 min-w-0">
                      {typeof ans.content === "string" ? (
                        <MarkdownRenderer content={ans.content} />
                      ) : (
                        <div className="text-red-500 text-sm">
                          Ошибка: недопустимый контент ответа
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <button
          onClick={scrollToTop}
          className="absolute bottom-2 right-4 z-10 hover:bg-gray-300 rounded-full p-1 shadow"
          title="Go to first message"
        >
          ▲
        </button>
      </div>
    </div>
  );
};
