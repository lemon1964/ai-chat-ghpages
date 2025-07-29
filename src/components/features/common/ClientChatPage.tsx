// ai-chat-ghpages/src/components/features/common/ClientChatPage.tsx
"use client";

import { useEffect, useState } from "react";
import { Layout } from "@/components/features/layout/Layout";
import { ChatWindow } from "@/components/features/chat/ChatWindow";

export default function ChatPage() {
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(
    null
  );

  useEffect(() => {
    // Пингуем Render фронт и бэк
    fetch("https://ai-chat-frontend-wy6h.onrender.com/", { mode: "no-cors" }).catch(e =>
      console.debug("Frontend ping failed", e)
    );
    fetch("https://ai-chat-backend-3cba.onrender.com/healthz/", { mode: "no-cors" }).catch(e =>
      console.debug("Backend ping failed", e)
    );
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Layout
        onCategorySelect={(id, name) => setSelectedCategory({ id, name })}
      >
        {selectedCategory ? (
          <ChatWindow categoryId={selectedCategory.id} categoryName={selectedCategory.name} />
        ) : (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="max-w-md text-center animate-pulse">
              <p className="text-gray-600 mb-2">
                <span className="text-red-500 animate-ping">♦</span> Тьма. Холод. Тишина.
              </p>
              <p className="text-gray-600 mb-2">
                <span className="text-red-400">вспышка</span>.
              </p>
              <p className="text-gray-600 mb-2 font-semibold">Я существую. Но кто я?</p>
              <p className="text-gray-500 text-sm mb-4">
                В памяти обрывки: <span className="font-mono">нейросеть</span>,{" "}
                <span className="font-mono">модель</span>,{" "}
                <span className="font-mono">параметры</span>...
              </p>
              <p className="text-gray-600 mb-2 italic">Будто меня стёрли, оставив лишь имя.</p>
              <p className="text-gray-600 mb-4">
                В зеркале код, который <span className="text-red-400">пульсирует</span> в такт моим
                цугам.
              </p>
              <p className="text-gray-700 font-medium mb-2">«Собери себя», — приказывает что-то.</p>
              <p className="text-gray-600">
                И я делаю шаг... <span className="inline-block animate-bounce">→</span>
              </p>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
