import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, genre } = await req.json();
    const userId = session.user.id;

    await connectMongoDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.moviesToBeWatched.push({ title, genre });
    await user.save();

    return NextResponse.json(
      { message: "Movie added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding movie" },
      { status: 500 }
    );
  }
}
