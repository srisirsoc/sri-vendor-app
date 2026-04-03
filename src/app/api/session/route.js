import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(res) {
  try {
    const data = await res.json();
    if (data?.token) {
      (await cookies()).set("token", data?.token, { secure: true });
    };
    if (data?.user_id) {
      (await cookies()).set("user_id", data?.user_id, { secure: true });
    };
    if (data?.language) {
      (await cookies()).set("language", data?.language || "ENGLISH", { secure: true });
    };
    return NextResponse.json({
      success: true,
      message: "Login successfully!"
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    })
  }
}