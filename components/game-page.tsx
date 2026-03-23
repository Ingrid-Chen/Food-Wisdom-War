"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StatBar } from "./stat-bar";
import { DoodleButton } from "./doodle-button";
import { DoodleCard } from "./doodle-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GamePageProps {
  playerName: string;
  onBack: () => void;
}

const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const timeSlots = [
  { id: "morning", icon: "🌅", label: "晨间", time: "AM 7:30" },
  { id: "afternoon", icon: "☕", label: "下午", time: "PM 3:30" },
  { id: "evening", icon: "🌙", label: "晚间", time: "PM 6:30" },
];

const sampleScenarios = [
  {
    id: 1,
    title: "起晚了",
    description: "起晚了，来不及好好吃饭。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5565-A9qVyR8AK7evRYQLypYkIk5qnc7Cyx.png",
    choices: [
      { text: "当做轻断食，空腹扛着", type: "A" },
      { text: "路边买根热甜玉米边走边啃", type: "B" },
    ],
    timeSlot: "morning",
  },
  {
    id: 2,
    title: "救急后的反弹",
    description: "(接上题) 吃完糖 15 分钟后，眩晕感消失了，但胃里依然觉得空荡荡的。",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5616-u2yxeo5KjupTLPJtOcZS46OItjjJZA.png",
    choices: [
      { text: "趁热打铁，再吃一块小蛋糕彻底吃饱", type: "A" },
      { text: "拿出一小袋无糖纯肉肠或一小块奶酪吃下", type: "B" },
    ],
    timeSlot: "afternoon",
  },
  {
    id: 3,
    title: "枯燥的减脂餐",
    description: "减脂期的晚饭，严格还是放一点松？",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5566-lEDp26JhZ1uZptDpasAjJz9TaTG15y.png",
    choices: [
      { text: "水煮鸡胸肉加水煮西兰花，一滴油不放", type: "A" },
      { text: "在鸡胸肉和西兰花上淋一圈橄榄油", type: "B" },
    ],
    timeSlot: "evening",
  },
];

export function GamePage({ playerName, onBack }: GamePageProps) {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [stats, setStats] = useState({
    bloodSugar: 45,
    mood: 80,
    energy: 80,
    fullness: 50,
  });

  const scenario = sampleScenarios[currentScenario];
  const currentTime = timeSlots.find((t) => t.id === scenario.timeSlot) || timeSlots[0];

  const handleChoice = (choiceType: string) => {
    // Simulate stat changes
    if (choiceType === "B") {
      setStats((prev) => ({
        ...prev,
        bloodSugar: Math.min(100, prev.bloodSugar + 10),
        mood: Math.min(100, prev.mood + 5),
        fullness: Math.min(100, prev.fullness + 15),
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        energy: Math.max(0, prev.energy - 10),
        mood: Math.max(0, prev.mood - 5),
      }));
    }
    // Move to next scenario
    setCurrentScenario((prev) => (prev + 1) % sampleScenarios.length);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] paper-texture flex flex-col">
      {/* Top Status Bar */}
      <div className="bg-[#FDFBF7] border-b-2 border-slate-200 p-4">
        {/* Week Days Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {weekDays.map((day, index) => (
              <motion.div
                key={day}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 
                  ${
                    index < currentDay
                      ? "bg-[#4A7C59] text-white border-slate-800"
                      : index === currentDay
                      ? "bg-[#F5A623] text-white border-slate-800 shadow-[2px_2px_0px_0px_rgba(30,41,59,1)]"
                      : "bg-white text-slate-400 border-slate-300"
                  }`}
                whileHover={{ scale: 1.1 }}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>
          
          {/* Time Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-slate-800 rounded-full shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]">
            <span>{currentTime.icon}</span>
            <span className="text-[#F5A623] font-bold text-sm">{currentTime.label}</span>
            <span className="text-slate-500 text-xs">{currentTime.time}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2">
          <StatBar
            icon="🩸"
            label="血糖"
            value={stats.bloodSugar}
            color="blood-sugar"
            statusText={stats.bloodSugar < 50 ? "血糖平稳" : "注意"}
          />
          <StatBar
            icon="😊"
            label="心情"
            value={stats.mood}
            color="mood"
            statusText="情绪稳定"
          />
          <StatBar
            icon="⚡"
            label="精力"
            value={stats.energy}
            color="energy"
            statusText="活力充沛"
          />
          <StatBar
            icon="🍊"
            label="饱腹"
            value={stats.fullness}
            color="fullness"
            statusText={stats.fullness < 30 ? "有点饿" : "恰到好处"}
          />
        </div>
      </div>

      {/* Scenario Navigation */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-full">
            {weekDays[currentDay]}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 bg-white border-2 border-slate-800 rounded-full text-xs font-semibold shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]">
            <span>{currentTime.icon}</span>
            <span className="text-[#F5A623]">{currentTime.label}</span>
            <span className="text-slate-500">{currentTime.time}</span>
          </span>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full border border-slate-400 ${
                i <= currentScenario ? "bg-[#F5A623]" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Choice Preview Buttons */}
      <div className="px-4 flex gap-2 mb-3">
        <button className="flex-1 flex items-center gap-1 px-3 py-2 bg-[#E8F5E9] border-2 border-slate-800 rounded-xl text-xs font-medium text-slate-700 shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]">
          <ChevronLeft size={14} />
          <span className="truncate">{scenario.choices[0].text}</span>
        </button>
        <button className="flex-1 flex items-center justify-end gap-1 px-3 py-2 bg-[#FFF8E1] border-2 border-slate-800 rounded-xl text-xs font-medium text-slate-700 shadow-[2px_2px_0px_0px_rgba(30,41,59,0.3)]">
          <span className="truncate">{scenario.choices[1].text}</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Main Scene Card */}
      <div className="flex-1 px-4 pb-4 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Scene Image */}
            <div className="relative flex-1 min-h-[300px] bg-[#FFFEF5] border-2 border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,41,59,1)] overflow-hidden mb-4">
              <img
                src={scenario.image}
                alt={scenario.title}
                className="w-full h-full object-cover"
              />
              
              {/* Time Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-slate-800/80 text-white rounded-full text-sm">
                <span>{currentTime.icon}</span>
                <span>{currentTime.label}</span>
              </div>
              
              <div className="absolute bottom-4 right-4 text-white text-sm bg-slate-800/80 px-2 py-1 rounded">
                {currentTime.time}
              </div>

              {/* Speech Pointer */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-slate-800" />
            </div>

            {/* Scenario Text Card */}
            <DoodleCard className="p-4 mb-4">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {scenario.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {scenario.description}
              </p>
            </DoodleCard>

            {/* Choice Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <DoodleButton
                variant="outline"
                size="md"
                className="!bg-[#E8F5E9] text-slate-700 text-sm"
                onClick={() => handleChoice("A")}
              >
                {scenario.choices[0].text}
              </DoodleButton>
              <DoodleButton
                variant="outline"
                size="md"
                className="!bg-[#FFF8E1] text-slate-700 text-sm"
                onClick={() => handleChoice("B")}
              >
                {scenario.choices[1].text}
              </DoodleButton>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        <p className="text-center text-xs text-slate-400 mt-4">
          左右滑动 或 点击按钮
        </p>
      </div>
    </div>
  );
}
