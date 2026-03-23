"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DoodleButton } from "./doodle-button";
import { DoodleCard } from "./doodle-card";
import { BookOpen } from "lucide-react";

interface WelcomePageProps {
  onStart: (name: string) => void;
}

const floatingFoods = [
  { emoji: "🍩", x: -120, y: -80, delay: 0 },
  { emoji: "🍎", x: 120, y: -100, delay: 0.2 },
  { emoji: "🥦", x: -140, y: 40, delay: 0.4 },
  { emoji: "🍬", x: -80, y: 120, delay: 0.6 },
  { emoji: "🍰", x: 100, y: 80, delay: 0.8 },
  { emoji: "🍚", x: 140, y: -20, delay: 1 },
];

const statItems = [
  { icon: "🩸", label: "血糖", color: "bg-red-50 border-red-200" },
  { icon: "😊", label: "心情", color: "bg-yellow-50 border-yellow-200" },
  { icon: "⚡", label: "精力", color: "bg-green-50 border-green-200" },
  { icon: "🍊", label: "饱腹", color: "bg-orange-50 border-orange-200" },
];

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-[#FDFBF7] paper-texture flex flex-col">
      {/* Header */}
      <div className="flex justify-end p-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-800 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] text-sm font-semibold">
          <BookOpen size={16} />
          规则
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-8">
        {/* Character with floating foods */}
        <div className="relative w-64 h-64 mb-4">
          {/* Character Frame */}
          <motion.div
            className="absolute inset-0 bg-[#FFFEF5] border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5836-nuBk8xOaFcYAHGQpqAhxl5HY263C4h.png"
              alt="可爱的小女孩"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>

          {/* Floating Food Emojis */}
          {floatingFoods.map((food, index) => (
            <motion.div
              key={index}
              className="absolute text-3xl"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: food.x,
                y: food.y,
              }}
              transition={{
                delay: food.delay,
                duration: 0.5,
                type: "spring",
              }}
            >
              <motion.span
                animate={{
                  y: [0, -8, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: food.delay,
                }}
                className="inline-block"
              >
                {food.emoji}
              </motion.span>
            </motion.div>
          ))}

          {/* GO Badge */}
          <motion.div
            className="absolute -left-2 bottom-8 bg-[#4A7C59] text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
          >
            GO
          </motion.div>

          {/* Alert Badge */}
          <motion.div
            className="absolute -right-2 top-4 bg-[#4A7C59] text-white w-8 h-8 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)] flex items-center justify-center text-lg font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, type: "spring" }}
          >
            !
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-slate-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          控糖生存指南
        </motion.h1>

        {/* Color Bars */}
        <motion.div
          className="flex gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-12 h-1.5 bg-[#E57373] rounded-full" />
          <div className="w-12 h-1.5 bg-[#FFD54F] rounded-full" />
          <div className="w-12 h-1.5 bg-[#81C784] rounded-full" />
          <div className="w-12 h-1.5 bg-[#FFB74D] rounded-full" />
        </motion.div>

        {/* Speech Bubble Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full mb-6"
        >
          <DoodleCard className="p-5">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-slate-600">我是</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="晚安"
                  className="w-20 px-2 py-1 text-center font-bold bg-transparent border-b-2 border-slate-400 focus:border-[#F5A623] outline-none"
                />
              </div>
              <p className="text-slate-700 font-medium">
                我要做出正确的饮食选择，健康生活七天
              </p>
            </div>
          </DoodleCard>
        </motion.div>

        {/* Stat Hint */}
        <motion.p
          className="text-sm text-slate-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {'你的每个选择都会影响下面四项 →'}
        </motion.p>

        {/* Stat Items Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 w-full mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 ${item.color} border-2 border-slate-800 rounded-2xl shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold text-slate-700">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <DoodleButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => onStart(name || "玩家")}
          >
            开始冒险!
          </DoodleButton>
          <DoodleButton variant="outline" size="lg" className="w-full">
            参与历史与复盘
          </DoodleButton>
        </motion.div>

        {/* Hint Text */}
        <motion.p
          className="text-xs text-slate-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {'< 滑动卡片做选择 >'}
        </motion.p>
      </div>
    </div>
  );
}
