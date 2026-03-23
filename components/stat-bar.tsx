"use client";

import { motion } from "framer-motion";

interface StatBarProps {
  icon: string;
  label: string;
  value: number;
  maxValue?: number;
  color: "blood-sugar" | "mood" | "energy" | "fullness";
  showValue?: boolean;
  statusText?: string;
}

const colorMap = {
  "blood-sugar": {
    bg: "bg-red-100",
    fill: "bg-[#E57373]",
    border: "border-red-300",
  },
  mood: {
    bg: "bg-yellow-100",
    fill: "bg-[#FFD54F]",
    border: "border-yellow-300",
  },
  energy: {
    bg: "bg-green-100",
    fill: "bg-[#81C784]",
    border: "border-green-300",
  },
  fullness: {
    bg: "bg-orange-100",
    fill: "bg-[#FFB74D]",
    border: "border-orange-300",
  },
};

export function StatBar({
  icon,
  label,
  value,
  maxValue = 100,
  color,
  showValue = true,
  statusText,
}: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const colors = colorMap[color];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
        <span className="text-base">{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className={`relative w-full h-4 ${colors.bg} ${colors.border} border-2 border-slate-800 rounded-full overflow-hidden shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]`}
      >
        <motion.div
          className={`absolute inset-y-0 left-0 ${colors.fill} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showValue && (
        <div className="text-xs font-bold text-slate-600">{value}</div>
      )}
      {statusText && (
        <div className="text-xs text-slate-500">{statusText}</div>
      )}
    </div>
  );
}
