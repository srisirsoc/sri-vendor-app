import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(res) {
  try {
    (await cookies()).delete("token");
    (await cookies()).delete("user_id");
    (await cookies()).delete("language");
    return NextResponse.json({
      success: true,
      message: "User logout successfully!",
      error: null,
      data: null
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      message: null,
      error: error.message || "User logout failed!",
    })
  }
};