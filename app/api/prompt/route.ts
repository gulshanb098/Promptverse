import { NextRequest } from "next/server";
import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/dbconnector";

/**
 * GET /api/prompt
 * Fetch all prompts from the database.
 */
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find()
      .select("_id prompt tag creator")
      .populate("creator", "email username image");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
