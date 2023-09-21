import Post from "@/models/Post";
import connect from "@/utils/db";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: Params) => {

  const { id } = params

  try {
    await connect()

    const post: any = await Post.findById(id)

    return new NextResponse(JSON.stringify(post), { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}