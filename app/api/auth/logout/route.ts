import { NextResponse } from "next/server";

export async function POST() {
  // Clear the cookie/session here as is appropriate for your session logic.
  // For demonstration, we'll clear a sample cookie called 'token'.
  return NextResponse.json({ message: "Logged out" }, {
    status: 200,
    headers: {
      "Set-Cookie": `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`
    }
  });
}
