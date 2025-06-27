// ai-chat-ghpages/src/Components/chat/CategoryList.tsx
"use client";
import { FC } from "react";
import { demoCategories } from "@/lib/demoChat";

interface CategoryListProps {
  onSelect: (id: string, name: string) => void;
}

export const CategoryList: FC<CategoryListProps> = ({ onSelect }) => {
  return (
    <>
      <div className="text-white">
        {demoCategories.map(cat => (
          <button
            key={cat.id}
            className="block w-full text-left px-3 py-2 mb-2 border rounded hover:bg-gray-100"
            onClick={() => onSelect(cat.id, cat.name)}
          >
            {cat.name}
          </button>
        ))}
        <div className="mt-4 border border-green-500 text-green-500 italic rounded px-3 py-2 text-sm">
          🧭 Пробежались по темам? Нажмите 📜 {" "}
          <span className=" text-blue-500 font-semibold">«Инфо»</span> вверху — там всё о курсе: что
          вы получите, как всё устроено, и как создать свой AI-чат.
        </div>
      </div>
    </>
  );
};
