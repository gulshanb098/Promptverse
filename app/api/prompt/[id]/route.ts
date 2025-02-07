import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/dbconnector";
import { NextRequest } from "next/server";

/**
 * GET /api/prompt/[id]
 * Fetches a prompt by ID and returns the response.
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

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

/**
 * PATCH /api/prompt/[id]
 * Update prompt by ID and returns the response.
 */
export const PATCH = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  const { prompt, tag } = await req.json();

  if (!prompt || !tag) {
    return new Response("Missing required parameters", { status: 400 });
  }

  try {
    await connectToDB();

    const existedPrompt = await Prompt.findById(id);
    if (!existedPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existedPrompt.prompt = prompt;
    existedPrompt.tag = tag;

    await existedPrompt.save();
    return new Response("Successfully updated the prompt", { status: 200 });
  } catch (error) {
    return new Response("Error updating prompt", { status: 500 });
  }
};

/**
 * DELETE /api/prompt/[id]
 * Delete prompt by ID.
 */
export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  try {
    await connectToDB();

    if (!id) {
      return new Response("Prompt ID is required", { status: 400 });
    }

    await Prompt.findByIdAndDelete(id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
