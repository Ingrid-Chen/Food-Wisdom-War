"use client";

import { ReactNode } from "react";

interface DoodleCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "speech" | "highlight";
}

export function DoodleCard({
  children,
  className = "",
  variant = "default",
}: DoodleCardProps) {
  const baseStyles = `
    relative bg-[#FFFEF5] 
    border-2 border-slate-800 
    rounded-2xl
    shadow-[4px_4px_0px_0px_rgba(30,41,59,1)]
  `;

  const speechBubble = variant === "speech" ? `
    after:content-[''] 
    after:absolute after:top-full after:left-8
    after:border-8 after:border-transparent
    after:border-t-slate-800
    before:content-['']
    before:absolute before:top-full before:left-[34px]
    before:border-[6px] before:border-transparent
    before:border-t-[#FFFEF5]
    before:z-10
  ` : "";

  return (
    <div className={`${baseStyles} ${speechBubble} ${className}`}>
      {children}
    </div>
  );
}
