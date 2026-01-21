import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

type AuthPayload = {
  userId: string;
  role: string;
};

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get("accessToken")?.value;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { role: true },
    });
    return user?.role === "admin";
  } catch {
    return false;
  }

}

export function getAuthUser(): AuthPayload | null {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as AuthPayload;
  } catch {
    return null;
  }
}