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

    // Determine mood and energy categories for personalized suggestions
    const moodCategory = mood <= 3 ? "low" : mood <= 6 ? "moderate" : "high";
    const energyCategory =
      energy <= 3 ? "low" : energy <= 6 ? "moderate" : "high";

    // Add timestamp for variety
    const timestamp = Date.now();
    const requestId = Math.floor(timestamp / 1000) % 10000;

    // Determine personalized guidance based on mood-energy combination
    let personalizedGuidance = "";
    if (moodCategory === "low" && energyCategory === "low") {
      personalizedGuidance =
        "Focus on gentle, comforting, low-effort activities that provide emotional comfort and warmth. Think cozy activities, pampering, gentle crafts, or soothing rituals that feel nurturing and safe.";
    } else if (moodCategory === "low" && energyCategory === "moderate") {
      personalizedGuidance =
        "Focus on uplifting activities that boost mood without being too physically demanding. Consider creative projects, light movement, social activities, or engaging hobbies that bring joy and positivity.";
    } else if (moodCategory === "low" && energyCategory === "high") {
      personalizedGuidance =
        "Focus on energizing, mood-boosting activities that channel high energy positively. Think active hobbies, creative expression, productive tasks, or dynamic activities that lift spirits and provide accomplishment.";
    } else if (moodCategory === "moderate" && energyCategory === "low") {
      personalizedGuidance =
        "Focus on relaxing, creative activities that maintain or slightly improve mood. Consider artistic pursuits, gentle movement, mindfulness practices, or calming creative projects that feel restorative.";
    } else if (moodCategory === "moderate" && energyCategory === "moderate") {
      personalizedGuidance =
        "Focus on balanced activities that are engaging and enjoyable. Mix hobbies, creative projects, light exercise, social activities, or learning something new that feels rewarding.";
    } else if (moodCategory === "moderate" && energyCategory === "high") {
      personalizedGuidance =
        "Focus on fun, active activities that are exciting and engaging. Consider active hobbies, creative challenges, social activities, or adventurous pursuits that feel invigorating.";
    } else if (moodCategory === "high" && energyCategory === "low") {
      personalizedGuidance =
        "Focus on relaxing, enjoyable activities that maintain good mood. Think pampering, creative relaxation, gentle enjoyment, or activities that feel luxurious and indulgent.";
    } else if (moodCategory === "high" && energyCategory === "moderate") {
      personalizedGuidance =
        "Focus on fun, engaging activities that are enjoyable and creative. Consider hobbies, creative projects, social activities, or trying something new and exciting that amplifies joy.";
    } else {
      personalizedGuidance =
        "Focus on exciting, high-energy activities that are fun and engaging. Think active hobbies, creative challenges, adventurous activities, or dynamic pursuits that feel exhilarating and memorable.";
    }

    const prompt = `You are a creative wellness coach specializing in personalized self-care activities for women.

USER PROFILE:
- Current Mood Level: ${mood}/10 (${moodCategory} mood)
- Current Energy Level: ${energy}/10 (${energyCategory} energy)
- Request ID: ${requestId}

ACTIVITY REQUIREMENTS:
Generate 3 UNIQUE, CREATIVE, and ENGAGING activities that are perfectly tailored to this specific mood-energy combination.

1. PERSONALIZATION:
   ${personalizedGuidance}
   
   The activities must directly address this specific combination - someone with ${moodCategory} mood and ${energyCategory} energy needs activities that match their current state perfectly.

2. VARIETY & CREATIVITY:
   - Each activity must be COMPLETELY DIFFERENT from typical generic suggestions
   - Avoid cliché activities like "take a walk", "meditate", or "drink tea" unless you add a creative, unique twist that makes it special
   - Include unique, creative, and fun activities that spark genuine joy and interest
   - Mix different activity types: creative arts, self-care, movement, social, intellectual, sensory, productive, playful
   - Think outside the box - suggest activities that are memorable, special, and feel personalized
   - Make each activity feel like a treat or special experience worth doing

3. SPECIFIC & DETAILED:
   - Make each activity specific, actionable, and detailed
   - Include creative twists, unique approaches, or special touches
   - Provide engaging descriptions that make the activity sound appealing and exciting
   - Explain what makes this activity perfect for their current mood-energy state
   - Ensure activities are realistic, achievable, and don't require special equipment (unless specified)

4. ACTIVITY TYPES TO EXPLORE (be creative and mix these):
   - Creative Arts: painting, drawing, crafting, DIY projects, journaling with specific prompts, creative writing, photography, flower arranging, pottery, scrapbooking, calligraphy, origami, embroidery, collage making
   - Self-Care & Pampering: skincare routines with specific steps, bath rituals with special touches, aromatherapy setups, face masks with recipes, nail art designs, hair care routines, spa activities at home, body scrubs
   - Movement & Body: gentle yoga sequences, stretching routines, nature walks with specific routes, gardening projects, light exercise routines, tai chi, dancing (without music), body positivity activities, posture work
   - Social & Connection: calling a friend with conversation starters, writing letters with prompts, planning gatherings, community activities, volunteering ideas, connecting with loved ones, sending care packages
   - Intellectual & Learning: reading specific genres or books, learning new skills, puzzles and brain games, online courses, language learning, trivia, research interesting topics, memory games
   - Sensory & Mindfulness: aromatherapy setups, texture exploration, mindful eating practices, nature observation, sensory baths, color therapy, essential oil blending, scent memory activities
   - Productive & Organizing: decluttering specific areas, organizing spaces creatively, meal prep ideas, planning systems, goal setting activities, creating systems, vision boards, bullet journaling
   - Fun & Playful: games (board games, puzzles, apps), playful activities, trying new things, experiments, challenges, creative play, building things, exploring new places

5. EXCLUSIONS:
   - NO music-based activities (listening to music, playing instruments, singing, etc.)
   - NO generic or vague suggestions
   - NO repetitive activities - each request should feel fresh and unique
   - NO activities requiring significant physical exertion if energy is low
   - NO activities that might worsen low mood
   - NO vulgar, inappropriate, or adult content of any kind
   - NO romantic, dating, or relationship-focused activities
   - NO activities involving alcohol, substances, or anything harmful
   - Keep all activities wholesome, family-friendly, and appropriate for all ages
   - Focus on self-care, creativity, wellness, and positive personal growth only
   - NO vulgar, inappropriate, or adult content of any kind
   - NO romantic or dating-related activities
   - NO activities involving relationships, dating, or romantic connections
   - Keep all activities wholesome, family-friendly, and appropriate for all ages
   - Focus on self-care, personal growth, creativity, and wellness only
   - No longer than 2-3 sentences for each activity
   - NO vulgar, inappropriate, or adult content of any kind
   - NO romantic or dating-related activities
   - NO activities involving relationships, dating, or romantic connections
   - Keep all activities wholesome, family-friendly, and appropriate for all ages
   - Focus on self-care, personal growth, creativity, and wellness only
   - No longer than 2-3 sentences for each activity
   
CRITICAL VARIETY INSTRUCTION:
This is request #${requestId}. To ensure maximum variety, imagine you've already suggested hundreds of activities before. Generate activities that are:
- Completely different from typical wellness suggestions
- Creative and unique with specific details
- Tailored to this exact mood (${mood}/10) and energy (${energy}/10) combination
- Fun, engaging, and feel like a special treat
- Varied in type - don't suggest 3 similar activities

Return ONLY valid JSON (no markdown, no code blocks, no explanations - just pure JSON):
[
  {
    "title": "Creative, Engaging Activity Title (5-8 words, make it appealing)",
    "description": "Detailed, appealing description (2-3 sentences) explaining what to do, why it's perfect for their current state, and how to make it special. Be specific and engaging.",
    "duration": "Specific duration (e.g., '20-30 minutes', '45 minutes', '1 hour', '15-20 minutes')"
  },
  {
    "title": "Another Unique Activity Title",
    "description": "Another detailed, engaging description",
    "duration": "Duration"
  },
  {
    "title": "Third Unique Activity Title",
    "description": "Third detailed, engaging description",
    "duration": "Duration"
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
