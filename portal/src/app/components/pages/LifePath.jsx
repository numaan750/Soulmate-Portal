"use client";

import Image from "next/image";
import { AppContext } from "@/context/Appcontext";
import { useContext, useState, useRef, useEffect } from "react";

const LifePath = () => {
  const { token, sendAiChat } = useContext(AppContext);

  const [input, setInput] = useState("");
  const [hiddenPrompts, setHiddenPrompts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What does my life path say about me?",
    "Does it show my strengths and weaknesses?",
    "Can it guide me in relationships or career?",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const sendQuickMessage = async (text, index) => {
    setHiddenPrompts((prev) => [...prev, index]);

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const reply = await sendAiChat([userMsg], "life_path");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setHiddenPrompts(quickPrompts.map((_, i) => i));

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendAiChat([...messages, userMsg], "life_path");
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="text-[#FFFFFF] flex flex-row items-start sm:items-center mb-4">
        <Image
          src="/images/Ai-Soulmate-Art.webp"
          alt="Ai-Soulmate-Art.webp"
          width={31}
          height={31}
          className="rounded-full mr-2 sm:mr-4 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 "
        />
        <p className="leading-relaxed text-[14px] sm:text-[16px]">
          Let’s explore what your Life Path reveals about your destiny.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 px-2 scrollbar-hide mb-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className="flex">
            <div
              className={`px-4 py-2 rounded-xl break-words text-[16px] max-w-full sm:max-w-[60%]
          ${
            msg.role === "user"
              ? "bg-[#35384A] text-white ml-auto"
              : "text-gray-200 mr-auto"
          }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex">
            <div className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 mr-auto max-w-full sm:max-w-[60%]">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-3 sm:space-y-4 flex-shrink-0">
        <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-3 ml-0 sm:ml-8 scrollbar-hide">
          {quickPrompts.map((text, index) => (
            <button
              key={index}
              className={`${
                hiddenPrompts.includes(index)
                  ? "bg-[#35384A] text-gray-200"
                  : "bg-[#2A2D3A] text-[#F8F9FA]"
              } px-3 sm:px-4 py-2 sm:py-3 rounded-lg cursor-pointer sm:rounded-xl
                text-[12px] sm:text-[14px] md:text-[16px]
                hover:bg-[#35384A] transition
                 flex-shrink-0`}
              onClick={() => sendQuickMessage(text, index)}
            >
              {text}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-[#2A2D3A] rounded-full px-3 sm:px-4 py-3 sm:py-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type Message"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent text-gray-300 outline-none placeholder-gray-500 text-[12px] sm:text-[14px] md:text-[16px]"
          />

          <Image
            src={
              input.trim()
                ? "/svgs/send-active.svg"
                : "/svgs/any-dream-text-icon.svg"
            }
            alt="any-dream"
            width={20}
            height={20}
            onClick={input.trim() ? sendMessage : undefined}
            className={`ml-2 sm:ml-3 transition w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0
             ${
               input.trim()
                 ? "cursor-pointer opacity-100 hover:scale-110"
                 : "cursor-not-allowed opacity-40"
             }
           `}
          />
        </div>
      </div>
    </div>
  );
};

export default LifePath;
