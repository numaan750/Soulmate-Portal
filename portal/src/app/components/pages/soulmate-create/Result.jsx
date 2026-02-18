"use client";

import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";

const Step7VisualStyle = ({
  formData,
  soulmateData,
  onInputChange,
  onDelete,
  goToChat,
}) => {
  const { createShareableLink } = useContext(AppContext);
  const [shareUrl, setShareUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const capitalizeWords = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const formatBirthDate = (dateStr) => {
    if (!dateStr) return "01 Jan 2002";
    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]} ${months[parts[1]]} ${parts[0]}`;
    }
    return dateStr;
  };

  const styles = [
    {
      title: "A glimpse into your connection",
      description:
        soulmateData?.glimpse ||
        "Your perfect soulmate is Pisces because they balance your practicality with deep emotions. Together, you create harmony and a bond filled with compassion.",
    },
    {
      title: "Compatibility",
      description:
        soulmateData?.compatibility ||
        "You and your soulmate share a natural emotional understanding. Your differences complement each other, creating balance and long-term growth",
    },
    {
      title: "Strengths",
      description:
        soulmateData?.strengths ||
        "You and your soulmate share emotional support, with respect forming the foundation of your bond. Together, you can overcome challenges and grow stronger.",
    },
    {
      title: "Weaknesses",
      description:
        soulmateData?.weaknesses ||
        "At times, mood swings or misunderstandings may create distance. To sustain balance, both must maintain individuality.",
    },
  ];

  const handleShare = async () => {
    try {
      setIsSharing(true);

      const shareData = {
        imageUrl: soulmateData?.imageUrl,
        title: "My Soulmate Sketch",
        description: "Check out my soulmate compatibility reading!",
        compatibilityScore: soulmateData?.compatibilityScore,
        birthDate: formatBirthDate(soulmateData?.birthDate),
        ethnicity: capitalizeWords(
          soulmateData?.ethnicBackground?.replace(/-/g, " "),
        ),
        personality: capitalizeWords(soulmateData?.vibe),
      };

      const result = await createShareableLink(shareData);

      if (result.status === "success") {
        const shareUrl = result.data.shareUrl;
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

  if (!soulmateData?.imageUrl) {
    return <div className="text-white">Loading soulmate...</div>;
  }
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold">
        Your Soulmate Sketch
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full lg:w-1/2 relative">
          <Image
            src={soulmateData.imageUrl}
            alt="Result"
            width={500}
            height={500}
            priority
            className="w-full object-contain rounded-2xl"
          />
        </div>

        <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-10 lg:space-y-12 items-center justify-center w-full lg:w-1/2">
          <div className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-6 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[14px] xl:text-[20px] text-center max-w-full px-2">
            <span className="border-r border-white pr-2 sm:pr-4 lg:pr-6 whitespace-nowrap">
              {formatBirthDate(soulmateData?.birthDate)}
            </span>
            <span className="border-r border-white pr-2 sm:pr-4 lg:pr-6 whitespace-nowrap">
              {capitalizeWords(
                soulmateData?.ethnicBackground?.replace(/-/g, " ") ||
                  "Middle Eastern",
              )}
            </span>
            <span className="whitespace-nowrap">
              {" "}
              {capitalizeWords(soulmateData?.vibe || "Romantic")}
            </span>
          </div>

          <div className="flex flex-col justify-center items-center w-full px-4">
            <h2 className="text-[18px] sm:text-[20px] lg:text-[24px]">
              Compatibility Score
            </h2>
            <div className="bg-[#AABFFF33] w-full max-w-[250px] sm:max-w-[350px] lg:max-w-[400px] h-2 rounded-full mt-3 sm:mt-4 mb-3 sm:mb-4">
              <div
                className="bg-[#AABFFF] h-2 rounded-full"
                style={{ width: `${soulmateData?.compatibilityScore || 96}%` }}
              ></div>
            </div>

            <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold">
              {soulmateData?.compatibilityScore || 96}%
            </span>
          </div>

          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 lg:gap-3 w-full px-2">
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
              onClick={onDelete}
              className="bg-red-600 p-4 sm:p-3 lg:p-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors flex-shrink-0"
              title="Delete Soulmate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            <button
              onClick={goToChat}
              className="bg-[#AABFFF] cursor-pointer flex items-center justify-center gap-2 sm:gap-3 text-black px-3 sm:px-6 lg:px-8 py-3 sm:py-3 rounded-full text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold transition-colors duration-200 whitespace-nowrap hover:bg-[#99AEFF]"
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
