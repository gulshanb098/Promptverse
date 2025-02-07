import User from "@/models/user";
import { connectToDB } from "@/utils/dbconnector";
import { NextRequest } from "next/server";

/**
 * GET /api/users/[id]
 * Fetches user detail by ID and returns the response.
 */
export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  try {
    await connectToDB();

    if (!id) {
      return new Response("User ID is required", { status: 400 });
    }

    const user = await User.findById(id);

    if (!user) {
      return new Response("User Not Found", { status: 404 });
    }

    const userObj = user.toObject();
    const { __v, ...formattedUser } = userObj;

    return new Response(JSON.stringify(formattedUser), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
