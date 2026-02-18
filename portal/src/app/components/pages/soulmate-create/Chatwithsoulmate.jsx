"use client";
import { AppContext } from "@/context/Appcontext";
import Image from "next/image";
import { useState, useRef, useEffect, useContext } from "react";

const Chatwithsoulmate = ({ soulmateData, onMessageSent }) => {
  const { chatWithSoulmate } = useContext(AppContext);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hiddenPrompts, setHiddenPrompts] = useState([]);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Can you tell me how you truly feel inside?",
    "What special message do you have for me today?",
    "Do you believe our connection will grow stronger over time?",
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
    if (loading) return;

    setHiddenPrompts((prev) => [...prev, index]);
    onMessageSent?.();
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      let assistantMessage = { role: "assistant", content: "" };

      setMessages((prev) => [...prev, assistantMessage]);

      await chatWithSoulmate(
        updatedMessages,
        soulmateData,
        (token, fullText) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: fullText,
            };
            return updated;
          });
        },
      );
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again, my love.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    setHiddenPrompts(quickPrompts.map((_, i) => i));

    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    onMessageSent?.();
    setLoading(true);

    try {
      let assistantMessage = { role: "assistant", content: "" };

      setMessages((prev) => [...prev, assistantMessage]);

      await chatWithSoulmate(
        updatedMessages,
        soulmateData,
        (token, fullText) => {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: fullText,
            };
            return updated;
          });
        },
      );
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again, my love.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="text-[#FFFFFF] flex flex-row items-start sm:items-center flex-shrink-0 p-2 sm:p-4">
        <Image
          src="/images/Ai-Soulmate-Art.webp"
          alt="Ai-Soulmate-Art.webp"
          width={31}
          height={31}
          className="rounded-full mr-2 sm:mr-4 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
        />
        <p className="leading-relaxed text-[14px] sm:text-[16px]">
          “I’m here for you, always ready to listen and connect. Share your
          thoughts, feelings, or questions with me, and let’s begin our soulful
          conversation.”
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-4 scrollbar-hide">
        <div className="space-y-3 py-4">
          {" "}
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
              <div className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 mr-auto">
                Soulmate is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex-shrink-0 p-2 sm:p-4">
        <div className="space-y-3 sm:space-y-4 mb-4">
          <div className="flex flex-nowrap overflow-x-auto gap-2 sm:gap-3 ml-0 sm:ml-2 scrollbar-hide">
            {quickPrompts.map((text, index) => (
              <button
                key={index}
                onClick={() => sendQuickMessage(text, index)}
                className={`${
                  hiddenPrompts.includes(index)
                    ? "bg-[#35384A] text-gray-200"
                    : "bg-[#2A2D3A] text-[#F8F9FA]"
                }
              px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl
              text-[12px] sm:text-[14px] md:text-[16px]
              hover:bg-[#35384A] transition flex-shrink-0 cursor-pointer`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center bg-[#2A2D3A] rounded-full px-3 sm:px-4 py-3 sm:py-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type Message"
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
             }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatwithsoulmate;
