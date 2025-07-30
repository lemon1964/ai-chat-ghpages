// ai-chat-ghpages/src/Components/layout/Layout.tsx
import { FC, ReactNode, useEffect, useState } from "react";
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

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerValue, setTimerValue] = useState(999);
  const [resourcePercent, setResourcePercent] = useState(100);
  const [shouldAnimateRubicon, setShouldAnimateRubicon] = useState(false);

  const t = 40;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive) {
      setTimerValue(t);
      timer = setInterval(() => {
        setTimerValue(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          const newVal = prev - 1;
          if (newVal === 30) {
            setShouldAnimateRubicon(true);
          }
          setResourcePercent(Math.max(0, (newVal / t) * 100));
          return newVal;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive]);

  useEffect(() => {
    if (timerValue === 0) {
      // Остановить музыку
      audioService.stopMusic();
  
      // Звук помех и голос "Connection lost"
      setTimeout(() => {
        audioService.playSound("relay", formatFileUrl("sounds/white-noise-relay.wav"));
      }, 2000);
      setTimeout(() => {
        audioService.speak("Connection lost");
      }, 4000);
  
      // Через 2 сек — падающая мебель и звуки разбитого стекла
      setTimeout(() => {
        audioService.playSound("alarm", formatFileUrl("sounds/feds-coming-in.mp3"));
      }, 8000);
  
      // 2 ругательства
      setTimeout(() => {
        audioService.playSound("rel", formatFileUrl("sounds/swearing-federal-1.wav")); // "What the hell is this?"
      }, 18000);
      setTimeout(() => {
        audioService.playSound("rel2", formatFileUrl("sounds/swearing-federal-2.wav")); // "Goddammit."
      }, 20000);
    }
  }, [timerValue]);
  

  const handleCategory = (id: string, name: string) => {
    onCategorySelect(id, name);
    setMenuOpen(false);
    if (!isTimerActive) {
      audioService.playMusic("/music/polonaise.mp3");
      setIsTimerActive(true);
    }
  };

  const handleGoToRender = () => {
    audioService.stopMusic();
    window.open("https://ai-chat-frontend-wy6h.onrender.com/", "_blank");
  };

  return (
    <div className="flex flex-col h-screen">
      <MobileHeader
        isTimerActive={isTimerActive}
        timerValue={timerValue}
        resourcePercent={resourcePercent}
        onMenuToggle={() => setMenuOpen(o => !o)}
        handleGoToRender={handleGoToRender}
        shouldAnimateRubicon={shouldAnimateRubicon}
      />
      <DesktopHeader
        isTimerActive={isTimerActive}
        timerValue={timerValue}
        resourcePercent={resourcePercent}
        handleGoToRender={handleGoToRender}
        shouldAnimateRubicon={shouldAnimateRubicon}
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
