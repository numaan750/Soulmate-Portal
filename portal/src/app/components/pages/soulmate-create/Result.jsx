"use client";

import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";

const Step7VisualStyle = ({ formData, onInputChange, goToChat }) => {
  const { createShareableLink } = useContext(AppContext);
  const [shareUrl, setShareUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const styles = [
    {
      title: "Strengths",
      description:
        "You and your soulmate share emotional support, with respect forming the foundation of your bond. Together, you can overcome challenges and grow stronger.",
    },
    {
      title: "Weaknesses",
      description:
        "At times, mood swings or misunderstandings may create distance. To sustain balance, both must maintain individuality.",
    },
    {
      title: "Compatibility",
      description:
        "You and your soulmate share a natural emotional understanding. Your differences complement each other, creating balance and long-term growth",
    },
    {
      title: "A glimpse into your connection",
      description:
        "Your perfect soulmate is Pisces because they balance your practicality with deep emotions. Together, you create harmony and a bond filled with compassion.",
    },
  ];

  const handleShare = async () => {
    try {
      setIsSharing(true);

      const shareData = {
        imageUrl: "/images/Result.webp",
        title: "My Soulmate Sketch",
        description: "Check out my soulmate compatibility reading!",
        compatibilityScore: 96,
        birthDate: "01 Jan 2002",
        ethnicity: "Middle Eastern",
        personality: "Romantic",
      };

      const result = await createShareableLink(shareData);

      if (result.status === "success") {
        const shareUrl = result.data.shareUrl;

        // Native Web Share API
        if (navigator.share) {
          try {
            await navigator.share({
              title: "My Soulmate Sketch 💕",
              text: "Check out my soulmate compatibility reading!",
              url: shareUrl,
            });
            console.log("Content shared successfully");
          } catch (shareError) {
            if (shareError.name !== "AbortError") {
              console.error("Share failed:", shareError);
              await fallbackShare(shareUrl);
            }
          }
        } else {
          await fallbackShare(shareUrl);
        }
      }
    } catch (error) {
      console.error("Share error:", error);
      alert("Failed to create share link. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const fallbackShare = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard! Share it anywhere you like.");
    } catch (error) {
      console.error("Clipboard error:", error);
      prompt("Copy this link to share:", url);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
        Your Soulmate Sketch
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/Result.webp"
            alt="Result"
            width={500}
            height={500}
            className="w-full object-contain rounded-2xl"
          />
        </div>

        <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-10 lg:space-y-12 items-center justify-center w-full lg:w-1/2">
          <div className="flex flex-row flex-nowrap justify-center items-center gap-2 sm:gap-4 lg:gap-6 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[24px] text-center overflow-x-auto max-w-full px-2">
            <span className="border-r border-white pr-2 sm:pr-4 lg:pr-6 whitespace-nowrap">
              01 Jan 2002
            </span>
            <span className="border-r border-white pr-2 sm:pr-4 lg:pr-6 whitespace-nowrap">
              Middle Eastern
            </span>
            <span className="whitespace-nowrap">Romantic</span>
          </div>

          <div className="flex flex-col justify-center items-center w-full px-4">
            <h2 className="text-[18px] sm:text-[20px] lg:text-[24px]">
              Compatibility Score
            </h2>
            <div className="bg-[#AABFFF33] w-full max-w-[250px] sm:max-w-[350px] lg:max-w-[400px] h-2 rounded-full mt-3 sm:mt-4 mb-3 sm:mb-4">
              <div
                className="bg-[#AABFFF] h-2 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>

            <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold">
              96%
            </span>
          </div>

          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full px-5">
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="bg-[#1A1B24] p-4 sm:p-3 lg:p-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2A2B34] transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSharing ? (
                <span className="text-sm">...</span>
              ) : (
                <Image
                  src="/svgs/SHARE.svg"
                  alt="Share"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                />
              )}
            </button>

            <button
              onClick={goToChat}
              className="bg-[#AABFFF] cursor-pointer flex items-center justify-center gap-2 sm:gap-3 text-black px-3 sm:px-10 lg:px-14 py-3 sm:py-3 rounded-full text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold transition-colors duration-200 whitespace-nowrap hover:bg-[#99AEFF] flex-shrink-0"
            >
              Chat With Soulmate
              <Image
                src="/svgs/CHAT.svg"
                alt="Chat"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {styles.map((style) => (
          <button
            key={style.title}
            onClick={() => onInputChange("visualStyle", style.title)}
            className={`p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col items-center text-center ${
              formData.visualStyle === style.title
                ? "border-[#363B4F] bg-[#AABFFF]/20"
                : "border-[#363B4F] bg-[#363B4F] hover:border-[#AABFFF80]"
            }`}
          >
            <span className="text-[18px] sm:text-[22px] lg:text-[28px] font-semibold text-[#AABFFF]">
              {style.title}
            </span>
            <span className="text-[14px] sm:text-[16px] lg:text-[20px] text-gray-300 mt-2 leading-relaxed">
              {style.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step7VisualStyle;
