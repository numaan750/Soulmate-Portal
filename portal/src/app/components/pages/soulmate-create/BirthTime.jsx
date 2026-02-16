"use client";

import { useState, useRef, useEffect } from "react";

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i === 0 ? 12 : i).padStart(2, "0"),
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const periods = ["AM", "PM"];

const ScrollPicker = ({ items, selectedIndex, onIndexChange }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const [itemHeight, setItemHeight] = useState(60);

  useEffect(() => {
    const updateItemHeight = () => {
      if (window.innerWidth < 640) {
        setItemHeight(48);
      } else if (window.innerWidth < 768) {
        setItemHeight(56);
      } else {
        setItemHeight(60);
      }
    };

    updateItemHeight();
    window.addEventListener("resize", updateItemHeight);
    return () => window.removeEventListener("resize", updateItemHeight);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const targetScroll = selectedIndex * itemHeight;
      containerRef.current.scrollTop = targetScroll;
    }
  }, [selectedIndex, itemHeight]);

  const handleScroll = (e) => {
    if (!isDragging) {
      const scrollPosition = e.target.scrollTop;
      const index = Math.round(scrollPosition / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      if (clampedIndex !== selectedIndex) {
        onIndexChange(clampedIndex);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    containerRef.current.scrollTop = scrollTop - deltaY;
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      const scrollPosition = containerRef.current.scrollTop;
      const index = Math.round(scrollPosition / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      containerRef.current.scrollTop = clampedIndex * itemHeight;
      onIndexChange(clampedIndex);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    containerRef.current.scrollTop = scrollTop - deltaY;
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      const scrollPosition = containerRef.current.scrollTop;
      const index = Math.round(scrollPosition / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));

      containerRef.current.scrollTop = clampedIndex * itemHeight;
      onIndexChange(clampedIndex);
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const newIndex = Math.max(
      0,
      Math.min(items.length - 1, selectedIndex + delta),
    );
    onIndexChange(newIndex);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[60px] sm:w-[80px] h-px mb-3 sm:mb-4"></div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className="h-[144px] sm:h-[168px] md:h-[180px] w-full overflow-y-scroll cursor-grab active:cursor-grabbing relative picker-scrollbar"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: isDragging ? "auto" : "smooth",
        }}
      >
        <div style={{ height: `${itemHeight}px` }} />

        {items.map((item, index) => {
          const distance = Math.abs(index - selectedIndex);
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0;
          const scale = distance === 0 ? 1.1 : 1;
          const color = distance === 0 ? "#AABFFF" : "#F8F9FA66";

          return (
            <div
              key={index}
              className="flex items-center justify-center transition-all duration-200"
              style={{
                height: `${itemHeight}px`,
                scrollSnapAlign: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <span
                className="text-[18px] sm:text-[22px] md:text-[24px] font-semibold select-none"
                style={{ color }}
              >
                {item}
              </span>
            </div>
          );
        })}

        <div style={{ height: `${itemHeight}px` }} />
      </div>

      <div className="w-[60px] sm:w-[80px] h-px mt-3 sm:mt-4"></div>

      <div className="absolute top-1/2 left-0 right-0 pointer-events-none transform -translate-y-1/2">
        <div className="h-[48px] sm:h-[56px] md:h-[60px] border-t border-b border-[#F8F9FA]"></div>
      </div>
    </div>
  );
};

const Step6BirthTime = ({ formData, onInputChange }) => {
  const [hIndex, setHIndex] = useState(0);
  const [mIndex, setMIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);

  useEffect(() => {
    const time = `${hours[hIndex]}:${minutes[mIndex]} ${periods[pIndex]}`;
    if (formData.birthTime !== time) {
      onInputChange("birthTime", time);
    }
  }, [hIndex, mIndex, pIndex]);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-center mb-2 text-white">
        Your Birth Time
      </h2>

      <p className="text-center text-gray-300 text-[14px] sm:text-[16px] md:text-[18px] mb-6 sm:mb-8 px-2">
        Select your birth time to personalize your soulmate art{" "}
      </p>

      <div>
        <div className="flex justify-center gap-[16px] sm:gap-[32px] md:gap-[40px]">
          <ScrollPicker
            items={hours}
            selectedIndex={hIndex}
            onIndexChange={setHIndex}
          />
          <ScrollPicker
            items={minutes}
            selectedIndex={mIndex}
            onIndexChange={setMIndex}
          />
          <ScrollPicker
            items={periods}
            selectedIndex={pIndex}
            onIndexChange={setPIndex}
          />
        </div>
      </div>

      <style jsx global>{`
        /* Hide scrollbar completely */
        .picker-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .picker-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Make sure no scrollbar appears anywhere */
        *::-webkit-scrollbar {
          display: none;
        }

        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Step6BirthTime;
