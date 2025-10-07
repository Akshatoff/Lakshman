import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();

  // This signs the user out on the server and clears Supabase cookies
  const { error } = await supabase.auth.signOut({ scope: "global" });

  // Always clear cookies manually too, just in case
  const response = NextResponse.redirect(new URL("/auth/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  response.cookies.delete("sb-access-token");
  response.cookies.delete("sb-refresh-token");

  if (error) {
    console.error("Server logout error:", error);
  }

  return response;
}
