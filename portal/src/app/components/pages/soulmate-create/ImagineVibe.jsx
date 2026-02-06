"use client";

import { useState } from "react";

const ImagineVibes = ({ formData, onInputChange }) => {
  // const [selectedVibe, setSelectedVibe] = useState(null);

  const vibeOptions = [
    { id: "calm", label: "Calm" },
    { id: "energetic", label: "Energetic" },
    { id: "mysterious", label: "Mysterious" },
    { id: "romantic", label: "Romantic" },
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-2">
        How Do You Imagine Their Vibe
      </h2>

      <p className="text-center text-gray-300 text-[14px] sm:text-[16px] md:text-[18px] mb-6 sm:mb-8 px-2">
        Choose your soulmate's gender for personalized art
      </p>

      <div className="flex flex-col gap-3 sm:gap-4">
        {vibeOptions.map((option) => (
          <button
            key={option.id}
            className="w-full"
            onClick={() => onInputChange("vibe", option.id)}
          >
            <div
              className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
              ${
                formData.vibe === option.id
                  ? "border-[#707DA7] bg-[#363B4F]"
                  : "border-[#303445] bg-[#303445]"
              }`}
            >
              <div className="flex items-center gap-[8px] sm:gap-[12px] ml-[4px] sm:ml-[8px]">
                <span className="font-semibold text-white tracking-wide text-[14px] sm:text-[16px] md:text-[18px]">
                  {option.label}
                </span>
              </div>
              <div
                className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] mr-[4px] sm:mr-[8px] rounded-full flex-shrink-0 ${
                  formData.vibe === option.id
                    ? "bg-[#AABFFF]"
                    : "border border-[#AABFFF]"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImagineVibes;
