import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/dbconnector";
import { NextRequest } from "next/server";

/**
 * GET /api/users/[id]/posts
 * Fetch all prompts of respective user.
 */
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  try {
    await connectToDB();

    if (!id) {
      return new Response("Prompt ID is required", { status: 400 });
    }

    const userPrompts = await Prompt.find({ creator: id })
      .select("_id prompt tag creator")
      .populate("creator", "email username image");

    if (!userPrompts) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(userPrompts), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching prompts", { status: 500 });
  }
};
