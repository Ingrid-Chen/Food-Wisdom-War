"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomePage } from "@/components/welcome-page";
import { GamePage } from "@/components/game-page";

type GameScreen = "welcome" | "game";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("welcome");
  const [playerName, setPlayerName] = useState("");

  const handleStart = (name: string) => {
    setPlayerName(name);
    setCurrentScreen("game");
  };

  const handleBack = () => {
    setCurrentScreen("welcome");
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-md mx-auto min-h-screen shadow-xl">
        <AnimatePresence mode="wait">
          {currentScreen === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomePage onStart={handleStart} />
            </motion.div>
          )}
          
          {currentScreen === "game" && (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GamePage playerName={playerName} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
