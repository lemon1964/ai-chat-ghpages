// ai-chat-ghpages/src/Components/chat/CategoryList.tsx
"use client";
import { FC } from "react";
// import Link from "next/link";
// import { localizationService } from "@/services/localizationService";
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
        <div className="p-4 text-gray-600">
          Здесь тоже что-то напишем
        </div>
      </div>
    </>
  );
};
