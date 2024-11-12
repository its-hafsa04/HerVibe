"use client";

import { motion } from "framer-motion";
import {
  FaHeart,
  FaLeaf,
  FaSmile,
  FaPaintBrush,
  FaMusic,
  FaHandshake,
} from "react-icons/fa";

export default function WhyUs() {
  return (
    <motion.div
      className="bg-gradient-to-l from-[#ffe5ec] to-[#ffd6e0] text-black py-12 px-6 sm:px-10 lg:px-20 flex flex-col items-center gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-pink-500 text-sm font-semibold mb-2 uppercase tracking-wider">
          Uplifting Features
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-b from-pink-400 to-pink-600 bg-clip-text text-transparent sm:text-5xl mb-4">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 mb-8 text-base sm:text-lg">
          Discover how our platform supports you in feeling your best, every
          day.
        </p>
      </motion.div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full lg:max-w-7xl">
        {[
          {
            title: "Self-Care Reminders",
            description: "Gentle nudges to prioritize your well-being.",
            icon: FaHeart,
          },
          {
            title: "Nature-Inspired Tips",
            description:
              "Mindfulness practices rooted in the beauty of nature.",
            icon: FaLeaf,
          },
          {
            title: "Positive Affirmations",
            description:
              "Daily reminders to boost your self-love and confidence.",
            icon: FaSmile,
          },
          {
            title: "Creative Expression",
            description:
              "Explore art, music, and writing as emotional outlets.",
            icon: FaPaintBrush,
          },
          {
            title: "Mood-Boosting Music",
            description:
              "Curated playlists to uplift and energize your spirit.",
            icon: FaMusic,
          },
          {
            title: "Community Support",
            description:
              "Connect with a like-minded community here to uplift you.",
            icon: FaHandshake,
          },
        ].map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border-gray-200 hover:shadow-pink-300/40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="text-pink-500 text-4xl mb-4">
              <benefit.icon />
            </div>
            <h3 className="text-xl font-semibold bg-gradient-to-b from-pink-400 to-pink-600 bg-clip-text text-transparent mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-500 text-base">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}