// ai-chat-ghpages/src/components/features/common/ClientChatPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Notification from "@features/common/Notification";
import { localizationService } from "@/services/localizationService";
import { Layout } from "@/components/features/layout/Layout";
import { ChatWindow } from "@/components/features/chat/ChatWindow";
import { modelActions } from "@/reducers/modelReducer";
import { languageActions } from "@/reducers/languageReducer";
import { ErrorBoundary } from "@/components/ui/common/ErrorBoundary";

export default function ChatPage() {
  const dispatch = useDispatch();
  const modelType = useSelector((state: RootState) => state.model.modelType);
  const selectedModel = useSelector((state: RootState) => state.model.selectedModel);
  const { setModelType, setModel } = modelActions;
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(
    null
  );

  useSelector((state: RootState) => state.language.current); // подписка на изменение языка

  useEffect(() => {
    // Пингуем Render фронт и бэк
    fetch("https://ai-chat-frontend-wy6h.onrender.com/", { mode: "no-cors" }).catch(() => {});
    fetch("https://ai-chat-backend-3cba.onrender.com/healthz/", { mode: "no-cors" }).catch(() => {});
  }, []);
  

  return (
    <div className="flex flex-col h-screen">
      <Notification />
      <Layout
        onLanguageChange={newLang => {
          dispatch(languageActions.setLanguage(newLang));
          localizationService.setLanguageAndSync(newLang);
        }}
        modelType={modelType}
        selectedModel={selectedModel}
        onModelTypeChange={type => dispatch(setModelType(type))}
        onModelChange={modelId => dispatch(setModel(modelId))}
        onCategorySelect={(id, name) => setSelectedCategory({ id, name })}
      >
        {selectedCategory ? (
          <ErrorBoundary>
            <ChatWindow categoryId={selectedCategory.id} categoryName={selectedCategory.name} />
          </ErrorBoundary>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            {localizationService.get("SelectCategory")}
          </div>
        )}
      </Layout>
    </div>
  );
}