"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import AnyDream from "../components/pages/AnyDream";
import Nightmare from "../components/pages/Nightmare";
import DayDream from "../components/pages/DayDream";
import Emotional from "../components/pages/Emotional";
import LifePath from "../components/pages/LifePath";
import NameAnalysis from "../components/pages/NameAnalysis";
import EnergyNumbers from "../components/pages/EnergyNumbers";
import ProfileDropdown from "@/components/ProfileDropdown";
import MyGallery from "../components/pages/MyGallery";
import PremiumPlans from "../components/pages/PremiumPopup";
import PremiumPopup from "../components/pages/PremiumPopup";
import FindSoulmate from "../components/pages/FindSoulmate";
import { Menu, X } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ConfirmLeavePopup from "../components/ConfirmLeavePopup";
import { AppContext } from "@/context/Appcontext";

const SoulmateSidebar = () => {
  const { isPremium, premiumExpiryDate } = useContext(AppContext);
  const [activeSection, setActiveSection] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState(null);
  const [isPremiumPopupOpen, setIsPremiumPopupOpen] = useState(false);
  const [soulmateStep, setSoulmateStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [hasMessages, setHasMessages] = useState(false);

  const chatSections = [
    "any-dream",
    "nightmare",
    "day-dream",
    "emotional",
    "life-path",
    "name-analysis",
    "energy-numbers",
  ];

  const handleSectionChange = (section) => {
    if (chatSections.includes(activeSection) && hasMessages) {
      setPendingSection(section);
      setShowLeavePopup(true);
    } else {
      setActiveSection(section);
      setHasMessages(false);
    }
  };

  const handlePremiumSection = (section) => {
    if (
      isPremium &&
      premiumExpiryDate &&
      new Date() < new Date(premiumExpiryDate)
    ) {
      handleSectionChange(section);
    } else {
      setIsPremiumPopupOpen(true);
    }
  };

  const soulmateStepTitles = {
    1: "Create Your Soulmate",
    2: "Create Your Soulmate",
    3: "Create Your Soulmate",
    4: "Create Your Soulmate",
    5: "Create Your Soulmate",
    6: "Create Your Soulmate",
    7: "Find Your Soulmate",
    8: "Chat with Soulmate",
  };

  return (
    <ProtectedRoute>
      <>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden fixed z-50 p-3 bg-black w-full flex items-center gap-5"
          >
            <Menu size={24} className="text-white" />
            <span className="text-white font-semibold text-[18px]">
              Soulmate Art
            </span>
          </button>
        )}
        {open && (
          <div
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <div className="flex h-screen bg-black font-sans overflow-hidden">
          <aside
            className={`fixed top-0 left-0 z-50 h-screen w-64 text-white p-6 flex flex-col overflow-hidden transform transition-transform duration-300
           ${open ? "translate-x-0" : "-translate-x-full"}
           lg:translate-x-0 lg:static
          `}
          >
            {" "}
            <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/Ai-Soulmate-Art.webp"
                  alt="Ai-Soulmate-Art.webp"
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
                <h3 className="font-bold text-[#AABFFF]">Soulmate Art</h3>
              </div>
              <button
                className="lg:hidden text-white"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto scrollbar-hide">
              <button
                onClick={() => {
                  handleSectionChange("home");
                  setActiveSubTab(null);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "home"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "home"
                      ? "/svgs/home-tab-active.svg"
                      : "/svgs/home-tab.svg"
                  }
                  alt="Home icon"
                  width={16}
                  height={16}
                />
                <span className=" font-medium text-[14px]">Home</span>
              </button>
              <button
                onClick={() => {
                  setActiveSection("find-soulmate");
                  setActiveSubTab(null);
                }}
                className={`w-full text-left cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  activeSection === "find-soulmate"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "find-soulmate"
                      ? "/svgs/FIND-YOUR-SOULMATE-Active.svg"
                      : "/svgs/FIND-YOUR-SOULMATE.svg"
                  }
                  alt="Home icon"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">
                  Find Your Soulmate
                </span>
              </button>
              <div className="pt-4">
                <p className="text-[12px] text-[#59606C] tracking-wider px-4 mb-2">
                  Dream Wisdom
                </p>
              </div>
              <button
                // onClick={() => {
                //   setActiveSection("any-dream");
                //   setActiveSubTab("any-dream");
                //   setOpen(false);
                // }}
                // onClick={() => setIsPremiumPopupOpen(true)}
                onClick={() => handlePremiumSection("any-dream")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "any-dream"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "any-dream"
                      ? "/svgs/Any-Dream-active.svg"
                      : "/svgs/Any-Dream.svg"
                  }
                  alt="Any-Dream."
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">Any Dream</span>
              </button>
              <button
                onClick={() => {
                  handleSectionChange("nightmare");
                  setActiveSubTab("nightmare");
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "nightmare"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "nightmare"
                      ? "/svgs/NIGHT-MARE-active.svg"
                      : "/svgs/NIGHT-MARE.svg"
                  }
                  alt="NIGHT-MARE"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">
                  Nightmare Dream
                </span>
              </button>
              <button
                // onClick={() => {
                //   setActiveSection("day-dream");
                //   setActiveSubTab("day-dream");
                //   setOpen(false);
                // }}
                // onClick={() => setIsPremiumPopupOpen(true)}
                onClick={() => handlePremiumSection("day-dream")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "day-dream"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "day-dream"
                      ? "/svgs/Day-Dream-active.svg"
                      : "/svgs/Day-Dream.svg"
                  }
                  alt="Day-Dream"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">Day Dream</span>
              </button>
              <button
                // onClick={() => {
                //   setActiveSection("emotional");
                //   setActiveSubTab("emotional");
                //   setOpen(false);
                // }}
                // onClick={() => setIsPremiumPopupOpen(true)}
                onClick={() => handlePremiumSection("emotional")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "emotional"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "emotional"
                      ? "/svgs/Emotional-Dream-active.svg"
                      : "/svgs/Emotional-Dream.svg"
                  }
                  alt="Emotional-Dream"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">
                  Emotional Dream
                </span>
              </button>
              <div className="pt-4">
                <p className="text-xs text-gray-500 tracking-wider px-4 mb-2">
                  Numerology
                </p>
              </div>
              <button
                // onClick={() => {
                //   setActiveSection("life-path");
                //   setActiveSubTab("life-path");
                //   setOpen(false);
                // }}
                // onClick={() => setIsPremiumPopupOpen(true)}
                onClick={() => handlePremiumSection("life-path")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "life-path"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "life-path"
                      ? "/svgs/Life-Path-active.svg"
                      : "/svgs/Life-Path.svg"
                  }
                  alt="Life-Path"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">Life Path</span>
              </button>
              <button
                onClick={() => {
                  handleSectionChange("name-analysis");
                  setActiveSubTab("name-analysis");
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 ${
                  activeSection === "name-analysis"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "name-analysis"
                      ? "/svgs/NAME-ANALYSIS-active.svg"
                      : "/svgs/NAME-ANALYSIS.svg"
                  }
                  alt="Home icon"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">Name Analysis</span>
              </button>
              <button
                // onClick={() => {
                //   setActiveSection("energy-numbers");
                //   setActiveSubTab("energy-numbers");
                //   setOpen(false);
                // }}
                // onClick={() => setIsPremiumPopupOpen(true)}
                onClick={() => handlePremiumSection("energy-numbers")}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer duration-200 flex items-center gap-3 pb-4 ${
                  activeSection === "energy-numbers"
                    ? "bg-[#222430] text-white shadow-lg"
                    : "text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                <Image
                  src={
                    activeSection === "energy-numbers"
                      ? "/svgs/ENERGY-NUMBERS-active.svg"
                      : "/svgs/ENERGY-NUMBERS.svg"
                  }
                  alt="Home icon"
                  width={20}
                  height={20}
                />
                <span className=" font-medium text-[14px]">Energy Numbers</span>
              </button>
            </nav>
            <div className="border-t border-gray-800 pt-4 flex-shrink-0">
              <button
                onClick={() => setIsPremiumPopupOpen(true)}
                className="w-full text-left cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-[#F8F9FACC] hover:bg-gray-800/50 hover:text-white group"
              >
                <Image
                  src={
                    activeSection === "Primium Plans"
                      ? "/svgs/primium-active.svg"
                      : "/svgs/primium.svg"
                  }
                  alt="Home icon"
                  width={20}
                  height={20}
                  className="opacity-70 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                />
                <span className="text-sm font-medium">Premium Plans</span>
              </button>
            </div>
          </aside>
          <div className="w-full lg:w-[80%] h-full bg-black flex overflow-hidden">
            <main className="flex-1 bg-[#222430] text-white flex flex-col lg:mt-10 pt-16 lg:pt-0 rounded-t-2xl rounded-b-r-2xl overflow-hidden">
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-4 max-w-full flex-1 flex flex-col overflow-hidden">
                  <div className="sticky top-0 z-10 bg-[#222430] flex items-center justify-between mb-8 border-b pb-2 border-[#AABFFF4D] px-2 py-2">
                    <h3 className="text-[20px] font-bold tracking-tight flex">
                      {activeSection === "home" && "Home"}

                      {activeSection === "find-soulmate" &&
                        soulmateStepTitles[soulmateStep]}
                      {activeSection === "any-dream" && "Any Dream"}
                      {activeSection === "nightmare" && "Nightmare Dream"}
                      {activeSection === "day-dream" && "Day Dream"}
                      {activeSection === "emotional" && "Emotional Dream"}
                      {activeSection === "life-path" && "Life Path Reading"}
                      {activeSection === "name-analysis" && "Name"}
                      {activeSection === "energy-numbers" && "Energy Numbers"}
                      {activeSection === "my-gallery" && "My Gallery"}
                      {activeSection === "premium-plans" && "Premium Plans"}
                    </h3>
                    <div className="flex items-center gap-3  cursor-pointer">
                      <button
                        onClick={() => setIsPremiumPopupOpen(true)}
                        className="hidden sm:inline-flex items-center gap-2 cursor-pointer px-3 py-2 bg-[#AABFFF] rounded-full text-sm font-semibold text-black shadow-lg"
                      >
                        <Image
                          src="/svgs/get-pro.svg"
                          alt="Get Pro icon"
                          width={16}
                          height={16}
                        />
                        <span>Get Pro</span>
                      </button>

                      <ProfileDropdown />
                    </div>
                  </div>
                  <div
                    className={`flex-1 flex flex-col ${
                      [
                        "any-dream",
                        "nightmare",
                        "day-dream",
                        "emotional",
                        "life-path",
                        "name-analysis",
                        "energy-numbers",
                      ].includes(activeSection)
                        ? "overflow-hidden"
                        : "overflow-y-auto scrollbar-hide"
                    }`}
                  >
                    {" "}
                    {activeSection === "home" && (
                      <div className="space-y-6">
                        <div className="relative">
                          <Image
                            src="/images/FIND-YOUR-SOULMATE.webp"
                            alt="FIND-YOUR-SOULMATE"
                            width={1200}
                            height={300}
                            className="w-full h-auto rounded-3xl"
                          />
                          <div className="absolute inset-x-0 bottom-2 sm:bottom-4 flex justify-center items-center px-4">
                            <button
                              onClick={() => {
                                setActiveSection("find-soulmate");
                                setActiveSubTab(null);
                              }}
                              className="flex cursor-pointer items-center justify-between gap-2 sm:gap-12 bg-white/10 backdrop-blur-md text-white font-medium px-2 py-2 rounded-full shadow-lg border border-white/20 hover:bg-white/20 transition w-auto"
                            >
                              <span className="whitespace-nowrap ml-2 cursor-pointer  text-[14px] sm:text-[18px]">
                                Find Your Soulmate
                              </span>

                              <span className="flex items-center justify-center rounded-full bg-[#AABFFF] w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                                <Image
                                  src="/svgs/Home-button-errow.svg"
                                  alt="Arrow icon"
                                  width={10}
                                  height={10}
                                  className="w-2 h-2 sm:w-2.5 sm:h-2.5"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-gray-200">
                            Dream Wisdom
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            <div
                              // onClick={() => handleSectionChange("any-dream")}
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              onClick={() => handlePremiumSection("any-dream")}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/ANY-DREAM.webp"
                                alt="Star icon"
                                height={48}
                                width={48}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Any Dream
                              </span>
                              <div className="absolute top-3 right-3 bg-[#AABFFF] rounded-xl p-2">
                                <Image
                                  src="/svgs/get-pro.svg"
                                  alt="Star icon"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                            <div
                              onClick={() => handleSectionChange("nightmare")}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/NIGHT-MARE.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Nightmare
                              </span>
                            </div>
                            <div
                              // onClick={() => handleSectionChange("day-dream")}
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              onClick={() => handlePremiumSection("day-dream")}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/DAY-DREAM.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Day Dream
                              </span>
                              <div className="absolute top-3 right-3 bg-[#AABFFF] rounded-xl p-2">
                                <Image
                                  src="/svgs/get-pro.svg"
                                  alt="Star icon"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                            <div
                              // onClick={() => handleSectionChange("emotional")}
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              onClick={() => handlePremiumSection("emotional")}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/EMOTIONAL.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Emotional
                              </span>
                              <div className="absolute top-3 right-3 bg-[#AABFFF] rounded-xl p-2">
                                <Image
                                  src="/svgs/get-pro.svg"
                                  alt="Star icon"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-4 text-gray-200">
                            Numerology
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            <div
                              // onClick={() => handleSectionChange("life-path")}
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              onClick={() => handlePremiumSection("life-path")}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/Life-Path.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Life Path
                              </span>
                              <div className="absolute top-3 right-3 bg-[#AABFFF] rounded-xl p-2">
                                <Image
                                  src="/svgs/get-pro.svg"
                                  alt="Star icon"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                handleSectionChange("name-analysis")
                              }
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/NAME-ANALYSIS.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Name Analysis
                              </span>
                            </div>
                            <div
                              // onClick={() =>
                              //   handleSectionChange("energy-numbers")
                              // }
                              // onClick={() => setIsPremiumPopupOpen(true)}
                              onClick={() =>
                                handlePremiumSection("energy-numbers")
                              }
                              className="relative bg-[#3A3D4E] rounded-3xl p-6 flex items-center gap-6 cursor-pointer hover:bg-[#454862] transition"
                            >
                              <Image
                                src="/images/ENERGY-NUMBERS.webp"
                                alt="Star icon"
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                              <span className="text-white font-semibold text-sm sm:text-base md:text-[18px]">
                                Energy Number
                              </span>
                              <div className="absolute top-3 right-3 bg-[#AABFFF] rounded-xl p-2">
                                <Image
                                  src="/svgs/get-pro.svg"
                                  alt="Star icon"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeSection === "any-dream" && (
                      <AnyDream onMessageSent={() => setHasMessages(true)} />
                    )}
                    {activeSection === "nightmare" && (
                      <Nightmare onMessageSent={() => setHasMessages(true)} />
                    )}
                    {activeSection === "day-dream" && (
                      <DayDream onMessageSent={() => setHasMessages(true)} />
                    )}
                    {activeSection === "emotional" && (
                      <Emotional onMessageSent={() => setHasMessages(true)} />
                    )}
                    {activeSection === "life-path" && (
                      <LifePath onMessageSent={() => setHasMessages(true)} />
                    )}
                    {activeSection === "name-analysis" && (
                      <NameAnalysis
                        onMessageSent={() => setHasMessages(true)}
                      />
                    )}
                    {activeSection === "energy-numbers" && (
                      <EnergyNumbers
                        onMessageSent={() => setHasMessages(true)}
                      />
                    )}
                    {activeSection === "my-gallery" && <MyGallery />}
                    {activeSection === "find-soulmate" && (
                      <FindSoulmate
                        setSoulmateStep={setSoulmateStep}
                        openPremiumPopup={() => setIsPremiumPopupOpen(true)}
                      />
                    )}
                  </div>

                  {/* {activeSection === "premium-plans" && <PremiumPlans />} */}
                </div>
              </div>
            </main>
          </div>
          <PremiumPopup
            isOpen={isPremiumPopupOpen}
            onClose={() => setIsPremiumPopupOpen(false)}
          />
        </div>
        <ConfirmLeavePopup
          isOpen={showLeavePopup}
          onCancel={() => {
            setShowLeavePopup(false);
            setPendingSection(null);
          }}
          onConfirm={() => {
            setShowLeavePopup(false);
            setActiveSection(pendingSection);
            setPendingSection(null);
            setHasMessages(false);
          }}
        />
      </>
    </ProtectedRoute>
  );
};

export default SoulmateSidebar;
