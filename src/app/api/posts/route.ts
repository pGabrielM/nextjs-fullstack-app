import Post, { IPost } from "@/models/Post";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url)

  const username: any = url.searchParams.get("username")

  try {
    await connect()

    const posts: any = await Post.find(username && { username })

    return new NextResponse(JSON.stringify(posts), { status: 200 })
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 })
  }
}

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  const newPost: IPost = new Post(body)

  try {
    await connect()

    await newPost.save()

    return new NextResponse("Post has been created", { status: 200 })
  } catch (err) {
    return new NextResponse(`Database Error ${err}`, { status: 500 })
  }
}