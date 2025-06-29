// ai-chat-ghpages/src/Components/layout/Layout.tsx
import { FC, ReactNode, useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";
import { CategoryList } from "@/components/features/chat/CategoryList";

export type LayoutProps = {
  children: ReactNode;
  onLanguageChange: (lang: "ru" | "en") => void;
  onCategorySelect: (id: string, name: string) => void;
  modelType: ModelType;
  selectedModel: string;
  onModelTypeChange: (type: ModelType) => void;
  onModelChange: (model: string) => void;
};

export const Layout: FC<LayoutProps> = ({
  children,
  onLanguageChange,
  modelType,
  selectedModel,
  onModelTypeChange,
  onModelChange,
  onCategorySelect,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const handleCategory = (id: string, name: string) => {
    onCategorySelect(id, name);
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <MobileHeader
        onMenuToggle={() => setMenuOpen(o => !o)}
        onLanguageChange={onLanguageChange}
        modelType={modelType}
        selectedModel={selectedModel}
        onModelTypeChange={onModelTypeChange}
        onModelChange={onModelChange}
      />

      <DesktopHeader
        onLanguageChange={onLanguageChange}
        modelType={modelType}
        selectedModel={selectedModel}
        onModelTypeChange={onModelTypeChange}
        onModelChange={onModelChange}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* desktop sidebar */}
        <aside className="hidden md:block md:w-1/5 border-r overflow-y-auto p-4">
          <CategoryList onSelect={handleCategory} />
        </aside>

        {/* mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
            <aside className="absolute left-0 top-0 w-3/4 h-full bg-gray-900 p-4">
              <CategoryList onSelect={handleCategory} />
            </aside>
          </div>
        )}

        <main className="flex-1 flex flex-col">{children}</main>

      </div>
    </div>
  );
};
