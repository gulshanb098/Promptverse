import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/dbconnector";
import { NextRequest } from "next/server";

/**
 * POST /api/prompt/new
 * Create new prompt to the database.
 */
export const POST = async (req: NextRequest) => {
  const { prompt, userId, tag } = await req.json();
  try {
    await connectToDB();

    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
