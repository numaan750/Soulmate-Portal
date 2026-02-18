"use client";
import React from "react";
import Image from "next/image";

const SoulmateLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      <Image
        src="/images/Soulmate-background.webp"
        alt="stars background"
        fill
        className="object-cover opacity-80"
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24">
          <Image
            src="/images/APP-ICON.png"
            alt="logo background"
            fill
            className="rounded-2xl sm:rounded-3xl object-cover"
          />
          <Image
            src="/images/Soulmate-star.webp"
            alt="loading star"
            fill
            className="object-contain animate-spin-slow z-10"
          />
        </div>
        <p className="text-white text-base sm:text-lg md:text-xl font-semibold mt-1 sm:mt-2">
          Find Your Soulmate...
        </p>
      </div>
      <p className="absolute bottom-6 sm:bottom-8 text-[#F8F9FA] text-[14px] sm:text-[18px] text-center px-4 font-light">
        Don't close app or lock device until finished.
      </p>
    </div>
  );
};

export default SoulmateLoadingScreen;
