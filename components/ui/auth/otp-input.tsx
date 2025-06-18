"use client";

import React, {
  useRef,
  useState,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
  FocusEvent,
} from "react";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  inputClassName?: string;
}

export function OtpInput({
  length = 4,
  value,
  onChange,
  className = "",
  inputClassName = "",
}: OtpInputProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Helper function for handling backspace to enable recursive backspace
  const handleBackspace = (index: number) => {
    // Current input has a value - clear it and stay focused
    if (value[index]) {
      const newOtp = [...value];
      newOtp[index] = "";
      onChange(newOtp);
      return;
    }

    // Current input is empty and not the first input - move to previous and clear it
    if (index > 0) {
      const newOtp = [...value];
      newOtp[index - 1] = "";
      onChange(newOtp);
      // Move focus to previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    const currentIndex = inputRefs.current.indexOf(
      e.currentTarget as HTMLInputElement
    );

    // Handle backspace key
    if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault(); // Prevent default to handle backspace behavior completely
      handleBackspace(currentIndex);
    }

    // Handle right arrow key - move to next input
    if (e.key === "ArrowRight" && currentIndex < length - 1) {
      inputRefs.current[currentIndex + 1]?.focus();
      e.preventDefault();
    }

    // Handle left arrow key - move to previous input
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      inputRefs.current[currentIndex - 1]?.focus();
      e.preventDefault();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value: inputValue } = e.target;

    const newOtp = [...value];

    // Handle input clearing (if user selects all and deletes)
    if (inputValue === "") {
      newOtp[index] = "";
      onChange(newOtp);
      return;
    }

    // Handle normal input
    if (inputValue) {
      // Take only the last character if someone types more than one
      newOtp[index] = inputValue.slice(-1);
      onChange(newOtp);

      // Move focus to next input if available
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    // Validate if pasted content is numeric and doesn't exceed max length
    if (!new RegExp(`^[0-9]{1,${length}}$`).test(pastedText)) {
      return;
    }

    // Get digits to be filled
    const digits = pastedText.split("").slice(0, length);

    // Create the final array immediately with all digits
    const newOtp = Array(length).fill("");
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    // Update state with the complete array
    onChange(newOtp);

    // Start animation
    setAnimating(true);

    // Animate highlighting each cell one by one
    digits.forEach((_, i) => {
      setTimeout(() => {
        // Update the active index for animation
        setActiveIndex(i);

        // If this is the last digit, end animation state after a delay
        if (i === digits.length - 1) {
          setTimeout(() => {
            setActiveIndex(null);
            setAnimating(false);
          }, 300);
        }
      }, i * 200); // 200ms delay between each digit for a nice animation
    });
  };

  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleInput(e, index)}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onPaste={handlePaste}
            disabled={animating}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            style={{
              transform: activeIndex === index ? "scale(1.1)" : "scale(1)",
              borderColor:
                activeIndex === index ? "var(--color-primary, #4f46e5)" : "",
              boxShadow:
                activeIndex === index
                  ? "0 0 0 3px rgba(79, 70, 229, 0.25)"
                  : "",
            }}
            className={`shadow-xs flex w-[64px] h-[64px] items-center justify-center rounded-lg border border-input bg-background p-2 text-center text-2xl font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-4xl transition-all duration-200 ease-in-out ${inputClassName}`}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
    </div>
  );
}
