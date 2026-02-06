"use client";

const Step5Preferences = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-2">
        Where Were You Born
      </h2>

      <p className="text-center text-gray-300 text-[14px] sm:text-[16px] md:text-[18px] mb-6 sm:mb-8 px-2">
        Add your birthplace to refine your soulmate art experience{" "}
      </p>

      <textarea
        placeholder="Type Here........."
        value={formData.birthplace || ""}
        onChange={(e) => onInputChange("birthplace", e.target.value)}
        rows={1}
        className="w-full px-[16px] sm:px-[20px] md:px-[24px] py-[10px] sm:py-[12px] border-[#303445] bg-[#303445] text-white rounded-full border focus:border-[#707DA7] outline-none text-[14px] sm:text-[16px] md:text-[18px] resize-none placeholder:text-[14px] sm:placeholder:text-[16px] md:placeholder:text-[18px]"
      />
    </div>
  );
};

export default Step5Preferences;
