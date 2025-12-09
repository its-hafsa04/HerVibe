"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Slider } from "../../components/ui/slider";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function MoodAssessment() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState(null);
  const [error, setError] = useState(null);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      mood: 5,
      energy: 5,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        const errorMsg = result.error || result.details || "Failed to get activities";
        console.error("API Error:", result);
        throw new Error(errorMsg);
      }

      if (result.error) {
        throw new Error(result.error);
      }

      setActivities(result);
    } catch (error) {
      console.error("Error analyzing mood:", error);
      setError("Failed to get activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#ffe5ec] to-[#ffd6e0] min-h-screen pb-[3%] flex flex-col items-center">
      <Header />
      <div className="w-[90%] md:w-[600px] mx-auto mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-pink-100"
        >
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="mood"
                className="text-lg font-semibold text-[#5e1a6b]"
              >
                How are you feeling today?
              </Label>
              <Slider
                id="mood"
                min={1}
                max={10}
                step={1}
                defaultValue={[5]}
                onValueChange={(value) => setValue("mood", value[0])}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-[#5e1a6b] mt-2">
                <span>Very Low 😢</span>
                <span>Very High 😃</span>
              </div>
            </div>

            <div>
              <Label
                htmlFor="energy"
                className="text-lg font-semibold text-[#5e1a6b]"
              >
                Energy Level
              </Label>
              <Slider
                id="energy"
                min={1}
                max={10}
                step={1}
                defaultValue={[5]}
                onValueChange={(value) => setValue("energy", value[0])}
                className="mt-3"
              />
              <div className="flex justify-between text-sm text-[#5e1a6b] mt-2">
                <span>Low Energy 🙃</span>
                <span>High Energy 😏</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#fbc9d1] to-[#f7a8d3] text-[#5e1a6b] font-semibold rounded-full py-3 mt-4 shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Personalized Activities"}
          </Button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-[#ffe5e5] border border-[#ffb3b3] rounded-lg text-red-600">
            {error}
          </div>
        )}

        {activities && !error && (
          <div className="mt-10 space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-pink-100"
              >
                <h3 className="text-xl text-[#5e1a6b] font-semibold mb-2">
                  {activity.title}
                </h3>
                <p className="text-[#5e1a6b]/80 mb-2">{activity.description}</p>
                <p className="text-sm text-[#5e1a6b]/70">
                  Duration: {activity.duration}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
