"use client";

import React, { useState } from "react";
import SoulmateGender from "./soulmate-create/SoulmateGender";
import BirthDate from "./soulmate-create/BirthDate";
import EthnicBackground from "./soulmate-create/EthnicBackground";
import ImagineVibe from "./soulmate-create/ImagineVibe";
import WereYouBorn from "./soulmate-create/WereYouBorn";
import BirthTime from "./soulmate-create/BirthTime";
import Result from "./soulmate-create/Result";
import Chatwithsoulmate from "./soulmate-create/Chatwithsoulmate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const FindSoulmate = ({ setSoulmateStep }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    gender: "",
    ethnicBackground: "",
    vibe: "",
    birthplace: "",
  });

  const totalSteps = 8;
  const progressSteps = 6;

  React.useEffect(() => {
    setSoulmateStep(currentStep);
  }, [currentStep]);

  const handleNext = () => {
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
            onInputChange={handleInputChange}
            goToChat={() => setCurrentStep(8)}
          />
        );
      case 8:
        return <Chatwithsoulmate formData={formData} />;
      default:
        return <Step1Welcome />;
    }
  };

  return (
    <div className="min-h-[50vh] bg-[#222430] text-white">
      {currentStep <= 6 && (
        <div className="max-w-5xl mx-auto mb-6 sm:mb-8 px-1 sm:px-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-[14px] text-gray-400">
              Step {Math.min(currentStep, progressSteps)} of {progressSteps}
            </span>
            <span className="text-[10px] sm:text-[14px] text-gray-400">
              {Math.round(
                (Math.min(currentStep, progressSteps) / progressSteps) * 100,
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
                (currentStep === 6 && !formData.birthTime)
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
              {currentStep === progressSteps ? "Generate" : "Next"}
              <FaArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindSoulmate;
