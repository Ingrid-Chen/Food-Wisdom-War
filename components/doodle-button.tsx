"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DoodleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-[#F5A623] text-white hover:bg-[#E09612]",
  secondary: "bg-[#4A7C59] text-white hover:bg-[#3D6A4A]",
  outline: "bg-[#FFFEF5] text-slate-800 hover:bg-[#FFF9E6]",
  danger: "bg-[#E57373] text-white hover:bg-[#D46060]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function DoodleButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: DoodleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative font-bold rounded-2xl
        border-2 border-slate-800
        shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]
        transition-all duration-100 ease-out
        active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(30,41,59,1)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileTap={{ y: 4, boxShadow: "0px 0px 0px 0px rgba(30,41,59,1)" }}
    >
      {children}
    </motion.button>
  );
}
