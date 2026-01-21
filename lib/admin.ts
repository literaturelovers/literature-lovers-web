import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "./db";

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get("auth-token")?.value;
  if (!token) return false;

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as { userId: string };

  const user = await db.user.findUnique({
    where: { id: decoded.userId },
    select: { role: true },
  });

  return user?.role === "admin";
}

type AuthPayload = {
  userId: string;
  role: string;
};

export function getAuthUser(): AuthPayload | null {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;
  } catch {
    return null;
  }
}