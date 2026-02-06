"use client";

import Image from "next/image";
import { useState } from "react";

const EthicalBackground = ({ formData, onInputChange }) => {
  // const [selectedEthnicBackground, setSelectedEthnicBackground] =
  //   useState(null);

  const ethnicOptions = [
    { id: "white-caucasian", label: "White / Caucasian" },
    { id: "asian", label: "Asian" },
    { id: "hispanic-latino", label: "Hispanic / Latino" },
    { id: "african-american", label: "African American" },
    { id: "native-american", label: "Native American" },
    { id: "middle-eastern", label: "Middle Eastern" },
    { id: "south-asian", label: "South Asian" },
    { id: "pacific-islander", label: "Pacific Islander" },
    { id: "alaska-native", label: "Alaska Native" },
    { id: "north-african", label: "North African" },
    { id: "native-hawaiian", label: "Native Hawaiian" },
    { id: "southeast-asian", label: "Southeast Asian" },
    { id: "east-african", label: "East African" },
    { id: "west-african", label: "West African" },
    { id: "arab", label: "Arab" },
    { id: "romani", label: "Romani" },
    { id: "caribbean", label: "Caribbean" },
    { id: "eastern-european", label: "Eastern European" },
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-2">
        What's Your Ethnic Background
      </h2>

      <p className="text-center text-gray-300 text-[14px] sm:text-[16px] md:text-[18px] mb-6 sm:mb-8 px-2">
        Select your ethnic background to personalize your soulmate art{" "}
      </p>

      <div className="flex flex-col gap-3 sm:gap-4 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
        {ethnicOptions.map((option) => (
          <button
            key={option.id}
            className="w-full"
            onClick={() => onInputChange("ethnicBackground", option.id)}
          >
            <div
              className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
               ${
                 formData.ethnicBackground === option.id
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
                  formData.ethnicBackground === option.id
                    ? "bg-[#AABFFF]"
                    : "border border-[#AABFFF]"
                }`}
              />
            </div>
          </button>
        ))}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default EthicalBackground;
