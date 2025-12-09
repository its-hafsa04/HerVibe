import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse("key not found", { status: 404 });
    }

    const { mood, energy } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Based on a user's mood level of ${mood}/10 and energy level of ${energy}/10, 
    suggest 3 personalized activities specifically designed to uplift mental well-being, especially for females. Ensure these activities:
    - Avoid repetition and are unique in each response.
    - Encourage gentle, relaxing, and creative engagement without requiring significant physical exertion.
    - Exclude any music-based recommendations.
    - Are activities that females may naturally enjoy, offering variety and nurturing comfort or self-care.
    
    Return the response in the following JSON format:
    [
      {
        "title": "Activity Title",
        "description": "Activity Description",
        "duration": "Duration (e.g., '15 minutes')"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    try {
      const activities = JSON.parse(response.text());
      return NextResponse.json(activities);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return NextResponse.json([
        {
          title: "Mindful Breathing",
          description:
            "Take deep, controlled breaths to center yourself and reduce stress.",
          duration: "5 minutes",
        },
        {
          title: "Quick Walk",
          description:
            "Take a brief walk to refresh your mind and boost energy.",
          duration: "10 minutes",
        },
        {
          title: "Gratitude Journal",
          description: "Write down three things you're grateful for today.",
          duration: "5 minutes",
        },
      ]);
    }
  } catch (error) {
    console.error("Error in mood analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze mood" },
      { status: 500 }
    );
  }
}
