import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import matter from "gray-matter";

export async function GET(request: NextRequest) {
  // return NextResponse.json({ text: "Hello, World!" })
  const files = fs.readdirSync(
    `/home/vitorniino/Documents/joelvitorniino_blog/public/posts`
  );
  const posts = files.map((file) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const source = fs.readFileSync(
      `/home/vitorniino/Documents/joelvitorniino_blog/public/posts/${id}.md`,
      "utf-8"
    );
    const { data, content } = matter(source);

    return {
      data,
      content,
    };
  });

  return NextResponse.json(posts);
}
