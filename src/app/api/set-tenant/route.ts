import { NextResponse } from "next/server";

const BASE =
  process.env.NODE_ENV === "production" ? "workforge.team" : "lvh.me";

export async function POST(request: Request) {
  const { slug } = (await request.json()) as { slug?: string };

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("workforge-tenant", slug, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: `.${BASE}`,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete({
    name: "workforge-tenant",
    domain: `.${BASE}`,
    path: "/",
  });

  return response;
}
