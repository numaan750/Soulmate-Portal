"use client";

import Image from "next/image";
import { useState } from "react";

const Step1Welcome = ({ formData, onInputChange }) => {
  // const [selectedGender, setSelectedGender] = useState(null);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-2">
        Select Soulmate Gender
      </h2>

      <p className="text-center text-gray-300 text-[14px] sm:text-[16px] md:text-[18px] mb-6 sm:mb-8 px-2">
        Choose your soulmate's gender for personalized art
      </p>

      <div className="flex flex-col gap-3 sm:gap-4">
        <button
          className="w-full"
          onClick={() => onInputChange("gender", "male")}
        >
          <div
            className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
            ${
              formData.gender === "male"
                ? "border-[#707DA7] bg-[#363B4F]"
                : "border-[#303445] bg-[#303445]"
            }`}
          >
            {" "}
            <div className="flex items-center gap-[8px] sm:gap-[12px]">
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-white flex-shrink-0">
                <Image
                  src="/svgs/Male.svg"
                  alt="Male"
                  width={18}
                  height={18}
                  className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <span className="font-semibold text-white tracking-wide text-[14px] sm:text-[16px] md:text-[18px]">
                Male
              </span>
            </div>
            <div
              className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] mr-[4px] sm:mr-[8px] rounded-full flex-shrink-0
             ${formData.gender === "male" ? "bg-[#AABFFF]" : "border border-[#AABFFF]"}`}
            />{" "}
          </div>
        </button>
        <button
          className="w-full"
          onClick={() => onInputChange("gender", "female")}
        >
          <div
            className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
            ${
              formData.gender === "female"
                ? "border-[#707DA7] bg-[#363B4F]"
                : "border-[#303445] bg-[#303445]"
            }`}
          >
            <div className="flex items-center gap-[8px] sm:gap-[12px]">
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-white flex-shrink-0">
                <Image
                  src="/svgs/Female.svg"
                  alt="Female"
                  width={18}
                  height={18}
                  className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <span className="font-semibold text-white tracking-wide text-[14px] sm:text-[16px] md:text-[18px]">
                Female
              </span>
            </div>
            <div
              className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] mr-[4px] sm:mr-[8px] rounded-full flex-shrink-0
            ${formData.gender === "female" ? "bg-[#AABFFF]" : "border border-[#AABFFF]"}`}
            />{" "}
          </div>
        </button>
        <button
          className="w-full"
          onClick={() => onInputChange("gender", "other")}
        >
          <div
            className={`flex items-center cursor-pointer justify-between px-[12px] sm:px-[16px] py-[10px] sm:py-[12px] rounded-full border transition-all
            ${
              formData.gender === "other"
                ? "border-[#707DA7] bg-[#363B4F]"
                : "border-[#303445] bg-[#303445]"
            }`}
          >
            {" "}
            <div className="flex items-center gap-[8px] sm:gap-[12px]">
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-white flex-shrink-0">
                <Image
                  src="/svgs/PREFER-NOT-TO-SAY.svg"
                  alt="PREFER-NOT-TO-SAY"
                  width={18}
                  height={18}
                  className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <span className="font-semibold text-white tracking-wide text-[14px] sm:text-[16px] md:text-[18px]">
                Prefer Not To Say
              </span>
            </div>
            <div
              className={`w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] mr-[4px] sm:mr-[8px] rounded-full flex-shrink-0
             ${formData.gender === "other" ? "bg-[#AABFFF]" : "border border-[#AABFFF]"}`}
            />{" "}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Step1Welcome;
