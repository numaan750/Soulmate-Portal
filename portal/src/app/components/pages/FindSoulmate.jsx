"use client";

import React, { useContext, useEffect, useState } from "react";
import SoulmateGender from "./soulmate-create/SoulmateGender";
import BirthDate from "./soulmate-create/BirthDate";
import EthnicBackground from "./soulmate-create/EthnicBackground";
import ImagineVibe from "./soulmate-create/ImagineVibe";
import WereYouBorn from "./soulmate-create/WereYouBorn";
import BirthTime from "./soulmate-create/BirthTime";
import Result from "./soulmate-create/Result";
import Chatwithsoulmate from "./soulmate-create/Chatwithsoulmate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AppContext } from "@/context/Appcontext";

const FindSoulmate = ({ setSoulmateStep, openPremiumPopup }) => {
  const {
    createSoulmate,
    getUserSoulmate,
    deleteSoulmate,
    user,
    soulmateCache,
    setSoulmateCache,
  } = useContext(AppContext);
  const [generatedSoulmate, setGeneratedSoulmate] = useState(null);
  const [hasUsedFreeGenerate, setHasUsedFreeGenerate] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "",
    ethnicBackground: "",
    vibe: "",
    birthplace: "",
  });

  useEffect(() => {
    const checkExistingSoulmate = async () => {
      const existingSoulmate = await getUserSoulmate();

      if (existingSoulmate) {
        setGeneratedSoulmate(existingSoulmate);
        setHasUsedFreeGenerate(true);
        setCurrentStep(7);
        setFormData({
          gender: existingSoulmate.gender,
          birthDate: existingSoulmate.birthDate,
          ethnicBackground: existingSoulmate.ethnicBackground,
          vibe: existingSoulmate.vibe,
          birthplace: existingSoulmate.birthplace,
          birthTime: existingSoulmate.birthTime,
        });
      } else {
        setCurrentStep(1);
      }
    };

    checkExistingSoulmate();
  }, []);

  const totalSteps = 8;
  const progressSteps = 6;

  React.useEffect(() => {
    setSoulmateStep(currentStep);
  }, [currentStep]);

  const handleNext = async () => {
    if (currentStep === 6) {
      if (hasUsedFreeGenerate) {
        openPremiumPopup();
        return;
      }

      try {
        setIsGenerating(true);

        const result = await createSoulmate(formData);

        if (result?.needsPremium) {
          openPremiumPopup();
          return;
        }

        if (result?.data) {
          setGeneratedSoulmate(result.data);
          setHasUsedFreeGenerate(true);
          setCurrentStep(7);
        }
      } catch (error) {
        console.error("Generation failed:", error);
        alert("Failed to generate soulmate.");
      } finally {
        setIsGenerating(false);
      }

      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SoulmateGender
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <BirthDate formData={formData} onInputChange={handleInputChange} />
        );
      case 3:
        return (
          <EthnicBackground
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <ImagineVibe formData={formData} onInputChange={handleInputChange} />
        );
      case 5:
        return (
          <WereYouBorn formData={formData} onInputChange={handleInputChange} />
        );
      case 6:
        return (
          <BirthTime formData={formData} onInputChange={handleInputChange} />
        );
      case 7:
        return (
          <Result
            formData={formData}
            soulmateData={generatedSoulmate}
            onInputChange={handleInputChange}
            onDelete={() => {
              setShowDeleteConfirm(true);
            }}
            goToChat={() => setCurrentStep(8)}
          />
        );
      case 8:
        return <Chatwithsoulmate soulmateData={generatedSoulmate} />;
      default:
        return <Step1Welcome />;
    }
  };

  return (
    <div className="min-h-[50vh] bg-[#222430] text-white">
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#2A2D3A] rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your soulmate?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-600 rounded-full hover:bg-gray-500"
              >
                No
              </button>

              <button
                onClick={async () => {
                  await deleteSoulmate();
                  setHasUsedFreeGenerate(false);
                  setGeneratedSoulmate(null);
                  setSoulmateCache(null);
                  setCurrentStep(1);
                  setFormData({
                    name: "",
                    birthDate: "",
                    birthTime: "",
                    gender: "",
                    ethnicBackground: "",
                    vibe: "",
                    birthplace: "",
                  });
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-6 py-3 bg-red-500 rounded-full hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep !== null && (
        <>
          {currentStep <= 6 && (
            <div className="max-w-5xl mx-auto mb-6 sm:mb-8 px-1 sm:px-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[14px] text-gray-400">
                  Step {Math.min(currentStep, progressSteps)} of {progressSteps}
                </span>
                <span className="text-[10px] sm:text-[14px] text-gray-400">
                  {Math.round(
                    (Math.min(currentStep, progressSteps) / progressSteps) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#AABFFF] transition-all duration-300"
                  style={{
                    width: `${(Math.min(currentStep, progressSteps) / progressSteps) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
      {currentStep !== null && (
        <div
          className={`mx-auto w-full ${
            currentStep >= 7 ? "max-w-6xl" : "max-w-md sm:max-w-xl md:max-w-3xl"
          }`}
        >
          {renderStep()}

          <div className="flex flex-row flex-nowrap gap-4 mt-8 sm:mt-12 w-full">
            {currentStep > 1 && currentStep <= 6 && (
              <button
                onClick={handlePrevious}
                className="px-4 sm:px-6 py-2 flex cursor-pointer items-center gap-2 text-[16px] sm:text-[18px] text-[#AABFFF] font-semibold rounded-full hover:bg-[#AABFFF] hover:text-black transition-all"
              >
                <FaArrowLeft className="text-xs sm:text-sm" />
                Back
              </button>
            )}

            {currentStep < totalSteps && currentStep !== 7 && (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formData.gender) ||
                  (currentStep === 2 && !formData.birthDate) ||
                  (currentStep === 3 && !formData.ethnicBackground) ||
                  (currentStep === 4 && !formData.vibe) ||
                  (currentStep === 5 && !formData.birthplace) ||
                  (currentStep === 6 && !formData.birthTime) ||
                  isGenerating
                }
                className={`ml-auto sm:ml-auto px-4 sm:px-6 py-2 flex items-center gap-2 text-[16px] sm:text-[18px] font-semibold rounded-full transition-all ${
                  (currentStep === 1 && !formData.gender) ||
                  (currentStep === 2 && !formData.birthDate) ||
                  (currentStep === 3 && !formData.ethnicBackground) ||
                  (currentStep === 4 && !formData.vibe) ||
                  (currentStep === 5 && !formData.birthplace) ||
                  (currentStep === 6 && !formData.birthTime)
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-[#AABFFF] text-black cursor-pointer hover:bg-[#99AEFF]"
                }`}
              >
                {currentStep === progressSteps ? (
                  isGenerating ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Generating...
                    </div>
                  ) : (
                    "Generate"
                  )
                ) : (
                  "Next"
                )}

                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindSoulmate;
