import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";

const bodySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {

    const json = await req.json();
    const { name, phone, email, password } = bodySchema.parse(json);

    await db.user.create({
      data: {
        name,
        phone,
        email,
        password,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    console.error("[USER_DETAILS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

