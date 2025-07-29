// ai-chat-ghpages/src/Components/layout/Layout.tsx
import { FC, ReactNode, useState, useEffect } from "react";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";
import { CategoryList } from "@/components/features/chat/CategoryList";
import { audioService } from "@/services/audioService";
import { formatFileUrl } from "@/utils/formatFileUrl";

export type LayoutProps = {
  children: ReactNode;
  onCategorySelect: (id: string, name: string) => void;
};

export const Layout: FC<LayoutProps> = ({ children, onCategorySelect }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    audioService.playMusic(formatFileUrl("music/polonaise.mp3"));
    return () => void audioService.stopMusic();
  }, []);

  const handleCategory = (id: string, name: string) => {
    onCategorySelect(id, name);
    setMenuOpen(false);
  };

  const handleGoToRender = () => {
    audioService.stopMusic();
    window.open("https://ai-chat-frontend-wy6h.onrender.com/", "_blank");
  };

  return (
    <div className="flex flex-col h-screen">
      <MobileHeader onMenuToggle={() => setMenuOpen(o => !o)} handleGoToRender={handleGoToRender} />
      <DesktopHeader handleGoToRender={handleGoToRender} />
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
