import { NextResponse } from "next/server";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { db } from "@/lib/db";

const bodySchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((v) => {
      const parsed = parsePhoneNumberFromString(v);
      return Boolean(parsed?.isValid());
    }, "Invalid phone number"),
  documentId: z.string().trim().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { name, phone, documentId } = bodySchema.parse(json);

    const existingLead = await db.studentLead.findUnique({
      where: {
        phone,
      },
    });

    if (existingLead) {
      await db.studentLead.update({
        where: {
          id: existingLead.id,
        },
        data: {
          name,
          phone,
          ...(documentId ? { documentId } : {}),
        },
      });
      return NextResponse.json({ success: true });
    }

    await db.studentLead.create({
      data: {
        name,
        phone,
        ...(documentId ? { documentId } : {}),
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

    console.error("[STUDENT_LEAD_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

